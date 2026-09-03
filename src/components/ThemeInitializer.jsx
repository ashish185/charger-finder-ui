"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/hooks/useThemeStore";

export default function ThemeInitializer() {
  const init = useThemeStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
}
