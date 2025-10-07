import { quotes } from "@/db/schema";
import { publicProcedure } from "@worker/trpc/trpc";

export const getAllQuotes = publicProcedure.query(async ({ ctx: { db } }) => {
  return db.select().from(quotes).all();
});
