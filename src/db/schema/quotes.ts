import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const quotes = sqliteTable("quotes", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  author: text("author").notNull(),
  live: text("live").default("1"),
});
