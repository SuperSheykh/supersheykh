import { auth } from "@/auth";
import { Hono } from "hono";

export const authRoute = new Hono().use("/", async (c) => {
  return auth.handler(c.req.raw);
});
