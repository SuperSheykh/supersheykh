import Logo from "./logo";
import Gutter from "./gutter";
import { GithubIcon, InstagramIcon, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

const QUICK_LINKS: { name: string; url: string; icon: LucideIcon }[] = [
  {
    name: "Github",
    url: "https://github.com/supersheykh",
    icon: GithubIcon,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/sekousidibe/",
    icon: InstagramIcon,
  },
  {
    name: "Mail",
    url: "mailto:bahsekousidi@gmail.com",
    icon: Mail,
  },
];

const Footer = () => {
  return (
    <div className="mt-auto bg-card text-card-foreground border-t-1 border-border ">
      <Gutter className="pt-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2 md:w-1/2">
            <Logo className="text-base md:text-base" />
            <p className="text-sm">Fullstack Web Developer</p>
            <p className="text-sm">Kati-coro, Cercle de Kati</p>
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
        <div className="mt-8 text-center text-wrap text-xs text-card-foreground py-4">
          <p>© 2025 SuperSheykh - All rights reserved</p>
        </div>
      </Gutter>
    </div>
  );
};

export default Footer;
