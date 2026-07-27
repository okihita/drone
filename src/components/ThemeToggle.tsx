"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("drone-theme") as ThemeMode | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      setTheme("system");
      applyTheme("system");
    }
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else {
      // System mode
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isSystemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setTheme(mode);
    localStorage.setItem("drone-theme", mode);
    applyTheme(mode);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center bg-slate-200/80 dark:bg-slate-900/90 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-xs font-sans">
      <button
        onClick={() => handleThemeChange("light")}
        className={`p-1.5 rounded-md transition-all flex items-center gap-1 ${
          theme === "light"
            ? "bg-white text-asean-yellow shadow-xs font-bold"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
        title="Light Mode"
        aria-label="Light Mode"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleThemeChange("dark")}
        className={`p-1.5 rounded-md transition-all flex items-center gap-1 ${
          theme === "dark"
            ? "bg-slate-800 text-asean-yellow shadow-xs font-bold"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
        title="Dark Mode"
        aria-label="Dark Mode"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleThemeChange("system")}
        className={`p-1.5 rounded-md transition-all flex items-center gap-1 ${
          theme === "system"
            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
        title="Follow System Theme"
        aria-label="Follow System Theme"
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
