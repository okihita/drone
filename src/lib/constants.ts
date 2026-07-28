// ── Policy Categories (single source of truth) ──────────────────────────────

export const POLICY_CATEGORIES = [
  "DEFA",
  "Cross-Border Data",
  "AI Governance",
  "Cybersecurity",
] as const;

// ── Threat Levels ────────────────────────────────────────────────────────────

export const THREAT_LEVELS = [
  "High Alert",
  "Medium Risk",
  "Rights Verified",
] as const;

export type ThreatLevel = (typeof THREAT_LEVELS)[number];

/** Map threat level → Tailwind badge classes (use this instead of if/else chains). */
export const THREAT_BADGE_CLASSES: Record<string, string> = {
  "High Alert":
    "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
  "Medium Risk":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400",
  "Rights Verified":
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
};

/** Map threat level → accent text color. */
export const THREAT_ACCENT_COLORS: Record<string, string> = {
  "High Alert": "text-asean-red",
  "Medium Risk": "text-asean-yellow",
  "Rights Verified": "text-asean-blue",
};

/** Map threat level → badge container classes (bg + border) for PolicyLedgerTable. */
export const THREAT_BADGE_CONTAINER_CLASSES: Record<string, string> = {
  "High Alert": "bg-red-100/50 dark:bg-red-950/50 border-red-300 dark:border-red-800",
  "Medium Risk": "bg-yellow-100/50 dark:bg-yellow-950/50 border-yellow-300 dark:border-yellow-800",
  "Rights Verified": "bg-blue-100/50 dark:bg-blue-950/50 border-blue-300 dark:border-blue-800",
};

// ── Regime Types ─────────────────────────────────────────────────────────────

export const REGIME_TYPES = [
  "Open Transfer",
  "Hybrid",
  "Strict Localization",
] as const;

/** Regime → fill color map used by AseanMap. */
export const REGIME_FILL_COLORS: Record<string, { fill: string; stroke: string; glow: string }> = {
  "Open Transfer": {
    fill: "#FFCC00",
    stroke: "#cca300",
    glow: "rgba(255, 204, 0, 0.25)",
  },
  Hybrid: {
    fill: "#003399",
    stroke: "#002266",
    glow: "rgba(0, 51, 153, 0.25)",
  },
  "Strict Localization": {
    fill: "#CC0000",
    stroke: "#990000",
    glow: "rgba(204, 0, 0, 0.25)",
  },
};

// ── Map Filter Labels ────────────────────────────────────────────────────────

export const MAP_FILTER_MODES = ["ALL", "OPEN", "HYBRID", "STRICT"] as const;
export type MapFilterMode = (typeof MAP_FILTER_MODES)[number];

// ── Header Navigation Links ──────────────────────────────────────────────────

import { BookOpen, Map, Database, ShieldAlert, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/investigations", label: "Investigations", icon: BookOpen, iconColor: "text-asean-yellow" },
  { href: "/observatory", label: "Cartographic Observatory", icon: Map, iconColor: "text-asean-blue" },
  { href: "/ledger", label: "Policy Ledger", icon: Database, iconColor: "text-asean-blue" },
  { href: "/threats", label: "Threat Matrix", icon: ShieldAlert, iconColor: "text-asean-red" },
  { href: "/intake", label: "Submit Dossier", icon: Send, iconColor: "text-slate-500 dark:text-slate-400" },
];

// ── News Categories (broader set than policy categories, used by admin) ──────

export const NEWS_CATEGORIES = [
  "DEFA",
  "Cross-Border Data",
  "AI Governance",
  "Cybersecurity",
  "DATA LOCALIZATION",
  "DEFA SPECIAL REPORT",
  "AI GOVERNANCE",
] as const;
