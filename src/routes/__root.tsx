import { useState } from "react";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@worker/trpc/router";
import { TRPCProvider } from "@/lib/utils/trpc";
import { getQueryClient } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/header";

import appCss from "@/styles/app.css?url";
import ThemeProvider from "@/components/providers/theme-provider";
import MenuDrawerProvider from "@/components/providers/menu-drawer-provider";
import Footer from "@/components/footer";

// Create these instances once at the module level
const queryClient = getQueryClient();
const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/trpc",
    }),
  ],
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "SuperSheyh",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

export function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground font-fira">
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <TRPCProvider queryClient={queryClient} trpcClient={trpcClient}>
              <MenuDrawerProvider />
              <ThemeProvider>
                <div className="flex flex-col min-h-screen gap-y-12">
                  <Header />
                  <div className="h-full">{children}</div>
                  <Footer />
                </div>
                <Toaster />
              </ThemeProvider>
            </TRPCProvider>
          </QueryClientProvider>
        </I18nextProvider>
        {/* <TanstackDevtools */}
        {/*   config={{ */}
        {/*     position: "bottom-left", */}
        {/*   }} */}
        {/*   plugins={[ */}
        {/*     { */}
        {/*       name: "Tanstack Router", */}
        {/*       render: <TanStackRouterDevtoolsPanel />, */}
        {/*     }, */}
        {/*   ]} */}
        {/* /> */}
        <Scripts />
      </body>
    </html>
  );
}
