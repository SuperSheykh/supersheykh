import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
// import { TanstackDevtools } from "@tanstack/react-devtools";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";

import Header from "@/components/header";

import appCss from "@/styles/app.css?url";
import ThemeProvider from "@/components/providers/theme-provider";
import MenuDrawerProvider from "@/components/providers/menu-drawer-provider";
import Footer from "@/components/footer";

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

function RootDocument({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    }),
  );

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground font-fira">
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
              <MenuDrawerProvider />
              <ThemeProvider>
                <Header />
                {children}
                <Footer />
              </ThemeProvider>
            </I18nextProvider>
          </QueryClientProvider>
        </trpc.Provider>
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
