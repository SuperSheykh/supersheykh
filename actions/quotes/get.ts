import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getQuote = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return (
      await db.select().from(quotes).where(eq(quotes.id, id)).limit(1)
    )[0];
  });
