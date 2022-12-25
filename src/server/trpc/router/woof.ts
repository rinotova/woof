import { WoofSchema } from "../../../components/CreateWoofForm/CreateWoofForm";
import { protectedProcedure, router } from "../trpc";

export const woofRouter = router({
  create: protectedProcedure.input(WoofSchema).mutation(({ ctx, input }) => {
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
