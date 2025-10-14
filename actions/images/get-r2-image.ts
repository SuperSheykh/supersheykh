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

    if (!res) return new Response("Not found", { status: 404 });

    return new Response(res.body, {
      headers: {
        "Content-Type":
          res.httpMetadata?.contentType ?? "application/octet-stream",
      },
    });
  });
