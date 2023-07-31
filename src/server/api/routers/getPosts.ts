import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: { Category: true, author: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  take10Post: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: { Category: true, author: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }),
});
