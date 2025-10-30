import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { policies } from "@/db/schema/policies";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const deletePolicy = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(policies).where(eq(policies.id, id)).returning();
  });
