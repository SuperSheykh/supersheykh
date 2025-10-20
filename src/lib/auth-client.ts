import { createAuthClient } from "better-auth/client";
import { reactStartCookies } from 'better-auth/react-start'

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [reactStartCookies()],
});
