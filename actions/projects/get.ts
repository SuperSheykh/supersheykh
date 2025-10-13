import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getProject = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return (
      await db.select().from(projects).where(eq(projects.id, id)).limit(1)
    )[0];
  });
