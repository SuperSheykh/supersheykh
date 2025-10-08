import { Hono } from "hono";
import handler from "@tanstack/react-start/server-entry";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "../trpc/router";
import { createContext } from "../trpc/context";
import { Env } from "@/types";
import { auth } from "@/auth";

const app = new Hono<{ Bindings: Env }>();

// let better-auth handle all /api/auth requests
app.use("/api/auth/*", async (c) => {
  return auth.handler(c.req.raw);
});

// Setup tRPC server
app.use("/trpc*", async (c, next) => {
  const server = trpcServer({
    router: appRouter,
    createContext: () => createContext(c.env),
  });
  return server(c, next);
});

// Let tanstack handle all other requests
app.all("*", (c) => {
  return handler.fetch(c.req.raw, {
    context: {},
  });
});

export { app };
