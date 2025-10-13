import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { projects } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  id: z.string(),
});

export const delProject = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(projects).where(eq(projects.id, id)).returning();
  });
