import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { AppRouter } from "@worker/trpc/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Create the shared QueryClient here
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
    },
  },
});

// ✅ Create a single tRPC client bound to that QueryClient
const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc", // relative for Cloudflare routing
    }),
  ],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});

// Create a new router instance
export const getRouter = () => {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: {
      trpc,
      queryClient,
    },
    Wrap: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    },
  });
};
