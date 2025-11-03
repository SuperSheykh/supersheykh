import { publicProcedure } from "@worker/trpc/trpc";
import { billboards, images } from "@/db/schema";
import { billboardFormSchema, billboardSchema } from "@/db/schema/billboards";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertBillboard = publicProcedure
  .input(billboardFormSchema)
  .mutation(async ({ ctx, input: data }) => {
    const { id, ...rest } = data;

    const prompt = getPrompt(data, "billboards");

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: billboardSchema,
      prompt,
    });

    const imgObject = await ctx.env.BK.get(rest.imageKey);
    if (!imgObject) throw new Error("Image not found");

    const [img] = await ctx.db
      .insert(images)
      .values({
        id: imgObject.key,
        type: imgObject.httpMetadata?.contentType,
        size: imgObject.size,
        uploadedAt: new Date().toISOString(),
        alt: object.title,
      })
      .onConflictDoNothing()
      .returning();

    return await ctx.db
      .insert(billboards)
      .values({ ...object, id, imageKey: img?.id ?? imgObject.key })
      .onConflictDoUpdate({
        target: billboards.id,
        set: { ...rest, imageKey: img?.id ?? imgObject.key },
      })
      .returning();
  });
