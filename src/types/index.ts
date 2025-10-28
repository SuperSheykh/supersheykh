import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@worker/trpc/router";
import { User } from "better-auth";

export type Env = {
  DB: D1Database;
  BK: R2Bucket;
  user: User | null
};

export type ContextType = {
  cloudflare: {
    env: Env;
    ctx: ExecutionContext;
  };
  db: DrizzleD1Database<typeof schema>;
};

export type TrpcRouterOutputs = inferRouterOutputs<AppRouter>;
