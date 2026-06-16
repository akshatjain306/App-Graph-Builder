import { useEffect } from "react";

import { useUiStore } from "@/stores/ui.store";

export function useThemeSync() {
  const theme = useUiStore(
    (state) => state.theme,
  );

  useEffect(() => {
    const root =
      document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
}
