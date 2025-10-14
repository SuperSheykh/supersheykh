import { publicProcedure } from "@worker/trpc/trpc";
import { z } from "zod";
import { v4 as uuidV4 } from "uuid";

const inputSchema = z.object({
  formData: z.instanceof(FormData),
});

export const uploadImage = publicProcedure
  .input(inputSchema)
  .mutation(async ({ ctx: { env }, input: { formData } }) => {
    const file = formData.get("file") as File;
    const contentType = file.type;
    const buffer = await file.arrayBuffer();

    // Upload to R2
    const uploaded = await env.BK.put(uuidV4(), buffer, {
      httpMetadata: {
        contentType: contentType || "application/octet-stream", // Use dynamic contentType or a default
      },
    });

    return { key: uploaded.key };
  });
