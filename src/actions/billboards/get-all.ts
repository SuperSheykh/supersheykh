import { billboards } from "@/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export const getAllBillboards = createServerFn().handler(async () => {
  const db = drizzle(env.DB, { schema });

  const data = await db.select().from(billboards);

  return data;
});
