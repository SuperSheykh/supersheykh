import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { socials } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  id: z.string(),
});

export const delSocial = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(socials).where(eq(socials.id, id)).returning();
  });
