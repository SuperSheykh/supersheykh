import { Hono } from "hono";
import { auth } from "@/auth";
import { images } from "./images";

export const api = new Hono()
  // let better-auth handle all /api/auth requests
  .use("/auth", (c) => {
    return auth.handler(c.req.raw);
  })
  .route("/images", images);
