import { publicProcedure } from "@worker/trpc/trpc";
import { images, projects } from "@/db/schema";
import { projectFormSchema, projectSchema } from "@/db/schema/projects";
import slugify from "@/lib/utils/slugify";
import { generateObject } from "ai";
import { groq } from "@ai-sdk/groq";
import { getPrompt } from "@/lib/utils/get-translate-prompt";

export const upsertProject = publicProcedure
  .input(projectFormSchema)
  .mutation(async ({ ctx, input: data }) => {
    const imgObject = await ctx.env.BK.get(data.cover);

    if (!imgObject) throw new Error("Image not found");

    const [newImg] = await ctx.db
      .insert(images)
      .values({
        id: data.cover,
        alt: data.title,
        // size: imgObject.size,
        // type: imgObject.httpMetadata?.contentType,
        uploadedAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .returning();

    const prompt = getPrompt(data, "projects");

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: projectSchema,
      prompt,
    });

    const { id, ...rest } = object;

    const slug = slugify(object.title);

    const [project] = await ctx.db
      .insert(projects)
      .values({ ...object, slug })
      .onConflictDoUpdate({
        target: projects.id,
        set: { ...rest, slug, cover: newImg.id },
      })
      .returning();

    return project;
  });
