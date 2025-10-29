import { publicProcedure } from "@worker/trpc/trpc";

export const getSession = publicProcedure.query(async ({ ctx }) => {
  return ctx.session;
});
