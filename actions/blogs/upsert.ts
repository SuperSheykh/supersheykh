import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogFormSchema, blogs, blogSchema } from "@/db/schema/blogs";

export const upsertBlog = createServerFn()
  .inputValidator(blogFormSchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;

    const [res] = await db
      .insert(blogs)
      .values(data)
      .onConflictDoUpdate({ target: blogs.id, set: rest })
      .returning();

    return res;
  });
