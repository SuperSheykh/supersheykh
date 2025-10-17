import { Hono } from "hono";
import { images } from "./images";
import { auth } from "@/auth";

export const api = new Hono()
  .use("/auth", (c) => {
    return auth.handler(c.req.raw);
  })
  // let better-auth handle all /api/auth requests
  .route("/images", images)
  .get("/test", async (c) => {
    return c.text("test");
  });
