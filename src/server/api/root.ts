// root.ts
import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/getPosts";
import { categoriesRouter } from "./routers/getCategories";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
