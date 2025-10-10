import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { quotes } from "@/db/schema";

export const getAllQuotes = createServerFn().handler(async () => {
  return await db.select().from(quotes);
});
