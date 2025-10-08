import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/header";

import appCss from "@/styles/app.css?url";
import ThemeProvider from "@/components/providers/theme-provider";
import MenuDrawerProvider from "@/components/providers/menu-drawer-provider";
import Footer from "@/components/footer";
import BreadcrumbComponent from "@/components/breadcrumb";

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
  const themeScript = `
    (function() {
      document.documentElement.classList.remove('light', 'dark');
      const theme = localStorage.getItem('supersheykh-ui-theme') || 'system';
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(theme);
      }
    })();
  `;

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground font-fira">
        <I18nextProvider i18n={i18n}>
          <MenuDrawerProvider />
          <ThemeProvider>
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
