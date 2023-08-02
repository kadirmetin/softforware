import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const searchRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query } = input;

      return ctx.prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { Category: true, author: true },
        where: {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
      });
    }),
});
