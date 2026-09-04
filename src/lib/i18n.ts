"use client";

import { useSyncExternalStore, useCallback } from "react";

export type SupportedLanguage = "en" | "id";

export const LANGUAGE_STORAGE_KEY = "drone_language_pref";

const TRANSLATIONS_ID: Record<string, string> = {
  // Top-level Navigation Pillars
  "Data & AI Governance": "Tata Kelola Data & AI",
  "Digital Trade Agreements": "Perjanjian Perdagangan Digital",
  "Platform Accountability": "Akuntabilitas Platform",
  "Observatory": "Observatorium",

  // Governance Submenu
  "AI Ethics & Guidelines": "Etika & Pedoman AI",
  "Cross-Border Data Flows": "Arus Data Lintas Batas",
  "Encryption & Privacy": "Enkripsi & Privasi",
  "Pax Silica & Tech Sovereignty": "Pax Silica & Kedaulatan Teknologi",

  // Trade Submenu
  "ASEAN DEFA Tracker": "Pelacak DEFA ASEAN",
  "Trade Deals & Treaties": "Perjanjian Dagang Regional",
  "IP & Trade Secrets": "Kekayaan Intelektual & Rahasia Dagang",
  "Payments & Cyber Clauses": "Pembayaran & Klausul Siber",

  // Accountability Submenu
  "Platform AI & Rights Benchmark": "Tolok Ukur Hak & AI Platform",
  "Consumer Redress & Deceptive AI": "Pemulihan Konsumen & AI Manipulatif",
  "Digital Labor & Watchdog": "Pekerja Digital & Pengawas",
  "Platform Investigations": "Investigasi Platform",

  // Observatory Submenu
  "Regional Map & Threats": "Peta Regional & Ancaman",
  "Policy & Case Ledger": "Buku Besar Regulasi & Kasus",
  "Curated Knowledge Hub": "Pusat Pengetahuan Terkurasi",
  "Leaks (Secure Intake)": "Kanal Bocoran Terenkripsi",

  // Common UI Strings
  "Search 100+ Acts": "Cari 100+ Regulasi",
  "Launch Observatory": "Buka Observatorium",
  "Independent Civil Society Observatory": "Observatorium Independen Masyarakat Sipil",
  "Engineered for Regional Digital Defense": "Dirancang untuk Pertahanan Hak Digital Regional",
};

export function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    // LocalStorage unavailable
  }
  return "en";
}

export function setLanguagePreference(lang: SupportedLanguage): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(
      new CustomEvent("drone:lang-change", { detail: { lang } })
    );
  } catch {
    // Ignore storage write failure
  }
}

export function translate(text: string, lang: SupportedLanguage): string {
  if (lang === "id" && TRANSLATIONS_ID[text]) {
    return TRANSLATIONS_ID[text];
  }
  return text;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("drone:lang-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("drone:lang-change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): SupportedLanguage {
  return getInitialLanguage();
}

function getServerSnapshot(): SupportedLanguage {
  return "en";
}

export function useLanguage(): {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  t: (text: string) => string;
} {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: SupportedLanguage) => {
    setLanguagePreference(next);
  }, []);

  const t = useCallback(
    (text: string) => translate(text, lang),
    [lang]
  );

  return { lang, setLang, t };
}
