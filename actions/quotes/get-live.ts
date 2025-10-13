import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getLiveQuotes = createServerFn().handler(async () => {
  return db.select().from(quotes).where(eq(quotes.live, "1")).all();
});
