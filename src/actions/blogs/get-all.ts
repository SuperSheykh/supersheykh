import db from "@/db";
import { blogs, images } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

export const getAllBlogs = createServerFn().handler(async () => {
  const data = await db
    .select()
    .from(blogs)
    .leftJoin(images, eq(blogs.cover, images.id));
  return data.map(({ blogs, images }) => ({ ...blogs, image: images }));
});
