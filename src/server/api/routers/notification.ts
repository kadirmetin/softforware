import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const notificationRouter = createTRPCRouter({
  getAllNotifications: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
    })
  ),
  seeNotification: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: id }) => {
      const notification = await ctx.prisma.notification.update({
        where: { id },
        data: { read: true },
      });

      return notification;
    }),
});
