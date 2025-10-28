import { drizzle } from "drizzle-orm/d1";
import { Env } from "@/types";
import * as schema from "@/db/schema";
import type { User } from "better-auth";

export const createContext = async (env: Env, user: User | null = null) => {
  return {
    db: drizzle(env.DB, { schema }),
    user,
    env,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

