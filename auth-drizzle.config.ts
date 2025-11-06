import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./auth-db/migrations/",
  dialect: "postgresql",
  schema: "./auth-db/auth-schema.ts",
  dbCredentials: {
    url: process.env.AUTH_DATABASE_URL as string,
  },
});
