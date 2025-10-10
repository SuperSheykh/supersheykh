import { Link, useMatchRoute } from "@tanstack/react-router";
import Gutter from "./gutter";
import { Button } from "./ui/button";
import Logo from "./logo";

import { PAGES } from "@/lib/constants";
import LocalSwitcher from "./local-switcher";
import ThemeSwitcher from "./theme-switcher";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenuDrawer } from "@/hooks/use-menu-drawer";
import { useTrans } from "@/hooks/use-trans";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-0 shadow-xs">
      <Gutter>
        <nav className="py-2 flex justify-between items-center">
          <Logo className="text-base" />
          <div className="w-auto flex gap-x-2 justify-end">
            {PAGES.map((page) => (
              <NavItem
                key={page.path}
                to={page.path}
                title={page.title}
                title_fr={page.title_fr}
              />
            ))}
            <div className="ml-3 flex gap-x-2">
              <LocalSwitcher />
              <ThemeSwitcher />
              <MenuBtn />
            </div>
          </div>
        </nav>
      </Gutter>
    </header>
  );
}

const NavItem = ({
  to,
  title,
  title_fr,
}: {
  to: string;
  title: string;
  title_fr?: string;
}) => {
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to, fuzzy: true });
  const t = useTrans();
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-auto px-2 hidden md:inline-block transition font-normal",
        isActive && "font-bold",
      )}
      asChild
    >
      <Link to={to}>
        <span
          className={cn(" mr-1 text-foreground", isActive && "text-primary")}
        >
          #
        </span>
        {t(title, title_fr)}
      </Link>
    </Button>
  );
};

const MenuBtn = () => {
  const openMenu = useMenuDrawer((state) => state.open);
  return (
    <Button variant={"ghost"} className="md:hidden" onClick={openMenu}>
      <MenuIcon />
    </Button>
  );
};
