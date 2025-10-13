import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getBillboard = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return (
      await db.select().from(billboards).where(eq(billboards.id, id)).limit(1)
    )[0];
  });
