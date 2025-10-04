import { drizzle } from "drizzle-orm/d1";
import { Env } from "@/types";

export const createContext = async (env: Env) => {
  return {
    db: drizzle(env.DB),
    env,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;