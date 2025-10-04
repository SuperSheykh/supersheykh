import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@worker/trpc/router";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
