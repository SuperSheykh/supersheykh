import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { images } from "@/db/schema";

export const getAllImages = createServerFn().handler(async () => {
  return db.select().from(images).all();
});
