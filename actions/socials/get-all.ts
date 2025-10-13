import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { socials } from "@/db/schema";

export const getAllSocials = createServerFn().handler(async () => {
  return db.select().from(socials).all();
});