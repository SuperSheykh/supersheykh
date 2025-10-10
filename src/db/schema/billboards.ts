import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { images } from "./images";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const billboards = sqliteTable("billboards", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
  greeting: text("greeting"),
  greeting_fr: text("greeting_fr"),
  title: text("title").notNull(),
  title_fr: text("title_fr").notNull(),
  description: text("description"),
  description_fr: text("description_fr"),
  buttonText: text("button_text").notNull(),
  buttonText_fr: text("button_text_fr").notNull(),
  buttonLink: text("button_link").notNull(),
  imageUrl: text("image_url")
    .notNull()
    .references(() => images.id),
  imageAlt: text("image_alt"),
  subText: text("sub_text"),
  subText_fr: text("sub_text_fr"),
  subLink: text("sub_link"),
  subLinkText: text("sub_link_text"),
  subLinkText_fr: text("sub_link_text_fr"),
});

export const billboard_relations = relations(billboards, ({ one }) => ({
  image: one(images, {
    fields: [billboards.imageUrl],
    references: [images.id],
  }),
}));

export const billboardSchema = createInsertSchema(billboards);
export type BillboardInsert = typeof billboards.$inferInsert;
export type Billboard = typeof billboards.$inferSelect;
