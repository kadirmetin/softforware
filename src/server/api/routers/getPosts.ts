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

  getByCategory: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { categoryId } = input;

      const category = await ctx.prisma.category.findUnique({
        where: { id: categoryId },
        include: {
          posts: {
            include: {
              author: true,
              Category: true,
            },
          },
        },
      });

      if (!category) throw new Error("Category not found");

      return category.posts;
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

  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        categoryId: z.string().optional(),
        image: z.string(),
        content: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, categoryId, image, content, authorId } = input;

      const data: {
        title: string;
        image: string;
        content: string;
        author: { connect: { id: string } };
        Category?: { connect: { id: string } };
      } = {
        title,
        image,
        content,
        author: {
          connect: {
            id: authorId,
          },
        },
      };

      if (categoryId) {
        data.Category = {
          connect: {
            id: categoryId,
          },
        };
      }

      return ctx.prisma.post.create({
        data,
        include: { Category: true, author: true },
      });
    }),
});
