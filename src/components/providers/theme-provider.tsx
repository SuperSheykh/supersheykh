import { useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useTheme();

  // On initial mount, this effect reads the theme from localStorage
  // and updates the theme state. It runs only once.
  useEffect(() => {
    const storedTheme = localStorage.getItem("supersheykh-ui-theme");
    if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
      setTheme(storedTheme as "light" | "dark" | "system");
    }
  }, [setTheme]);

  // This effect reacts to changes in the theme state and applies the correct
  // class to the HTML root element. It also persists the new theme choice
  // back to localStorage.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Persist the user's explicit theme choice to localStorage.
    localStorage.setItem("supersheykh-ui-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
