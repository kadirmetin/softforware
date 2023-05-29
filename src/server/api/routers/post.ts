import { runConsumer, sendMessages } from "~/server/kafka";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  timeReading: z.number(),
  technos: z.string().nullable(),
  image: z.string().nullable(),
});

export const postRouter = createTRPCRouter({
  getAllPosts: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.post.findMany()
  ),
  getPost: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) =>
      ctx.prisma.post.findUnique({ where: { id: input } })
    ),
  addPost: protectedProcedure
    .input(postSchema)
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: { ...input, author: { connect: { id: ctx.session.user.id } } },
      });

      await sendMessages("posts", JSON.stringify(post));
    }),
  updatePost: protectedProcedure
    .input(z.object({ id: z.string(), data: postSchema }))
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      const post = await ctx.prisma.post.update({
        where: { id },
        data,
      });

      return post;
    }),
  deletePost: protectedProcedure.input(z.string()).mutation(
    async ({ ctx, input: id }) =>
      await ctx.prisma.post.delete({
        where: { id },
      })
  ),
});
