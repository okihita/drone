"use client";

import React from "react";
import { useLanguage, type SupportedLanguage } from "@/lib/i18n";

interface Language {
  code: SupportedLanguage;
  name: string;
  native: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "EN", flag: "🌐" },
  { code: "id", name: "Indonesian", native: "ID", flag: "🇮🇩" },
];

export default function LanguageSwitcher() {
  const { lang: selectedLang, setLang } = useLanguage();

  return (
    <div className="flex items-center bg-slate-200/80 dark:bg-slate-900/90 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-sm font-sans">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          id={`lang-select-${lang.code}`}
          onClick={() => setLang(lang.code)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-sans font-semibold transition-all ${
            selectedLang === lang.code
              ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
          aria-label={`Switch to ${lang.name}`}
        >
          <span>{lang.flag}</span>
          <span>{lang.native}</span>
        </button>
      ))}
    </div>
  );
}
