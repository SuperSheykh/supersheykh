import { createServerFn } from "@tanstack/react-start";

import { z } from "zod";
import { env } from "cloudflare:workers";

const inputSchema = z.object({
  key: z.string(),
});

export const deleteR2Image = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { key } }) => {
    await env.BK.delete(key);
    return new Response("Deleted!", { status: 200 });
  });
