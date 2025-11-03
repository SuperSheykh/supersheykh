import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import type { Env } from "@/types";
import { Session, User } from "better-auth";

export const bucketRoutes = new Hono<{
  Bindings: Env;
  Variables: { user: User | null; session: Session | null };
}>()
  .post("/", async (c) => {
    const formData = await c.req.formData();
    const file = formData.get("file");
    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      const key = uuidv4();
      const uploaded = await c.env.BK.put(key, buffer, {
        httpMetadata: {
          contentType: file.type,
        },
      });
      return c.json({ key: uploaded.key });
    }
  })
  .get("/:key", async (c) => {
    const key = c.req.param("key");
    const res = await c.env.BK.get(key);

    if (!res) return c.json({ error: "Not found" }, 404);

    return new Response(res.body, {
      headers: {
        "Content-Type":
          res.httpMetadata?.contentType ?? "application/octet-stream",
      },
    });
  })
  .delete("/:key", async (c) => {
    const key = c.req.param("key");
    await c.env.BK.delete(key);
    return c.json({ success: true });
  });
