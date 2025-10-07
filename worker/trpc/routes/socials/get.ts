import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { socials } from "@/db/schema";

export const getSocial = publicProcedure
  .input(z.string())
  .query(async ({ ctx: { db }, input: id }) => {
    return (await db.select().from(socials).where(eq(socials.id, id)).all())[0];
  });
