import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const woofRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        text: z.string({ required_error: "A text for the woof is required" }),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text } = input;
      const userId = session.user.id;

      return prisma.woof.create({
        data: {
          text,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
