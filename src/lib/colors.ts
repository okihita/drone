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

  red: "#CC0000",
  redLight: "#e62e2e",
  redDark: "#990000",

  yellow: "#FFCC00",
  yellowLight: "#ffd633",
  yellowDark: "#cc00",

  white: "#FFFFFF",

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

export type AseanColorKey = keyof typeof ASEAN_COLORS;
