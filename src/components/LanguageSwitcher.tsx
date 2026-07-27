"use client";

import React, { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

export interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", native: "English", flag: "🌐" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "fil", name: "Filipino", native: "Wikang Tagalog", flag: "🇵🇭" },
  { code: "th", name: "Thai", native: "ภาษาไทย", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "km", name: "Khmer", native: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "my", name: "Burmese", native: "မြန်မာစာ", flag: "🇲🇲" },
  { code: "lo", name: "Lao", native: "ພາສາລາວ", flag: "🇱🇦" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇹🇱" },
  { code: "tet", name: "Tetum", native: "Lian Tetun", flag: "🇹🇱" },
  { code: "zh-tw", name: "Chinese (Trad)", native: "繁體中文", flag: "🇹🇼" },
  { code: "zh-cn", name: "Chinese (Simp)", native: "简体中文", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/60 hover:border-cyan-500/50 text-slate-200 text-xs font-medium transition-all"
        aria-label="Select Regional Language"
      >
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline-block font-semibold">{selectedLang.native}</span>
        <span className="sm:hidden uppercase">{selectedLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-1.5 backdrop-blur-xl">
            <div className="px-2 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-500 border-b border-slate-800 mb-1">
              Select Regional Language (13 Languages)
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                id={`lang-select-${lang.code}`}
                onClick={() => {
                  setSelectedLang(lang);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  selectedLang.code === lang.code
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.native}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({lang.name})</span>
                </span>
                {selectedLang.code === lang.code && <Check className="w-3.5 h-3.5 text-cyan-400" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
