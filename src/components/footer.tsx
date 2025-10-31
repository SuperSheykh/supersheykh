import Logo from "./logo";
import Gutter from "./gutter";
import { Button } from "./ui/button";
import { QUICK_LINKS } from "@/lib/constants";
import { useTrans } from "@/hooks/use-trans";
import QuickLinks from "./quick-links";
import ThemeSwitcher from "./theme-switcher";
import LocalSwitcher from "./local-switcher";

const Footer = () => {
  const t = useTrans();
  return (
    <div className="mt-auto bg-card text-card-foreground border-t-1 border-border ">
      <Gutter className="pt-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2 md:w-1/2">
            <Logo className="text-base flex flex-col gap-2 md:text-base md:flex-row" />
            <p className="text-sm">Fullstack Web Developer</p>
          </div>
          <div className="flex flex-col gap-4 md:w-1/2">
            <div className="mt-4 flex justify-center gap-4  md:justify-end ">
              {QUICK_LINKS.map(({ name, url, icon: Icon }) => (
                <Button key={name} asChild size="icon" variant="outline">
                  <a href={url} className="flex items-center gap-2">
                    <Icon />
                  </a>
                </Button>
              ))}
            </div>
            <div className="p-0 flex items-center justify-center md:justify-end gap-4">
              <ThemeSwitcher />
              <LocalSwitcher />
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-card-foreground py-4 md:flex md:flex-wrap md:justify-between md:items-baseline gap-2 space-y-2 border-t border-t-accent">
          <QuickLinks />
          <p className="inline-block md:ml-auto">
            © 2025 SuperSheykh -{" "}
            <span>{t("All rights reserved", "Tous droits réservés")}</span>
          </p>
        </div>
      </Gutter>
    </div>
  );
};

export default Footer;
