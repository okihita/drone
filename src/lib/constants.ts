import { ASEAN_COLORS } from "./colors";
import { BookOpen, Link2, Activity, Map, Database, Send, BarChart3, Cpu, Lock, Calendar, FileKey, ShieldCheck, FileText, Globe, CreditCard, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Policy Categories (single source of truth) ──────────────────────────────

export const POLICY_CATEGORIES = [
  "DEFA",
  "Cross-Border Data",
  "AI Governance",
  "Cybersecurity",
  "Pax Silica & Compute",
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

export const GOVERNANCE_SUBMENU: NavLink[] = [
  { href: "/governance/ai-ethics", label: "AI Ethics & Accountability", icon: Cpu, iconColor: "text-asean-emerald" },
  { href: "/governance/data-flows", label: "Cross-Border Data Flows", icon: Globe, iconColor: "text-asean-blue" },
  { href: "/governance/encryption", label: "Encryption & Privacy", icon: Lock, iconColor: "text-asean-red" },
  { href: "/governance/tech-sovereignty", label: "Tech Sovereignty & Compute", icon: Cpu, iconColor: "text-asean-amber" },
];

export const TRADE_SUBMENU: NavLink[] = [
  { href: "/trade/defa", label: "ASEAN DEFA Tracker", icon: FileText, iconColor: "text-asean-yellow" },
  { href: "/trade/negotiations", label: "Trade Deals & Treaties", icon: Calendar, iconColor: "text-asean-sky" },
  { href: "/trade/ip-monitor", label: "IP & Trade Secrets", icon: FileKey, iconColor: "text-asean-sky" },
  { href: "/trade/payments-cyber", label: "Payments & Cyber Clauses", icon: CreditCard, iconColor: "text-asean-amber" },
];

export const ACCOUNTABILITY_SUBMENU: NavLink[] = [
  { href: "/accountability/benchmark", label: "Platform AI & Rights Benchmark", icon: BarChart3, iconColor: "text-asean-blue" },
  { href: "/accountability/consumer-protection", label: "Consumer Redress & Deceptive AI", icon: ShieldCheck, iconColor: "text-asean-emerald" },
  { href: "/accountability/civil-society", label: "Digital Labor & Watchdog", icon: Shield, iconColor: "text-asean-red" },
  { href: "/accountability/investigations", label: "Platform Investigations", icon: BookOpen, iconColor: "text-asean-yellow" },
];

export const OBSERVATORY_SUBMENU: NavLink[] = [
  { href: "/observatory", label: "Regional Map & Threats", icon: Map, iconColor: "text-asean-blue" },
  { href: "/ledger", label: "Policy & Case Ledger", icon: Database, iconColor: "text-asean-amber" },
  { href: "/links", label: "Curated Knowledge Hub", icon: Link2, iconColor: "text-asean-yellow" },
  { href: "/leaks", label: "Leaks (Secure Intake)", icon: Send, iconColor: "text-asean-red" },
];

// Deprecated aliases for backwards compatibility
export const D2D_SUBMENU = ACCOUNTABILITY_SUBMENU;
export const DEFA_SUBMENU = TRADE_SUBMENU;

export const NAV_GROUPS: (NavLink | NavGroup)[] = [
  { href: "/governance", label: "Data & AI Governance", icon: Cpu, iconColor: "text-asean-emerald", children: GOVERNANCE_SUBMENU },
  { href: "/trade", label: "Digital Trade Agreements", icon: Activity, iconColor: "text-asean-yellow", children: TRADE_SUBMENU },
  { href: "/accountability", label: "Platform Accountability", icon: ShieldCheck, iconColor: "text-asean-blue", children: ACCOUNTABILITY_SUBMENU },
  { href: "/observatory", label: "Observatory", icon: Map, iconColor: "text-asean-amber", children: OBSERVATORY_SUBMENU },
];

/** Flat list for mobile drawer — all top-level links + sub-items. */
export const NAV_LINKS: NavLink[] = [
  { href: "/governance", label: "Data & AI Governance", icon: Cpu, iconColor: "text-asean-emerald" },
  ...GOVERNANCE_SUBMENU,
  { href: "/trade", label: "Digital Trade Agreements", icon: Activity, iconColor: "text-asean-yellow" },
  ...TRADE_SUBMENU,
  { href: "/accountability", label: "Platform Accountability", icon: ShieldCheck, iconColor: "text-asean-blue" },
  ...ACCOUNTABILITY_SUBMENU,
  { href: "/observatory", label: "Observatory", icon: Map, iconColor: "text-asean-amber" },
  ...OBSERVATORY_SUBMENU,
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
  "PAX SILICA & COMPUTE",
  "Pax Silica & Compute",
] as const;

// ── Digital 2 Dozen: 5 Thematic Clusters ──────────────────────────────────

export const BENCHMARK_CLUSTERS = [
  { id: "infrastructure", label: "Infrastructure & Access", principles: [1, 11, 17, 18], color: "asean-red" },
  { id: "data_governance", label: "Data Governance & Flows", principles: [2, 3, 4, 5, 13, 14], color: "asean-blue" },
  { id: "tech_sovereignty", label: "Technology Sovereignty", principles: [6, 7, 8, 9, 12], color: "asean-amber" },
  { id: "consumer_trust", label: "Consumer Trust & Security", principles: [10, 15, 19, 20], color: "asean-emerald" },
  { id: "ip_standards", label: "IP & Standards", principles: [16, 21, 22, 23, 24], color: "asean-sky" },
] as const;
