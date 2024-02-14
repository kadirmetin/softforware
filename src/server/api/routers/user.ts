import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      return ctx.prisma.user.findUnique({
        where: { id: userId },
        include: {
          Post: {
            include: { Category: true },
          },
          Profile: true,
        },
      });
    }),

  updateUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        data: z.object({
          name: z.string().nullable(),
          bio: z.string().nullable(),
          website: z.string().nullable(),
          linkedin: z.string().nullable(),
          twitter: z.string().nullable(),
          github: z.string().nullable(),
          kaggle: z.string().nullable(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, data } = input;
      return await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
          Profile: {
            update: {
              bio: data.bio,
              website: data.website,
              linkedin: data.linkedin,
              twitter: data.twitter,
              github: data.github,
              kaggle: data.kaggle,
            },
          },
        },
      });
    }),
});
