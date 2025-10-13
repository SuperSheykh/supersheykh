import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards, billboardSchema } from "@/db/schema/billboards";

export const upsertBillboard = createServerFn()
  .inputValidator(billboardSchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;

    const [res] = await db
      .insert(billboards)
      .values(data)
      .onConflictDoUpdate({ target: billboards.id, set: rest })
      .returning();

    return res;
  });
