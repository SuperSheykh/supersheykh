import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { quotes } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const inputSchema = z.object({
  id: z.string(),
});

export const delQuote = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    return db.delete(quotes).where(eq(quotes.id, id)).returning();
  });
