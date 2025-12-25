import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";

import { MenuIcon } from "lucide-react";
import LoginBtn from "./auth/login-btn";
import ThemeSwitcher from "./theme-switcher";
import LocaleSwitcher from "./local-switcher";

export default function DesktopNav() {
  return (
    <div className="hidden md:block">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"}>
            <MenuIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit mr-4">
          <div className="flex flex-col gap-y-4">
            <LoginBtn />
            <ThemeSwitcher />
            <LocaleSwitcher />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
