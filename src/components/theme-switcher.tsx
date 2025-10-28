import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon } from "lucide-react";
import { useCallback, useMemo } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    // Simple toggle between dark and light
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const Icon = useMemo(() => {
    return theme === 'dark' ? Sun : Moon
  }, [theme])

  return (
    <Button
      size="icon"
      variant='ghost'
      onClick={toggleTheme}
      className="cursor-pointer"
    >
      <Icon />
    </Button>
  );
};

export default ThemeSwitcher;

