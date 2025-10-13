import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards } from "@/db/schema";

export const getLiveBillboards = createServerFn().handler(async () => {
  return db.select().from(billboards).all();
});
