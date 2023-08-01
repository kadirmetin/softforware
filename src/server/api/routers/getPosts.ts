import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: { Category: true, author: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  take10Post: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: { Category: true, author: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  }),

  getPost: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { postId } = input;
      return ctx.prisma.post.findUnique({
        where: { id: postId },
        include: { Category: true, author: true },
      });
    }),
});
