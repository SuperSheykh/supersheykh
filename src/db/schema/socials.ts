import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { createInsertSchema } from "drizzle-zod";

export const socials = sqliteTable("socials", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  name: text("name").unique().notNull(),
  url: text("url").notNull(),
});

export const socialSchema = createInsertSchema(socials);
export type SocialInsert = typeof socials.$inferInsert;
