import Logo from "./logo";
import Gutter from "./gutter";
import { Button } from "./ui/button";
import { QUICK_LINKS } from "@/lib/constants";
import { useTrans } from "@/hooks/use-trans";
import QuickLinks from "./quick-links";


const Footer = () => {
  const t = useTrans()
  return (
    <div className="mt-auto bg-card text-card-foreground border-t-1 border-border ">
      <Gutter className="pt-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2 md:w-1/2">
            <Logo className="text-base flex flex-col gap-2 md:text-base md:flex-row" />
            <p className="text-sm">Fullstack Web Developer</p>
          </div>
          <div className="mt-4 flex justify-center gap-4 md:w-1/2 md:self-center md:justify-end">
            {QUICK_LINKS.map(({ name, url, icon: Icon }) => (
              <Button key={name} asChild size="icon" variant="outline">
                <a href={url} className="flex items-center gap-2">
                  <Icon />
                </a>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row text-center text-wrap text-xs text-card-foreground py-4">
          <QuickLinks />
          <p>© 2025 SuperSheykh - <span>
            {t("All rights reserved", "Tous droits réservés")}
          </span></p>
        </div>
      </Gutter>
    </div>
  );
};

export default Footer;
