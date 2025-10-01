import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/",
  dialect: "sqlite",
  schema: "./src/server/db/schema/index.ts",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.D1_ACCOUNT_ID as string,
    databaseId: process.env.D1_DATABASE_ID as string,
    token: process.env.D1_TOKEN as string,
  },
});
