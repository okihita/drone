import { ASEAN_COLORS } from "./colors";

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
export const THREAT_BADGE_CLASSES: Record<ThreatLevel, string> = {
  "High Alert": "bg-red-500/10 text-red-600 border-red-500/30",
  "Medium Risk": "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  "Rights Verified": "bg-blue-500/10 text-blue-600 border-blue-500/30",
};

/** Map threat level → accent color string. */
export const THREAT_ACCENT_COLORS: Record<ThreatLevel, string> = {
  "High Alert": "text-red-600 dark:text-red-400",
  "Medium Risk": "text-yellow-600 dark:text-yellow-400",
  "Rights Verified": "text-blue-600 dark:text-blue-400",
};

/** Map threat level → container border class. */
export const THREAT_BADGE_CONTAINER_CLASSES: Record<ThreatLevel, string> = {
  "High Alert": "border-red-500/30 bg-red-500/5",
  "Medium Risk": "border-yellow-500/30 bg-yellow-500/5",
  "Rights Verified": "border-blue-500/30 bg-blue-500/5",
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
    fill: ASEAN_COLORS.yellow,
    stroke: ASEAN_COLORS.yellowDark,
    glow: "rgba(255, 204, 0, 0.25)",
  },
  Hybrid: {
    fill: ASEAN_COLORS.blue,
    stroke: ASEAN_COLORS.blueDark,
    glow: "rgba(0, 51, 153, 0.25)",
  },
  "Strict Localization": {
    fill: ASEAN_COLORS.red,
    stroke: ASEAN_COLORS.redDark,
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
