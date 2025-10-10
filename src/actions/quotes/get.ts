'''use server''';
import db from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllQuotes = async () => {
  return await db.select().from(quotes);
};

export const getLiveQuotes = async () => {
  return await db.select().from(quotes).where(eq(quotes.live, "1"));
};

export const getQuoteById = async (id: string) => {
  if (id === "new") return null;
  const data = await db.select().from(quotes).where(eq(quotes.id, id));
  return data[0] ?? null;
};