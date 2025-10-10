import db from "@/db";
import { createServerFn } from "@tanstack/react-start";
import { blogs, images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  slug: z.string(),
});

export const getBlogBySlug = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { slug } }) => {
    const data = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .leftJoin(images, eq(blogs.cover, images.id));

    if (!data.length) return null;
    const { blogs: blogData, images: imageData } = data[0];
    return { ...blogData, image: imageData };
  });
