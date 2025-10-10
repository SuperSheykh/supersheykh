import { createServerFn } from "@tanstack/react-start";
import db from "@/db";
import { billboards, images } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const inputSchema = z.object({
  id: z.string(),
});

export const getBillboardById = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data: { id } }) => {
    if (id === "new") return null;
    const data = await db
      .select()
      .from(billboards)
      .where(eq(billboards.id, id))
      .leftJoin(images, eq(billboards.imageUrl, images.id));
    if (!data.length) return null;
    const { billboards: billboardData, images: imageData } = data[0];
    return { ...billboardData, image: imageData };
  });
