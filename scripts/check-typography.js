/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Strict Typography & Text Size Guardrail Linter Script
 * 
 * Enforces strict readability & accessibility rule:
 * - NO `text-xs`, `text-[...px]`, or sub-small font size utilities that degrade legibility.
 * - Forbidden: text-xs, text-[9px], text-[10px], text-[11px], text-[12px], etc.
 * - Allowed: text-sm, text-base, text-lg, text-xl, etc.
 */

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.join(__dirname, "../src");
const ALLOWED_FILES = [
  path.join(SRC_DIR, "app/globals.css"),
];

// Regex matching text-xs or custom sub-14px font sizes
const FORBIDDEN_TEXT_SIZE_REGEX = /\btext-(?:xs|\[\s*(?:[0-9]|1[0-3])(?:\.[0-9]+)?px\s*\])/g;

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
      checkFileForTextSizeViolations(fullPath);
    }
  }
}

function checkFileForTextSizeViolations(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    if (line.includes("// eslint-disable") || line.includes("/* eslint-disable")) {
      return;
    }

    const matches = line.match(FORBIDDEN_TEXT_SIZE_REGEX);
    if (matches) {
      const relativePath = path.relative(path.join(__dirname, ".."), filePath);
      console.error(
        `❌ [Typography Guardrail Error] ${relativePath}:${index + 1}: Forbidden small text size ${matches.join(", ")} found!`
      );
      console.error(`   Line content: ${line.trim()}`);
      console.error(`   👉 Minimum allowed size is text-sm (14px). Please upgrade to text-sm or larger for optimal legibility!\n`);
      violationsCount++;
    }
  });
}

console.log("🔍 Scanning D.R.O.N.E. codebase for forbidden text-xs and sub-14px font sizes...");
scanDirectory(SRC_DIR);

if (violationsCount > 0) {
  console.error(`\n❌ Failed: Found ${violationsCount} text size violation(s) in src/.`);
  process.exit(1);
} else {
  console.log("✅ Success: All typography complies with minimum text-sm (14px) legibility standards!");
  process.exit(0);
}
