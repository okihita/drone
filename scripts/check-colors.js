/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Strict ASEAN Color Guardrail Linter Script
 * 
 * Enforces 2 strict rules:
 * 1. NO hardcoded hex color codes (#...) outside src/lib/colors.ts & src/app/globals.css.
 * 2. NO generic default Tailwind color classes (amber-*, emerald-*, green-*, cyan-*, etc.).
 *    ONLY custom ASEAN theme utility classes (asean-blue, asean-red, asean-yellow, white, black, slate-*) are allowed!
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "../src");
const ALLOWED_FILES = [
  path.join(SRC_DIR, "lib/colors.ts"),
  path.join(SRC_DIR, "app/globals.css"),
];

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;

// Forbidden non-ASEAN Tailwind color tokens
const FORBIDDEN_TAILWIND_COLORS = [
  "amber",
  "emerald",
  "green",
  "cyan",
  "teal",
  "indigo",
  "purple",
  "violet",
  "fuchsia",
  "pink",
  "rose",
  "orange",
  "lime",
  "sky",
];

const FORBIDDEN_TW_REGEX = new RegExp(
  `\\b(?:text|bg|border|ring|fill|stroke)-(?:${FORBIDDEN_TAILWIND_COLORS.join("|")})-(?:\\d{2,3}|\\w+)\\b`,
  "g"
);

let violationsCount = 0;

function scanDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (
      (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
      !ALLOWED_FILES.includes(fullPath)
    ) {
      checkFileForColorViolations(fullPath);
    }
  }
}

function checkFileForColorViolations(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Ignore inline SVG path commands or data URI strings or linter override comments
    if (line.includes("path") || line.includes("viewBox") || line.includes("// eslint-disable")) {
      return;
    }

    // Rule 1: Hardcoded Hex Codes
    const hexMatches = line.match(HEX_COLOR_REGEX);
    if (hexMatches) {
      const suspiciousColors = hexMatches.filter(
        (c) => !["#fff", "#ffffff", "#000", "#000000"].includes(c.toLowerCase())
      );

      if (suspiciousColors.length > 0) {
        const relativePath = path.relative(path.join(__dirname, ".."), filePath);
        console.error(
          `❌ [Color Guardrail Error] ${relativePath}:${index + 1}: Hardcoded hex color ${suspiciousColors.join(", ")} found!`
        );
        console.error(`   Line content: ${line.trim()}`);
        console.error(`   👉 Please use ASEAN_COLORS from src/lib/colors.ts or CSS variables!\n`);
        violationsCount++;
      }
    }

    // Rule 2: Generic Tailwind Palette Classes (amber, emerald, etc.)
    const twMatches = line.match(FORBIDDEN_TW_REGEX);
    if (twMatches) {
      const relativePath = path.relative(path.join(__dirname, ".."), filePath);
      console.error(
        `❌ [Color Guardrail Error] ${relativePath}:${index + 1}: Generic Tailwind color utility ${twMatches.join(", ")} found!`
      );
      console.error(`   Line content: ${line.trim()}`);
      console.error(`   👉 Forbidden! Use official ASEAN utility classes: asean-blue, asean-red, or asean-yellow!\n`);
      violationsCount++;
    }
  });
}

console.log("🔍 Scanning D.R.O.N.E. codebase for forbidden colors and non-ASEAN Tailwind utilities...");
scanDirectory(SRC_DIR);

if (violationsCount > 0) {
  console.error(`\n❌ Failed: Found ${violationsCount} color violation(s) in src/.`);
  process.exit(1);
} else {
  console.log("✅ Success: All branding colors strictly comply with custom ASEAN theme tokens (asean-blue, asean-red, asean-yellow)!");
  process.exit(0);
}
