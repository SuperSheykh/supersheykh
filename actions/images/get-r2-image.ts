import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import { z } from "zod";
import { env } from "cloudflare:workers";

const inputSchema = z.object({
  key: z.string(),
});

export const getR2Image = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { key } }) => {
    const request = getRequest();
    const res = await env.BK.get(key);

    if (!res) return new Response("Not found", { status: 404 });

    const headers = new Headers();
    headers.set(
      "Content-Type",
      res.httpMetadata?.contentType ?? "application/octet-stream",
    );
    headers.set(
      "Cache-Control",
      "public, max-age=31536000, s-maxage=31536000, immutable",
    );
    headers.set("ETag", res.etag);
    headers.set("Last-Modified", res.uploaded.toUTCString());

    const ifNoneMatch = request.headers.get("If-None-Match");
    const ifModifiedSince = request.headers.get("If-Modified-Since");

    if (ifNoneMatch && ifNoneMatch === res.etag) {
      return new Response(null, { status: 304, headers });
    }

    if (ifModifiedSince) {
      const modifiedSinceDate = new Date(ifModifiedSince);
      if (res.uploaded <= modifiedSinceDate) {
        return new Response(null, { status: 304, headers });
      } else {
        // If the resource has been modified, remove the If-Modified-Since header
        // to ensure the full content is sent.
        headers.delete("If-Modified-Since");
      }
    }

    return new Response(res.body, { headers });
  });
