"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { theme: string; setTheme: (t: string) => void };
const ThemeCtx = createContext<Ctx>({ theme: "editorial", setTheme: () => {} });

export const useTheme = () => useContext(ThemeCtx);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState("editorial");

  useEffect(() => {
    const saved = localStorage.getItem("vm-theme");
    if (saved) setThemeState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("vm-theme", theme);
  }, [theme]);

  const setTheme = (t: string) => setThemeState(t);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}
