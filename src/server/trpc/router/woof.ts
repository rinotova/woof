import { z } from "zod";
import { WoofSchema } from "../../../components/CreateWoofForm/CreateWoofForm";
import { protectedProcedure, publicProcedure, router } from "../trpc";

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
  list: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit } = input;
      const wooves = await prisma.woof.findMany({
        take: limit + 1,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (wooves.length > limit) {
        const nextItem = wooves.pop() as typeof wooves[number];
        nextCursor = nextItem.id;
      }

      return {
        wooves,
        nextCursor,
      };
    }),
});
