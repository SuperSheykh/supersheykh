import { createRouter } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AppRouter } from "@worker/trpc/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const queryClient = new QueryClient();

export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: createTRPCClient({
    links: [
      httpBatchLink({
        url: "/trpc",
      }),
    ],
  }),
  queryClient,
});

// Create a new router instance
export const getRouter = () => {
  const { user, isLoading } = useAuthStore.getState();
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: {
      trpc,
      queryClient,
      auth: {
        user,
        isLoading,
      },
    },
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
};
