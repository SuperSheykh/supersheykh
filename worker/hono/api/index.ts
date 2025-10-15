import { Hono } from "hono";
import { images } from "./images";
import { auth } from "@/auth";

export const api = new Hono()
  .use("/auth", (c) => {
    console.log("auth handler");
    return auth.handler(c.req.raw);
  })
  // let better-auth handle all /api/auth requests
  .route("/images", images);
