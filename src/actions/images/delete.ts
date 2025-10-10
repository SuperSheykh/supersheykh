'''use server''';
import { env } from "cloudflare:workers";
import db from "@/db";
import { images } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteImage = async (id: string) => {
  // IMPORTANT: Ensure 'IMAGES_BUCKET' is the correct R2 bucket binding name in your wrangler.json
  const R2 = (env as any).IMAGES_BUCKET as R2Bucket;
  if (!R2) {
    throw new Error("R2 bucket not found. Please check your configuration.");
  }

  // Delete from R2
  await R2.delete(id);

  // Delete from DB
  const deletedImage = await db.delete(images).where(eq(images.id, id)).returning();

  return deletedImage[0];
};
