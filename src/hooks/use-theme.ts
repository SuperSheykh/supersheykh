import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme: Theme) => set(() => ({ theme })),
    }),
    {
      name: "theme",
    },
  ),
);
