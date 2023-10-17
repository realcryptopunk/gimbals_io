import { createTRPCRouter, protectedProcedure,} from "~/server/api/trpc";

import { z } from "zod";


export const commentRouter = createTRPCRouter({
    addComment: protectedProcedure
    .input(
        z.object({
            videoId: z.string(),
            userId: z.string(), 
            message: z.string().max(200).min(5), 
        })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.db.comment.create({
            data: {
                videoId: input.videoId,
                userId: input.userId,
                message: input.message,
            }
        });
    const getAllNewComments = await ctx.db.comment.findMany({
        where: {
            videoId: input.videoId,
        },
    });
    return getAllNewComments;
    }),

});
