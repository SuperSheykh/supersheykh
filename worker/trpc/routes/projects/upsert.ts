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
    const { id } = data;

    const imgObject = await ctx.env.BK.get(data.cover);

    if (!imgObject) throw new Error("Image not found");

    const [newImg] = await ctx.db
      .insert(images)
      .values({
        id: data.cover,
        alt: data.title,
        uploadedAt: new Date().toISOString(),
      })
      .onConflictDoNothing()
      .returning();

    const prompt =
      getPrompt(data, "projects") +
      `
      in the title don't translate the name part like in:
      Title: Store - Buy retail products online
      Title_fr: Store - Acheter des produits en ligne
      `;

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-20b"),
      schema: projectSchema.omit({ id: true }),
      prompt,
    });

    const { slug, ...rest } = object;

    const [project] = await ctx.db
      .insert(projects)
      .values({ ...object, id, slug })
      .onConflictDoUpdate({
        target: projects.id,
        set: {
          ...rest,
          slug: slug ?? slugify(object.title),
          cover: newImg ? newImg.id : data.cover,
        },
      })
      .returning();

    return project;
  });
