import { Env } from "@/types";
import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";

export const images = new Hono<{ Bindings: Env }>()
  .post("/", async (c) => {
    const formData = await c.req.formData();
    const file = formData.get("file");

    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const key = uuidv4();

      try {
        const uploaded = await c.env.BK.put(key, buffer, {
          httpMetadata: {
            contentType: file.type,
          },
        });
        return c.json({ key: uploaded.key });
      } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to upload image" }, 500);
      }
    }

    return c.json({ error: "Invalid request" }, 400);
  })
  //here I want to serve the image from R2 to the client
  .get("/:key", async (c) => {
    const key = c.req.param("key");
    const imgObject = await c.env.BK.get(key);
    if (!imgObject) return c.notFound();

    return new Response(imgObject.body, {
      headers: {
        "Content-Type":
          imgObject.httpMetadata?.contentType || "application/octet-stream",
      },
    });
  });
