import { create } from "zustand";

const STORAGE_KEY = "theme";

const getSystemTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (resolved) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

export const useThemeStore = create((set, get) => ({
  // "system" | "light" | "dark"
  theme: "system",
  resolvedTheme: "light",

  init: () => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const theme = stored === "light" || stored === "dark" ? stored : "system";
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    applyTheme(resolvedTheme);
    set({ theme, resolvedTheme });

    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (get().theme !== "system") return;
      const next = getSystemTheme();
      applyTheme(next);
      set({ resolvedTheme: next });
    };
    media.addEventListener("change", onChange);
  },

  setTheme: (theme) => {
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    applyTheme(resolvedTheme);
    if (typeof window !== "undefined") {
      if (theme === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, theme);
      }
    }
    set({ theme, resolvedTheme });
  },
}));
