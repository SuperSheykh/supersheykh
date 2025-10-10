import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs, images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getBlogById = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    if (id === "new") return null;
    const data = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .leftJoin(images, eq(blogs.cover, images.id));
    if (!data.length) return null;
    const { blogs: blogData, images: imageData } = data[0];
    return { ...blogData, image: imageData };
  });
