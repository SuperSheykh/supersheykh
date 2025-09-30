import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useTheme = create<ThemeStore>((set) => ({
  theme: "system",
  setTheme: (theme: Theme) => set(() => ({ theme })),
}));
