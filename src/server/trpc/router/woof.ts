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
  like: protectedProcedure
    .input(
      z.object({
        woofId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { woofId } = input;
      const userId = session.user.id;

      return prisma.like.create({
        data: {
          woof: {
            connect: {
              id: woofId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        woofId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { woofId } = input;
      const userId = session.user.id;

      return prisma.like.delete({
        where: {
          woofId_userId: {
            woofId,
            userId,
          },
        },
      });
    }),
  list: publicProcedure
    .input(
      z.object({
        where: z.object({
          author: z.object({
            name: z.string().optional(),
          }).optional()
        }).optional(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { cursor, limit, where } = input;
      const userId = session?.user?.id;
      const wooves = await prisma.woof.findMany({
        take: limit + 1,
        where,
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
          likes: {
            where: {
              userId,
            },
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              likes: true,
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
