import { publicProcedure } from "@worker/trpc/trpc";
import { quotes } from "@/db/schema";
import { quoteSchema } from "@/db/schema/quotes";

export const upsertQuote = publicProcedure
  .input(quoteSchema)
  .mutation(async ({ ctx: { db }, input: data }) => {
    const { id, ...rest } = data;
    await db
      .insert(quotes)
      .values(data)
      .onConflictDoUpdate({ target: quotes.id, set: rest })
      .returning();
  });
