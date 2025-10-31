import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateSwitchState = () => {
      if (theme === "system") {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      } else {
        setIsDark(theme === "dark");
      }
    };

    updateSwitchState();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateSwitchState);
      return () => {
        mediaQuery.removeEventListener("change", updateSwitchState);
      };
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      size="sm"
      variant="ghost"
      className={cn(
        `relative inline-flex w-16 flex-shrink-0 cursor-pointer p-0 transition-colors duration-200 ease-in-out`,
        isDark ? "bg-accent" : "bg-input",
      )}
      role="switch"
      aria-checked={isDark}
    >
      <span
        aria-hidden="true"
        className={`${isDark ? "left-8" : "left-0"}
          absolute pointer-events-none h-8 w-8 transform rounded-none bg-background shadow-lg ring-0 transition-all duration-200 ease-in-out`}
      >
        <span
          className={`${
            isDark
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in"
          }
            absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <Sun className="h-5 w-5 text-foreground" />
        </span>
        <span
          className={`${
            isDark
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out"
          }
            absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
          aria-hidden="true"
        >
          <Moon className="h-5 w-5 text-foreground" />
        </span>
      </span>
    </Button>
  );
};

export default ThemeSwitcher;
