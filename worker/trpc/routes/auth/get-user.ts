import { publicProcedure } from "@worker/trpc/trpc";

export const getUser = publicProcedure.query(async ({ ctx }) => {
  return ctx.user;
});
