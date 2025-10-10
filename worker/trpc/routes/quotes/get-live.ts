import { quotes } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";
import { eq } from "drizzle-orm";

export const getLiveQuotes = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(quotes).where(eq(quotes.live, "1")).all();
});
