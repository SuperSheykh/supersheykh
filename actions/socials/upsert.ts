import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { socials, socialSchema } from "@/db/schema/socials";

export const upsertSocial = createServerFn()
  .inputValidator(socialSchema)
  .handler(async ({ data }) => {
    const { id, ...rest } = data;

    const [res] = await db
      .insert(socials)
      .values(data)
      .onConflictDoUpdate({ target: socials.id, set: rest })
      .returning();

    return res;
  });
