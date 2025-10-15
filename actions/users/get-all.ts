import { createServerFn } from "@tanstack/react-start";
import { user } from "@/db/schema/auth-schema";
import db from "@/db";

export const getAllUsers = createServerFn().handler(async () => {
  return db.select().from(user).all();
});
