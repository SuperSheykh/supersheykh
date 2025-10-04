import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export type Env = {
  DB: D1Database;
  BK: R2Bucket;
};

export type ContextType = {
  cloudflare: {
    env: Env;
    ctx: ExecutionContext;
  };
  db: DrizzleD1Database<typeof schema>;
};
