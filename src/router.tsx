import { createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { trpc } from "./lib/utils/trpc";

// Create a new router instance
export const getRouter = () => {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    context: {
      trpc: "hello",
    },
    Wrap: ({ children }) => {
      const [queryClient] = useState(() => new QueryClient());
      const [trpcClient] = useState(() =>
        trpc.createClient({
          links: [
            httpBatchLink({
              url: "/trpc",
            }),
          ],
        }),
      );
      return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </trpc.Provider>
      );
    },
  });
};

