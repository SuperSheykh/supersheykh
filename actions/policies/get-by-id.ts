import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { policies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getPolicyById = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return (
      (
        await db.select().from(policies).where(eq(policies.id, id)).limit(1)
      )[0] ?? null
    );
  });
