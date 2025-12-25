import { Hono } from "hono";
import { cors } from "hono/cors";
import handler from "@tanstack/react-start/server-entry";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "../trpc/router";
import { createContext } from "../trpc/context";
import { Env } from "@/types";
import type { User, Session } from "better-auth";
import apiRoutes from "./api";

const app = new Hono<{
  Bindings: Env;
  Variables: { user: User | null; session: Session | null };
}>();

app.use(
  "*",
  cors({
    origin: ["/\.supersheykh\.win/"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

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
