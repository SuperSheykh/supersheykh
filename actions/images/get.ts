import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  key: z.string(),
});

export const getImage = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { key } }) => {
    return (
      await db.select().from(images).where(eq(images.key, key)).limit(1)
    )[0];
  });
