'''use server''';
import db from "@/db";
import { quotes, quoteSchema } from "@/db/schema/quotes";
import { eq } from "drizzle-orm";
import { z } from "zod";

const upsertSchema = quoteSchema.extend({ id: z.string().optional() });

export const upsertQuote = async (data: z.infer<typeof upsertSchema>) => {
  if (data.id) {
    const { id, ...updateData } = data;
    return db.update(quotes).set(updateData).where(eq(quotes.id, id)).returning();
  }
  return db.insert(quotes).values(data).returning();
};
