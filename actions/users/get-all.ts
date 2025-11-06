import { createServerFn } from "@tanstack/react-start";
import { user } from "auth-db/auth-schema";
import db from "@/db";

export const getAllUsers = createServerFn().handler(async () => {
  return db.select().from(user).all();
});
