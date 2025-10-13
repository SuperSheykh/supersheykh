import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  id: z.string(),
});

export const delBillboard = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(billboards).where(eq(billboards.id, id)).returning();
  });
