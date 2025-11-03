import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";

export const uploadToImages = publicProcedure
  .input(z.string()) //key number
  .mutation(async ({ ctx: { env } }) => {});
