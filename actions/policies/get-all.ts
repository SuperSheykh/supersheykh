import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { policies } from "@/db/schema";

export const getAllPolicies = createServerFn().handler(async () => {
  return await db.select().from(policies);
});
