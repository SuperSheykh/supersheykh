import { env } from "cloudflare:workers";
import db from "@/db";
import { images } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export const addImage = async (formData: FormData) => {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  // IMPORTANT: Ensure 'IMAGES_BUCKET' is the correct R2 bucket binding name in your wrangler.json
  const R2 = (env as any).IMAGES_BUCKET as R2Bucket;
  if (!R2) {
    throw new Error("R2 bucket not found. Please check your configuration.");
  }

  const key = uuidv4();

  // Upload to R2
  await R2.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  // Insert into DB
  const newImage = await db.insert(images).values({ id: key }).returning();

  return newImage[0];
};
