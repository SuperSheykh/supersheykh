import { HeadContent, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { type queryClient, type trpc } from "@/router";
import type { User } from 'better-auth/types'

import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/header";

import appCss from "@/styles/app.css?url";
import ThemeProvider from "@/components/providers/theme-provider";
import MenuDrawerProvider from "@/components/providers/menu-drawer-provider";
import DialogProvider from "@/components/providers/dialog-provider";
import Footer from "@/components/footer";
import BreadcrumbComponent from "@/components/breadcrumb";
import { themeScript } from "@/lib/utils/themeScript";

export interface RouterContext {
  auth: {
    user: User | null;
    isLoading: boolean;
  };
  trpc: typeof trpc;
  queryClient: typeof queryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
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
        title: "SuperSheyh | Portfolio and Blog",
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
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-fira">
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <MenuDrawerProvider />
            <DialogProvider />
            <div className="flex flex-col min-h-screen gap-y-12">
              <Header />
              <div className="h-full">
                <BreadcrumbComponent />
                {children}
              </div>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </I18nextProvider>
        <Scripts />
      </body>
    </html>
  );
}
