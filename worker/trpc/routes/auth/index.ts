import { getUser } from "./get-user";
import { getSession } from "./get-session";
import { router } from "@worker/trpc/trpc";

export { getUser, getSession };

export const authRouter = router({
  getUser,
  getSession,
});
