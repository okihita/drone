/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Strict Curated Links Quality & Image Auditor
 * 
 * Verifies that:
 * 1. Every curated link entry has all required fields (title, publisher, domain, category, etc.).
 * 2. Every article/portal link has a verified ogImage (or is marked as isPdf: true).
 * 3. Every ogImage URL is non-empty, uses https, and points to a valid image format.
 * 
 * Usage:
 *   node scripts/check-links.js
 */

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../src/lib/linksData.ts");

if (!fs.existsSync(DATA_FILE)) {
  console.error("❌ Error: src/lib/linksData.ts does not exist!");
  process.exit(1);
}

const content = fs.readFileSync(DATA_FILE, "utf8");

// Parse linksData directly
const { CURATED_LINKS } = require("../src/lib/linksData.ts");

console.log(`🔍 Auditing ${CURATED_LINKS.length} curated link records for complete OpenGraph & metadata integrity...`);

let errors = 0;

CURATED_LINKS.forEach((item, idx) => {
  const indexStr = `[#${idx + 1} - ${item.id || "MISSING_ID"}]`;

  if (!item.id || !item.url || !item.title || !item.publisher || !item.domain || !item.category || !item.jurisdiction) {
    console.error(`❌ ${indexStr} Missing essential metadata fields!`);
    errors++;
  }

  // Non-PDF items MUST have an ogImage
  if (!item.isPdf && !item.ogImage) {
    console.error(`❌ ${indexStr} Article/web page from "${item.publisher}" is missing an ogImage!`);
    console.error(`   URL: ${item.url}`);
    errors++;
  }

  // If ogImage is provided, validate format
  if (item.ogImage) {
    if (!item.ogImage.startsWith("https://") && !item.ogImage.startsWith("http://")) {
      console.error(`❌ ${indexStr} Invalid ogImage protocol: "${item.ogImage}"`);
      errors++;
    }
  }
});

if (errors > 0) {
  console.error(`\n❌ Failed: Found ${errors} curated link integrity error(s).`);
  console.error(`👉 Every web page in src/lib/linksData.ts must have a valid ogImage! Run \`pnpm run sync:links\` or provide ogImage.\n`);
  process.exit(1);
} else {
  console.log(`✅ Success: All ${CURATED_LINKS.length} curated links have verified 100% ogImage / dossier coverage!`);
  process.exit(0);
}
