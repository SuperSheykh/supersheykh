import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

export const images = sqliteTable("images", {
  id: text("id").primaryKey().$defaultFn(uuidv4),
});
