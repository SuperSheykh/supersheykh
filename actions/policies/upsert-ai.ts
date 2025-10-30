import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { policies, policySchema, policyFormSchema } from "@/db/schema/policies";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";

export const upsertPolicyAi = createServerFn()
  .inputValidator(policyFormSchema)
  .handler(async ({ data }) => {
    console.log("data:", data);
    const { id, title, lang, prompt } = data;

    const initPrompt = `
context: You are an expert about Malian law and you are charged with writting my website legal policies. So you are a professional lawyer.
Based on the following title and supplement prompt provided in ${lang}, generate a policy that matches 
the title and that is compliant with the law in general but the malien law in particular.
- title: ${title}
- prompt: ${prompt}
Format the content in very nice and redeable markdown for both french and english according to the schema given. 
Don't just translate the content from one language to the other, make it make sense and coherent, normal length and be concise. 
You could even enhance the title provided.
`;

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      prompt: initPrompt,
      schema: policySchema.omit({
        id: true,
      }),
    });

    console.log("object:", object);

    const [policy] = await db
      .insert(policies)
      .values({ id, ...object })
      .onConflictDoUpdate({
        target: policies.id,
        set: { ...object, updatedAt: new Date().toISOString() },
      })
      .returning();
    return policy;
  });
