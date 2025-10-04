import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { env } from "cloudflare:workers";

export default drizzle(env.DB, { schema });
