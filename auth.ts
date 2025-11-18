import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "./auth-db/index";
import { reactStartCookies } from "better-auth/react-start";
import { admin } from "better-auth/plugins";
import * as schema from "./auth-db/auth-schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),
  appName: "SuperSheykh",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },

    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    },
  },
  advanced: {
    //What actually permits me to have cookies sent to subdomains.
    crossSubDomainCookies: {
      enabled: true,
      domain: ".supersheykh.win",
    },
  },
  plugins: [
    admin({
      adminUserIds: [process.env.ADMIN_USER_ID as string],
    }),
    reactStartCookies(),
  ],
});
