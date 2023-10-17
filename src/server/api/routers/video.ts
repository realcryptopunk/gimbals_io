import { EngagementType } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const videoRouter = createTRPCRouter({
  getVideoById: publicProcedure
  .input(
    z.object({
      id: z.string(),
      viewerId: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawVideo = await ctx.db.video.findUnique({
      where: {
        id: input.id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
      },  
    },
  });
  if (!rawVideo) {
    throw new Error("Video not found")
  }
  const { user, comments, ...video } = rawVideo;
  const followers = await ctx.db.followEngagement.count({
    where: {
      followingId: user.id,
    },
  });
  const likes = await ctx.db.videoEngagement.count({
    where: {
      videoId: video.id,
      engagementType: EngagementType.LIKE,
    },
  });
  const dislikes = await ctx.db.videoEngagement.count({
      where: {
        videoId: video.id,
        engagementType: EngagementType.DISLIKE,
      },
  });
  const views = await ctx.db.videoEngagement.count({
    where: {
      videoId: video.id,
      engagementType: EngagementType.VIEW,
    },
  });
  const userWithFollowers = {...user, followers};
  const videoWithLikes = {...video, likes, views, dislikes};
  const commentsWithUsers = comments.map(({user, ...comment}) => ({
    user, comment,
  }));

  let viewerHasFollowed = false;
  let viewerHasLiked = false;
  let viewerHasDisliked = false;

  if (input.viewerId && input.viewerId !== "") {
    viewerHasLiked =  !!(await ctx.db.videoEngagement.findFirst({
      where: {
        videoId: input.id,
        userId: input.viewerId,
        engagementType: EngagementType.LIKE,
      },
    }));
    viewerHasDisliked =  !!(await ctx.db.videoEngagement.findFirst({
      where: {
        videoId: input.id,
        userId: input.viewerId,
        engagementType: EngagementType.DISLIKE,
      },
    }));
    viewerHasFollowed =  !!(await ctx.db.followEngagement.findFirst({
      where: {
        followingId: rawVideo.userId,
        followerId: input.viewerId,
      },
    }));
  }else {
      viewerHasFollowed = false;
      viewerHasLiked = false;
      viewerHasDisliked = false;
    }
    const viewer = {
      hasLiked: viewerHasLiked,
      hasDisliked: viewerHasDisliked,
      hasFollowed: viewerHasFollowed,
    }
  
  return { 
    video: videoWithLikes, 
    user: userWithFollowers, 
    comments: commentsWithUsers, 
    viewer };

}),

  getRandomVideos: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.db.video.findMany({
        where: {
          publish: true,
        },
        include: {
          user: true,
        },
      });
      const videos = videosWithUser.map(({ user, ...video }) => video);
      const users = videosWithUser.map(({ user }) => user);

      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return {
            ...video,
            views,
          };
        }),
      );
      //generate an array of indices
      const indices = Array.from(
        { length: videosWithCounts.length },
        (_, i) => i,
      );

      //shuffle the indices
      for (let i = indices.length - 1; i > 0; i--) {
        if (indices[i] === undefined) {
          const j = Math.floor(Math.random() * (i + 1));
          //eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
      }
      const shuffleVideosWithCounts = indices.map((i) => videosWithCounts[i]);
      const shuffleUsers = indices.map((i) => users[i]);

      const randomVideos = shuffleVideosWithCounts.slice(0, input);
      const randomUsers = shuffleUsers.slice(0, input);
      return { videos: randomVideos, users: randomUsers };
    }),
  getVideoSBySearch: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.db.video.findMany({
        where: {
          publish: true,
          title: {
            contains: input,
          },
        },
        take: 10,
        include: {
          user: true,
        },
      });
      const videos = videosWithUser.map(({ user, ...video }) => video);
      const users = videosWithUser.map(({ user }) => user);

      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return {
            ...video,
            views,
          };
        })
      );
      return { videos: videosWithCounts, users: users };
    }),
});
