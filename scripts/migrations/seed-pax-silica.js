/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Seed initial Pax Silica records into Airtable CMS.
 * Reads AIRTABLE_PAT and AIRTABLE_BASE_ID from .env.local.
 */
const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const PAT = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!PAT || !BASE_ID) {
  console.error("Missing AIRTABLE_PAT or AIRTABLE_BASE_ID");
  process.exit(1);
}

async function insertRecords(tableName, records) {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ records }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed to insert into ${tableName}: ${res.status} ${text}`);
  } else {
    const data = await res.json();
    console.log(`Successfully inserted ${data.records.length} records into "${tableName}"`);
  }
}

async function main() {
  console.log("Seeding Pax Silica & Compute records into Airtable CMS...");

  // 1. Curated Links
  const linksRecords = [
    {
      fields: {
        "Title": "The Pax Silica Doctrine: Securing the Global AI and Semiconductor Compute Stack",
        "URL": "https://www.state.gov/pax-silica-initiative-ai-semiconductors",
        "Publisher": "U.S. Department of State",
        "Domain": "state.gov",
        "Category": "Pax Silica & Compute",
        "Jurisdiction": "Global",
        "Published Date": "2025-12-12",
        "Excerpt": "Official U.S. State Department initiative establishing the international framework to secure semiconductor packaging, critical minerals, and AI compute infrastructure among trusted partners.",
        "OG Image URL": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
        "Status": "Verified",
        "Resource ID": "ps-link-001",
      },
    },
    {
      fields: {
        "Title": "Pax Silica and the Geopolitics of Southeast Asia's Semiconductor Packaging Hubs",
        "URL": "https://asiasociety.org/policy-institute/pax-silica-southeast-asia-semiconductor",
        "Publisher": "Asia Society Policy Institute",
        "Domain": "asiasociety.org",
        "Category": "Pax Silica & Compute",
        "Jurisdiction": "ASEAN",
        "Published Date": "2026-03-18",
        "Excerpt": "Comprehensive policy evaluation of how the U.S. Pax Silica coalition impacts Malaysia's 13% global ATP share, Vietnam's rare earth reserves, and Singapore's wafer fabs.",
        "OG Image URL": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80",
        "Status": "Verified",
        "Resource ID": "ps-link-002",
      },
    },
    {
      fields: {
        "Title": "Critical Minerals & AI Hardware: Indonesia's Nickel Strategy Under Western Supply Chain Pacts",
        "URL": "https://www.csis.org/analysis/indonesia-critical-minerals-nickel-pax-silica",
        "Publisher": "Center for Strategic and International Studies",
        "Domain": "csis.org",
        "Category": "Pax Silica & Compute",
        "Jurisdiction": "ID",
        "Published Date": "2026-05-10",
        "Excerpt": "Analysis of Indonesia's mineral sovereignty, downstreaming policies, and compliance negotiations within Western AI data center power supply networks.",
        "OG Image URL": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        "Status": "Verified",
        "Resource ID": "ps-link-003",
      },
    },
  ];
  await insertRecords("Curated Links", linksRecords);

  // 2. News / Investigations
  const newsRecords = [
    {
      fields: {
        "Title": "Pax Silica vs. ASEAN DEFA: The Geopolitical Battle for Southeast Asia's Compute Stack",
        "Slug": "pax-silica-vs-asean-defa-compute-stack",
        "Jurisdiction": "ASEAN Regional",
        "Category": "PAX SILICA & COMPUTE",
        "Summary": "As the U.S. expands its Pax Silica alliance to ring-fence semiconductor packaging in Malaysia and mineral corridors in Indonesia, Southeast Asian policymakers face unprecedented pressure to reconcile national tech sovereignty with ASEAN DEFA digital trade integration.",
        "Source URL": "https://engagemedia.org/research/pax-silica-asean-compute-stack",
        "Source Name": "EngageMedia Research Team",
        "Published Date": "2026-08-20",
        "Image URL": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
        "Author": "EngageMedia Research Team",
        "Read Time": "6 min read",
        "Status": "published",
        "Threat Level": "High Alert",
        "Legacy ID": "news-ps-001",
      },
    },
  ];
  await insertRecords("News", newsRecords);

  // 3. Policies
  const policyRecords = [
    {
      fields: {
        "Title": "U.S. International Technology Security and Innovation (ITSI) Fund & Semiconductor Bilateral Agreements",
        "Jurisdiction": "ASEAN Regional",
        "Category": "Pax Silica & Compute",
        "Threat Level": "Medium Risk",
        "Date": "August 15, 2026",
        "Summary": "Bilateral technical agreements channeling U.S. CHIPS Act funds to develop workforce talent and semiconductor assembly, testing, and packaging (ATP) infrastructure across Malaysia, Vietnam, and the Philippines under Pax Silica security standards.",
        "Primary Source URL": "https://www.state.gov/semiconductor-supply-chain-initiatives",
        "Source Authority": "U.S. Department of State & ASEAN Economic Ministers",
        "Legacy ID": "pol-ps-001",
      },
    },
  ];
  await insertRecords("Policies", policyRecords);

  console.log("All Pax Silica records seeded successfully!");
}

main().catch(console.error);
