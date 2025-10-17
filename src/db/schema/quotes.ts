import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const quotes = sqliteTable("quotes", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  quote: text("quote").notNull().default(""),
  quote_fr: text("quote_fr").notNull().default(""),
  author: text("author").notNull(),
  live: text("live").default("1"),
});

export const quoteSchema = createInsertSchema(quotes);
export const quoteFormSchema = quoteSchema
  .pick({
    quote: true,
    author: true,
    live: true,
  })
  .extend({
    id: z.string().optional(),
    lang: z.enum(["en", "fr"]),
  });
export type Quote = typeof quotes.$inferSelect;
export type QuoteInsert = typeof quotes.$inferInsert;
