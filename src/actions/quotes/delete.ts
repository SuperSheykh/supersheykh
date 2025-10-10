'''use server''';
import db from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteQuote = async (id: string) => {
  return await db.delete(quotes).where(eq(quotes.id, id)).returning();
};
