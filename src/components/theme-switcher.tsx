import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";
import { useCallback } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toogleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  return (
    <Button size="icon" asChild variant={"ghost"} onClick={toogleTheme}>
      <Toggle>{theme === "dark" ? <Sun /> : <Moon />}</Toggle>
    </Button>
  );
};

export default ThemeSwitcher;
