import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { quotes } from "@/db/schema";

export const getQuote = publicProcedure
  .input(z.string())
  .query(async ({ ctx: { db }, input: id }) => {
    return (await db.select().from(quotes).where(eq(quotes.id, id)).all())[0];
  });
