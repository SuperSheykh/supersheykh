import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs, blogSchema } from "@/db/schema/blogs";
import { eq } from "drizzle-orm";
import { z } from "zod";

const upsertSchema = blogSchema.extend({ id: z.string().optional() });

export const upsertBlog = createServerFn({ method: "POST" })
  .inputValidator(upsertSchema)
  .handler(async ({ data }) => {
    if (data.id) {
      const { id, ...updateData } = data;
      return db
        .update(blogs)
        .set(updateData)
        .where(eq(blogs.id, id))
        .returning();
    }
    return db.insert(blogs).values(data).returning();
  });
