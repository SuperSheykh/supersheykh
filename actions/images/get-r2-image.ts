import { createServerFn } from "@tanstack/react-start";

import { z } from "zod";
import { env } from "cloudflare:workers";

const inputSchema = z.object({
  key: z.string(),
});

export const getR2Image = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { key } }) => {
    const res = await env.BK.get(key);

    if (!res) throw new Error("Failed to get image from R2");

    return new Response(res.body, {
      headers: {
        "Content-Type":
          res.httpMetadata?.contentType ?? "application/octet-stream",
      },
    });
  });
