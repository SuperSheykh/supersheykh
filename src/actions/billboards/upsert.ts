import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards } from "@/db/schema/billboards";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { billboardSchema } from "@/db/schema/billboards";

const upsertSchema = billboardSchema.extend({ id: z.string().optional() });

export const upsertBillboard = createServerFn({ method: "POST" })
  .inputValidator(upsertSchema)
  .handler(async ({ data }) => {
    if (data.id) {
      const { id, ...updateData } = data;
      return db
        .update(billboards)
        .set(updateData)
        .where(eq(billboards.id, id))
        .returning();
    }
    return db.insert(billboards).values(data).returning();
  });
