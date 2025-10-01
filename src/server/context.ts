import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";
import type { Env } from "@/types";

//Context
export const createContext = ({ env }: { env: Env }) => {
  const db = drizzle(env.DB, { schema });
  return { db };
};

//empty context for now
export type Context = Awaited<ReturnType<typeof createContext>>;
