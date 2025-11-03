import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";

export const useHydratedTheme = () => {
  const theme = useTheme((state) => state.theme);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return { theme: hydrated ? theme : "system", hydrated };
};
