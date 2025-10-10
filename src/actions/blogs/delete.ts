import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({ id: z.string() });

export const deleteBlog = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return await db.delete(blogs).where(eq(blogs.id, id)).returning();
  });
