import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { quotes, quoteSchema } from "@/db/schema/quotes";

export const upsertQuote = createServerFn()
  .inputValidator(quoteSchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;

    const [res] = await db
      .insert(quotes)
      .values(data)
      .onConflictDoUpdate({ target: quotes.id, set: rest })
      .returning();

    return res;
  });
