import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/getPosts";
import { categoriesRouter } from "./routers/getCategories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
