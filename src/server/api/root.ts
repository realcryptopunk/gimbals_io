import { createTRPCRouter } from "~/server/api/trpc";
import { videoRouter } from "./routers/video";
import { userRouter } from "./routers/user";
import { videoEngagementRouter } from "./routers/videoEngagements";
import { commentRouter } from "./routers/comment";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  videoEngagement: videoEngagementRouter,
  user: userRouter,
  video: videoRouter,
  comment: commentRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
