import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
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
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-fira">
        {/* <QueryProvider> */}
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
          {/* <TanStackDevtools */}
          {/*   config={{ */}
          {/*     position: "bottom-left", */}
          {/*   }} */}
          {/*   plugins={[]} */}
          {/* /> */}
        </I18nextProvider>
        {/* </QueryProvider> */}
        <Scripts />
      </body>
    </html>
  );
}
