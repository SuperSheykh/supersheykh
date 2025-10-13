import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { skills } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  id: z.string(),
});

export const delSkill = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(skills).where(eq(skills.id, id)).returning();
  });
