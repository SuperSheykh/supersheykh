import { createServerFn } from "@tanstack/react-start";
import { user } from "auth-db/auth-schema";
import db from "auth-db/index";

export const getAllUsers = createServerFn().handler(async () => {
  return db.select().from(user);
});
