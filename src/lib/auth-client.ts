import { createAuthClient } from "better-auth/client";

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: "http://localhost:3000",
});
