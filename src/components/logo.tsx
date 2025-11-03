import { Link } from "@tanstack/react-router";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { useHydratedTheme } from "@/hooks/use-hydrated-theme";

const Logo = ({ className }: { className?: ClassNameValue }) => {
  const { theme, hydrated } = useHydratedTheme();
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center justify-center",
        "gap-4 text-foreground",
        className,
      )}
    >
      {hydrated && (
        <img
          src={theme === "dark" ? "/logo.png" : "/logo_light.png"}
          alt="logo"
          className="text-foreground w-6 h-6 md:w-8 md:h-8"
        />
      )}
      {/* <LogoSvg /> */}
      <span className="text-foreground text-lg md:text-xl font-semibold">
        supersheykh
      </span>
    </Link>
  );
};

export default Logo;
