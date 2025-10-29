import { Hono } from "hono";
import handler from "@tanstack/react-start/server-entry";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "../trpc/router";
import { createContext } from "../trpc/context";
import { Env } from "@/types";
import { auth } from "auth";
import type { User, Session } from "better-auth";

const app = new Hono<{
  Bindings: Env;
  Variables: { user: User | null; session: Session | null };
}>();

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

// Let tanstack handle all other requests
app.all("*", async (c) => {
  return handler.fetch(c.req.raw);
});

export { app };
