"use client";

import React, { useState } from "react";

interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "EN", flag: "🌐" },
  { code: "id", name: "Indonesian", native: "ID", flag: "🇮🇩" },
];

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState<string>("en");

  return (
    <div className="flex items-center bg-slate-200/80 dark:bg-slate-900/90 p-1 rounded-lg border border-slate-300 dark:border-slate-800 text-xs font-sans">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          id={`lang-select-${lang.code}`}
          onClick={() => setSelectedLang(lang.code)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-sans font-semibold transition-all ${
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
