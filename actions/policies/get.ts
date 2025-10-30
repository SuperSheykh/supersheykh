import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { policies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  slug: z.string(),
});

export const getPolicy = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { slug } }) => {
    return (
      await db.select().from(policies).where(eq(policies.slug, slug)).limit(1)
    )[0];
  });
