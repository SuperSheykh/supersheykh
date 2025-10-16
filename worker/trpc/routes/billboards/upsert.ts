import { publicProcedure } from "@worker/trpc/trpc";
import { billboards, images } from "@/db/schema";
import { billboardSchema } from "@/db/schema/billboards";

export const upsertBillboard = publicProcedure
  .input(billboardSchema)
  .mutation(async ({ input: data, ctx: { db, env } }) => {
    const { id, ...rest } = data;

    const imgObject = await env.BK.get(rest.imageKey);
    if (!imgObject) throw new Error("Image not found");

    const [img] = await db
      .insert(images)
      .values({
        id: imgObject.key,
        type: imgObject.httpMetadata?.contentType,
        size: imgObject.size,
        uploadedAt: new Date().toISOString(),
        alt: data.title,
      })
      .onConflictDoNothing()
      .returning();

    if (img)
      return await db
        .insert(billboards)
        .values(data)
        .onConflictDoUpdate({ target: billboards.id, set: rest })
        .returning();
  });
