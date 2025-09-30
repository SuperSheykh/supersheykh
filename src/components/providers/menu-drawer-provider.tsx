import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
} from "@/components/ui/sheet";
import { useMenuDrawer } from "@/hooks/use-menu-drawer";
import { PAGES } from "@/lib/constants";
import { Button } from "../ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const MenuDrawerProvider = () => {
  const open = useMenuDrawer((state) => state.isOpen);
  const close = useMenuDrawer((state) => state.close);
  const onChange = (open: boolean) => {
    if (!open) close();
  };
  return (
    <Sheet open={open} onOpenChange={onChange}>
      <SheetContent className="w-4/5">
        <SheetHeader>
          <p className="text-2xl font-semibold text-center">Menu</p>
        </SheetHeader>
        <div className="mt-4 p-8 flex flex-col gap-4">
          {PAGES.map((item) => {
            return <NavItem {...item} />;
          })}
        </div>
        <SheetFooter>some links</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const NavItem = ({
  title,
  path,
}: {
  title: string;
  title_fr?: string;
  path: string;
}) => {
  const isActive = useLocation().pathname === path;
  const close = useMenuDrawer((state) => state.close);
  return (
    <Button variant="link" asChild className="text-xl text-foreground">
      <Link
        to={path}
        onClick={close}
        className={cn("text-2xl font-semibold", isActive && "font-bold")}
      >
        <span className={cn(isActive && "text-primary")}>#</span>
        {title}
      </Link>
    </Button>
  );
};

export default MenuDrawerProvider;
