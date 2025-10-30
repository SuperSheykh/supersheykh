import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { policies, policySchema } from "@/db/schema/policies";

export const upsertPolicy = createServerFn()
  .inputValidator(policySchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    const [policy] = await db
      .insert(policies)
      .values(data)
      .onConflictDoUpdate({
        target: policies.id,
        set: { ...rest, updatedAt: new Date().toISOString() },
      })
      .returning();
    return policy;
  });
