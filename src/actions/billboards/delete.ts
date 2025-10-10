import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const deleteBillboard = createServerFn()
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data: { id } }) => {
    return await db.delete(billboards).where(eq(billboards.id, id)).returning();
  });