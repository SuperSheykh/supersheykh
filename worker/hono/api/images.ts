import { Hono } from "hono";
import { Env } from "@/types";

const API_URL = process.env.IMAGES_API_URL as string;
const TOKEN = process.env.IMAGES_API_TOKEN as string;

export const imagesRoutes = new Hono<{ Bindings: Env }>().post(
  "/",
  async (c) => {
    const formData = await c.req.formData();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: formData,
    });

    const result = await res.json();
    return c.json({ result });
  },
);
