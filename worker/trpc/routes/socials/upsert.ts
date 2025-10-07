import { publicProcedure } from "@worker/trpc/trpc";
import { socials } from "@/db/schema";
import { socialSchema } from "@/db/schema/socials";

export const upsertSocial = publicProcedure
  .input(socialSchema)
  .mutation(async ({ ctx: { db }, input: data }) => {
    const { id, ...rest } = data;
    await db
      .insert(socials)
      .values(data)
      .onConflictDoUpdate({ target: socials.id, set: rest })
      .returning();
  });
