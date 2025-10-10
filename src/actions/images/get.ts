'''use server''';
import db from "@/db";
import { images } from "@/db/schema";

export const getAllImages = async () => {
  return db.select().from(images);
};
