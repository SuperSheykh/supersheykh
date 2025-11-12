import { Hono } from "hono";
import { cors } from "hono/cors";
import handler from "@tanstack/react-start/server-entry";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "../trpc/router";
import { createContext } from "../trpc/context";
import { Env } from "@/types";
import { auth } from "auth";
import type { User, Session } from "better-auth";
import apiRoutes from "./api";

const app = new Hono<{
  Bindings: Env;
  Variables: { user: User | null; session: Session | null };
}>();

//Cors settings for the auth route to allow my sub domains to access it.
app.use(
  "/api/auth/*",
  cors({
    origin: ["/\.supersheykh\.win$/", "http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("/api/auth/*", async (c) => {
  return auth.handler(c.req.raw);
});

// Auth middleware. that will fetch the user and set the user variable.
app.use("*", async (c, next) => {
  const res = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!res) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", res.user);
  c.set("session", res.session);
  await next();
});

// Setup tRPC server
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_, c) =>
      createContext(c.env, c.get("user"), c.get("session")),
  }),
);

// Setup API routes - I chose this over the tanstack react-start approach but I guess It both will workout.
// since the start handler will take over if there no matching route.
app.route("/api", apiRoutes);

// Let tanstack handle all other requests
app.all("*", async (c) => {
  return handler.fetch(c.req.raw);
});

export { app };
