/**
 * Color Guardrail Linter Script
 * Enforces rule: NO hardcoded hex color codes outside src/lib/colors.ts and src/app/globals.css.
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "../src");
const ALLOWED_FILES = [
  path.join(SRC_DIR, "lib/colors.ts"),
  path.join(SRC_DIR, "app/globals.css"),
];

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;

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
      checkFileForHardcodedColors(fullPath);
    }
  }
}

function checkFileForHardcodedColors(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    // Ignore inline SVG path commands or data URI strings
    if (line.includes("path") || line.includes("viewBox") || line.includes("// eslint-disable")) {
      return;
    }

    const matches = line.match(HEX_COLOR_REGEX);
    if (matches) {
      // Allow standard black/white (#fff, #ffffff, #000, #000000) or SVG path tokens if any
      const suspiciousColors = matches.filter(
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
  });
}

console.log("🔍 Scanning D.R.O.N.E. codebase for hardcoded hex color violations...");
scanDirectory(SRC_DIR);

if (violationsCount > 0) {
  console.error(`\n❌ Failed: Found ${violationsCount} hardcoded color violation(s) in src/.`);
  process.exit(1);
} else {
  console.log("✅ Success: All branding colors strictly comply with src/lib/colors.ts and ASEAN logo rules!");
  process.exit(0);
}
