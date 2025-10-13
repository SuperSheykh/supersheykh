import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getSkill = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return (
      await db.select().from(skills).where(eq(skills.id, id)).limit(1)
    )[0];
  });
