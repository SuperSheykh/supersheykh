import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import {
  billboardFormSchema,
  billboards,
  billboardSchema,
} from "@/db/schema/billboards";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertBillboard = createServerFn()
  .inputValidator(billboardFormSchema)
  .handler(async ({ data }) => {
    const prompt = getPrompt(data, "billboards");
    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: billboardSchema,
      prompt,
    });

    const { id, ...rest } = object;

    const [res] = await db
      .insert(billboards)
      .values(object)
      .onConflictDoUpdate({ target: billboards.id, set: rest })
      .returning();

    return res;
  });
