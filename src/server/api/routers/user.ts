import { EngagementType } from "@prisma/client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { z } from "zod";

export const userRouter = createTRPCRouter({
    addFollow: publicProcedure
    .input(z.object({ followerId: z.string(), followingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const existingFollow = await ctx.db.followEngagement.findMany({
            where: {
            followingId: input.followingId,
            followerId: input.followerId,
            engagementType: EngagementType.FOLLOW,
            },
        });
        if (existingFollow.length > 0) {
           const deleteFollow = await ctx.db.followEngagement.deleteMany({
            where: {
                followingId: input.followingId,
                followerId: input.followerId,
                engagementType: EngagementType.FOLLOW,
            },
            });
            return deleteFollow;
        } else {
            const follow = await ctx.db.followEngagement.create({
                data: {
                    followingId: input.followingId,
                    followerId: input.followerId,
                    engagementType: EngagementType.FOLLOW,
                },
                });
                return follow; 
        }
        }),
        
});