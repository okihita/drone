"use client";

import React, { useSyncExternalStore, useCallback } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

// ── Module-level store for theme persistence ──────────────────────────────────

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);

  // System theme change listener
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    const stored = localStorage.getItem("drone-theme") as ThemeMode | null;
    if (!stored || stored === "system") callback();
  };
  mediaQuery.addEventListener("change", onSystemChange);

  // Cross-tab sync
  const onStorage = (e: StorageEvent) => {
    if (e.key === "drone-theme") callback();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(callback);
    mediaQuery.removeEventListener("change", onSystemChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("drone-theme") as ThemeMode) || "system";
}

function getServerSnapshot(): ThemeMode {
  return "light";
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

function applyThemeClass(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else if (mode === "light") {
    root.classList.remove("dark");
  } else {
    root.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleThemeChange = useCallback((mode: ThemeMode) => {
    localStorage.setItem("drone-theme", mode);
    applyThemeClass(mode);
    notifyListeners();
  }, []);

  return (
    <div className="flex items-center bg-slate-200/80 dark:bg-slate-900/90 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-sm font-sans">
      <button
        onClick={() => handleThemeChange("light")}
        className={`p-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
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
        className={`p-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
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
        className={`p-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
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
