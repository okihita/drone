"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export type ThemeMode = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("drone-theme") as ThemeMode) || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else if (mode === "light") {
      root.classList.remove("dark");
    } else {
      // System default
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  };

  const handleThemeChange = (newMode: ThemeMode) => {
    setTheme(newMode);
    localStorage.setItem("drone-theme", newMode);
    applyTheme(newMode);
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900" />
    );
  }

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs">
      <button
        onClick={() => handleThemeChange("light")}
        title="Light Mode"
        className={`p-1.5 rounded transition-colors ${
          theme === "light"
            ? "bg-white text-amber-600 shadow-sm font-bold"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleThemeChange("dark")}
        title="Dark Mode"
        className={`p-1.5 rounded transition-colors ${
          theme === "dark"
            ? "bg-slate-800 text-amber-400 shadow-sm font-bold"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={() => handleThemeChange("system")}
        title="Follow System Preference"
        className={`p-1.5 rounded transition-colors ${
          theme === "system"
            ? "bg-slate-300 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
