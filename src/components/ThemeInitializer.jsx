"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/hooks/useThemeStore";

const ThemeInitializer = () => {
  const init = useThemeStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
};

export default ThemeInitializer;
