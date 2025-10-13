import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs } from "@/db/schema";

export const getLiveBlogs = createServerFn().handler(async () => {
  return db.select().from(blogs).all();
});
