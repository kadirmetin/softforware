// root.ts
import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/getPosts";
import { categoriesRouter } from "./routers/getCategories";
import { searchRouter } from "./routers/search";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  categories: categoriesRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
