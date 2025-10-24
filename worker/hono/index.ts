import { Hono } from "hono";
import handler from "@tanstack/react-start/server-entry";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "../trpc/router";
import { createContext } from "../trpc/context";
import { Env } from "@/types";
import { api as apiRoutes } from "./api";

const app = new Hono<{ Bindings: Env }>();

// Handles all the /api requests
app.route("/api", apiRoutes);

// Setup tRPC server
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_, c) => createContext(c.env),
  }),
);

// Let tanstack handle all other requests
app.all("*", async (c) => {
  // Get the session
  //create a trpc caller at each request pass it to the handler context
  return handler.fetch(c.req.raw, {
  });
});

export { app };
