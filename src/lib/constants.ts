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
  "High Alert": "bg-asean-red/10 text-asean-red border-asean-red/30",
  "Medium Risk": "bg-asean-amber/10 text-asean-amber border-asean-amber/30",
  "Rights Verified": "bg-asean-emerald/10 text-asean-emerald border-asean-emerald/30",
};

/** Map threat level → accent color string. */
export const THREAT_ACCENT_COLORS: Record<ThreatLevel, string> = {
  "High Alert": "text-asean-red",
  "Medium Risk": "text-asean-amber",
  "Rights Verified": "text-asean-emerald",
};

/** Map threat level → container border class. */
export const THREAT_BADGE_CONTAINER_CLASSES: Record<ThreatLevel, string> = {
  "High Alert": "border-asean-red/30 bg-asean-red/5",
  "Medium Risk": "border-asean-amber/30 bg-asean-amber/5",
  "Rights Verified": "border-asean-emerald/30 bg-asean-emerald/5",
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

import { BookOpen, Activity, Map, Database, Send, BarChart3, Cpu, Lock, Calendar, FileKey, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  iconColor: string;
}

export interface NavGroup {
  href: string;               // fallback / landing page for the group
  label: string;
  icon: LucideIcon;
  iconColor: string;
  children: NavLink[];
}

export const D2D_SUBMENU: NavLink[] = [
  { href: "/d2d/benchmark", label: "Benchmark Heatmap", icon: BarChart3, iconColor: "text-asean-blue" },
  { href: "/d2d/tech-sovereignty", label: "Tech Sovereignty Radar", icon: Cpu, iconColor: "text-asean-amber" },
  { href: "/d2d/encryption", label: "Encryption Observatory", icon: Lock, iconColor: "text-asean-red" },
  { href: "/d2d/consumer-protection", label: "Consumer Protections", icon: ShieldCheck, iconColor: "text-asean-emerald" },
  { href: "/d2d/negotiations", label: "Trade Negotiations", icon: Calendar, iconColor: "text-asean-sky" },
  { href: "/d2d/ip-monitor", label: "IP & Trade Secrets", icon: FileKey, iconColor: "text-asean-sky" },
];

export const NAV_GROUPS: (NavLink | NavGroup)[] = [
  { href: "/investigations", label: "Investigations", icon: BookOpen, iconColor: "text-asean-yellow" },
  { href: "/d2d/benchmark", label: "Digital 2 Dozen", icon: BarChart3, iconColor: "text-asean-blue", children: D2D_SUBMENU },
  { href: "/defa", label: "DEFA Tracker", icon: Activity, iconColor: "text-asean-amber" },
  { href: "/observatory", label: "Observatory & Threats", icon: Map, iconColor: "text-asean-blue" },
  { href: "/ledger", label: "Ledger", icon: Database, iconColor: "text-asean-blue" },
  { href: "/intake", label: "Submit Dossier", icon: Send, iconColor: "text-slate-500 dark:text-slate-400" },
];

/** Flat list for mobile drawer — all top-level links + sub-items. */
export const NAV_LINKS: NavLink[] = [
  { href: "/investigations", label: "Investigations", icon: BookOpen, iconColor: "text-asean-yellow" },
  ...D2D_SUBMENU,
  { href: "/defa", label: "DEFA Tracker", icon: Activity, iconColor: "text-asean-amber" },
  { href: "/observatory", label: "Observatory & Threats", icon: Map, iconColor: "text-asean-blue" },
  { href: "/ledger", label: "Ledger", icon: Database, iconColor: "text-asean-blue" },
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

// ── Extended Categories (Digital 2 Dozen expansion) ────────────────────────

export const EXTENDED_CATEGORIES = [
  ...POLICY_CATEGORIES,
  "Technology Sovereignty",
  "Consumer Protection",
  "IP & Standards",
  "Infrastructure & Access",
  "Encryption & Authentication",
  "Competition & SOEs",
] as const;

type ExtendedCategory = (typeof EXTENDED_CATEGORIES)[number];

// ── Digital 2 Dozen: 5 Thematic Clusters ──────────────────────────────────

export const BENCHMARK_CLUSTERS = [
  { id: "infrastructure", label: "Infrastructure & Access", principles: [1, 11, 17, 18], color: "asean-red" },
  { id: "data_governance", label: "Data Governance & Flows", principles: [2, 3, 4, 5, 13, 14], color: "asean-blue" },
  { id: "tech_sovereignty", label: "Technology Sovereignty", principles: [6, 7, 8, 9, 12], color: "asean-amber" },
  { id: "consumer_trust", label: "Consumer Trust & Security", principles: [10, 15, 19, 20], color: "asean-emerald" },
  { id: "ip_standards", label: "IP & Standards", principles: [16, 21, 22, 23, 24], color: "asean-sky" },
] as const;
