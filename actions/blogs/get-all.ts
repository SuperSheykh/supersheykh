import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs } from "@/db/schema";

export const getAllBlogs = createServerFn().handler(async () => {
  return db.select().from(blogs).all();
});