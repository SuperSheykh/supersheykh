import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";
import { v4 as uuidv4 } from "uuid";

export const Route = createFileRoute("/images/")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get("file");

        if (file instanceof File) {
          const buffer = await file.arrayBuffer();
          const key = uuidv4();

          const uploaded = await env.BK.put(key, buffer, {
            httpMetadata: {
              contentType: file.type,
            },
          });

          return new Response(JSON.stringify({ key: uploaded.key }));
        }
      },
    },
  },
});
