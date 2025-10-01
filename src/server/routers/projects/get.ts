import { publicProcedure } from "@/server/trpc";
import { z } from "zod";
import { projects } from "@/server/db/schema";

export default publicProcedure
  .input(z.string().optional())
  .query(async ({ ctx: { db } }) => {
    const res = await db.select().from(projects);
    console.log(res);
    return res;
  });
