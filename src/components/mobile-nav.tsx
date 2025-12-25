import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTrans } from "@/hooks/use-trans";
import { cn } from "@/lib/utils";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { Button } from "./ui/button";

import { PAGES } from "@/lib/constants";
import { MenuIcon } from "lucide-react";
import LoginBtn from "./auth/login-btn";
import ThemeSwitcher from "./theme-switcher";
import LocaleSwitcher from "./local-switcher";

export default function MobileNav() {
  return (
    <div className="md:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"}>
            <MenuIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-screen">
          <div className="flex flex-col gap-y-2">
            {PAGES.map((page) => (
              <NavItem
                key={page.path}
                to={page.path}
                title={page.title}
                title_fr={page.title_fr}
              />
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex flex-col gap-y-4">
            <LoginBtn />
            <div className="flex justify-between items-center">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
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
    <Button variant="ghost" className={cn("w-full")} asChild>
      <Link
        to={to}
        activeProps={{
          className: "font-bold",
        }}
      >
        <span
          className={cn(
            "text-2xl mr-1 text-foreground",
            isActive && "text-primary",
          )}
        >
          #
        </span>
        {t(title, title_fr)}
      </Link>
    </Button>
  );
};
