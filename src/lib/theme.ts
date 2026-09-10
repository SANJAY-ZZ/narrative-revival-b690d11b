import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const KEY = "orvnt-theme";

/** Shared ORVNT theme state: persisted, system-aware on first visit. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let next: Theme = "dark";
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "light" || stored === "dark") next = stored;
      else if (window.matchMedia("(prefers-color-scheme: light)").matches) next = "light";
    } catch {
      /* storage unavailable */
    }
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  }, []);

  const apply = useCallback((next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const toggle = useCallback(
    () => apply(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"),
    [apply],
  );

  return { theme, setTheme: apply, toggle };
}
