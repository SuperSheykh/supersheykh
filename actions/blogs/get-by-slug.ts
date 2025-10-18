import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  slug: z.string(),
});

export const getBlogBySlug = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { slug } }) => {
    return (
      await db.select().from(blogs).where(eq(blogs.slug, slug)).limit(1)
    )[0];
  });
