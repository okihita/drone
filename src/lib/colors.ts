/**
 * Official ASEAN Logo Color Palette & D.R.O.N.E. Design System Tokens
 * 
 * Official ASEAN Colors:
 * - ASEAN Blue (Peace & Stability): #003399
 * - ASEAN Red (Courage & Dynamism): #CC0000
 * - ASEAN Yellow / Gold (Prosperity & Padi Emblem): #FFCC00
 * - ASEAN White (Purity): #FFFFFF
 */

export const ASEAN_COLORS = {
  // Primary ASEAN Logo Colors
  blue: "#003399",
  blueLight: "#1a52c5",
  blueDark: "#002266",
  blueSubtle: "rgba(0, 51, 153, 0.15)",

  red: "#CC0000",
  redLight: "#e62e2e",
  redDark: "#990000",
  redSubtle: "rgba(204, 0, 0, 0.15)",

  yellow: "#FFCC00",
  yellowLight: "#ffd633",
  yellowDark: "#cca300",
  yellowSubtle: "rgba(255, 204, 0, 0.15)",

  white: "#FFFFFF",

  // Extended ASEAN Semantic Status Tokens
  emerald: "#10B981",
  emeraldLight: "#34D399",
  emeraldDark: "#059669",
  emeraldSubtle: "rgba(16, 185, 129, 0.15)",

  amber: "#F59E0B",
  amberLight: "#FBBF24",
  amberDark: "#D97706",
  amberSubtle: "rgba(245, 158, 11, 0.15)",

  sky: "#0EA5E9",
  skyLight: "#38BDF8",
  skyDark: "#0284C7",
  skySubtle: "rgba(14, 165, 233, 0.15)",

  // Neutral Editorial Slate Backgrounds & Borders
  bgLight: "#f8fafc",
  cardLight: "#ffffff",
  borderLight: "#e2e8f0",
  textPrimaryLight: "#0f172a",
  textMutedLight: "#64748b",

  bgDark: "#0b0f17",
  cardDark: "#0e1420",
  borderDark: "#1e293b",
  textPrimaryDark: "#f8fafc",
  textMutedDark: "#94a3b8",
} as const;

/**
 * Semantic status tone shared by all observatory widgets.
 * "positive" is always the ASEAN emerald, "warning" the amber, "danger" the red.
 */
export type StatusTone = "positive" | "warning" | "danger";

/** Higher-is-better scoring (compliance indexes): >= good → positive, >= bad → warning, else danger. */
export function scoreTone(score: number, good: number, bad: number): StatusTone {
  if (score >= good) return "positive";
  if (score >= bad) return "warning";
  return "danger";
}

/** Higher-is-worse risk scoring (severity, friction, surveillance): <= good → positive, <= bad → warning, else danger. */
export function riskTone(score: number, good: number, bad: number): StatusTone {
  if (score <= good) return "positive";
  if (score <= bad) return "warning";
  return "danger";
}

export function toneHex(tone: StatusTone): string {
  switch (tone) {
    case "positive":
      return ASEAN_COLORS.emerald;
    case "warning":
      return ASEAN_COLORS.amber;
    case "danger":
      return ASEAN_COLORS.red;
  }
}

export function toneTextClass(tone: StatusTone): string {
  switch (tone) {
    case "positive":
      return "text-status-positive";
    case "warning":
      return "text-status-warning";
    case "danger":
      return "text-status-danger";
  }
}

export function toneBarClass(tone: StatusTone): string {
  switch (tone) {
    case "positive":
      return "bg-status-positive";
    case "warning":
      return "bg-status-warning";
    case "danger":
      return "bg-status-danger";
  }
}

/** Six-band compliance cell classes used by the Digital 2 Dozen heatmap. */
export function heatmapCellClass(score: number): string {
  if (score >= 80) return "bg-asean-emerald";
  if (score >= 65) return "bg-asean-emerald/80";
  if (score >= 50) return "bg-asean-amber";
  if (score >= 35) return "bg-asean-amber/80";
  if (score >= 20) return "bg-asean-red/80";
  return "bg-asean-red";
}

/** Six-band hex fills for the SVG geographic overview map. */
export function heatmapHex(score: number): string {
  if (score >= 80) return ASEAN_COLORS.emerald;
  if (score >= 65) return ASEAN_COLORS.emeraldLight;
  if (score >= 50) return ASEAN_COLORS.yellow;
  if (score >= 35) return ASEAN_COLORS.amber;
  if (score >= 20) return ASEAN_COLORS.red;
  return ASEAN_COLORS.redDark;
}


