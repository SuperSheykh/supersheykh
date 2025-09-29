import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  greeting: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        text: `Hello, ${input.name}!`,
      };
    }),
});

export type AppRouter = typeof appRouter;
