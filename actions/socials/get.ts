import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { socials } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getSocial = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return (
      await db.select().from(socials).where(eq(socials.id, id)).limit(1)
    )[0];
  });
