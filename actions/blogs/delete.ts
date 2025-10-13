import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  id: z.string(),
});

export const delBlog = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(blogs).where(eq(blogs.id, id)).returning();
  });
