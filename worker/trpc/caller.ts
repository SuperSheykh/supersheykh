import { appRouter } from "./router";
import type { Env } from "@/types";
import { createContext } from "./context";

export const createCaller = async (env: Env) => {
  const ctx = await createContext(env);
  return appRouter.createCaller(ctx);
};
