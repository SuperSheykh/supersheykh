import { publicProcedure } from "@worker/trpc/trpc";
import { blogs } from "@/db/schema";
import { blogSchema } from "@/db/schema/blogs";

export const upsertBlog = publicProcedure
  .input(blogSchema)
  .mutation(async ({ ctx: { db }, input: data }) => {
    const { id, ...rest } = data;
    await db
      .insert(blogs)
      .values(data)
      .onConflictDoUpdate({ target: blogs.id, set: rest })
      .returning();
  });
