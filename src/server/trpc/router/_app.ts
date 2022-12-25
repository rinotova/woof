import { router } from "../trpc";
import { authRouter } from "./auth";
import { woofRouter } from "./woof";

export const appRouter = router({
  woof: woofRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
