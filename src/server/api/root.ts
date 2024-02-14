// root.ts
import { createTRPCRouter } from "~/server/api/trpc";
import { categoriesRouter } from "./routers/getCategories";
import { postsRouter } from "./routers/getPosts";
import { searchRouter } from "./routers/search";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  categories: categoriesRouter,
  search: searchRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
