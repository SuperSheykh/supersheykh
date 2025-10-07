import { publicProcedure } from "@worker/trpc/trpc";
import { socials } from "@/db/schema";

export const getAllSocials = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(socials).all();
});
