import { EngagementType} from '@prisma/client';



import {
  createTRPCRouter,
  publicProcedure,

} from "~/server/api/trpc";

import { z } from 'zod';


export const videoRouter = createTRPCRouter({
  
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
      const videos = videosWithUser.map(({user, ...video}) => video);
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
      //generate an array of indices
          const indices = Array.from({ length: videosWithCounts.length }, (_, i) => i);

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
        });
          