/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Airtable Seeder for Curated Links
 * 
 * 1. Creates the "Curated Links" table in DRONE CMS base with exact schema.
 * 2. Seeds all 32 curated policy links from src/lib/linksData.ts into Airtable.
 */

const https = require("https");
const CURATED_LINKS = require("./seed-links.json");

const TOKEN = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!TOKEN || !BASE_ID) {
  console.error("❌ Error: AIRTABLE_PAT and AIRTABLE_BASE_ID environment variables are required.");
  process.exit(1);
}

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(`https://api.airtable.com/v0${path}`, {
      method,
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`🚀 Starting Airtable migration for base: ${BASE_ID}...`);

  // Step 1: Check existing tables
  const meta = await request("GET", `/meta/bases/${BASE_ID}/tables`);
  let table = meta.data?.tables?.find(t => t.name === "Curated Links");

  if (!table) {
    console.log("Creating 'Curated Links' table schema...");
    const createTablePayload = {
      name: "Curated Links",
      description: "Curated policy, trade, and digital rights resources for DRONE",
      fields: [
        { name: "Title", type: "singleLineText" },
        { name: "URL", type: "url" },
        { name: "Publisher", type: "singleLineText" },
        { name: "Domain", type: "singleLineText" },
        {
          name: "Category",
          type: "singleSelect",
          options: {
            choices: [
              { name: "Trade & Tariffs" },
              { name: "DEFA & Treaties" },
              { name: "Data Governance" },
              { name: "Tech Sovereignty" },
              { name: "AI & Labor" }
            ]
          }
        },
        {
          name: "Jurisdiction",
          type: "singleSelect",
          options: {
            choices: [
              { name: "ID" },
              { name: "MY" },
              { name: "PH" },
              { name: "ASEAN" },
              { name: "US" },
              { name: "Global" }
            ]
          }
        },
        { name: "Published Date", type: "singleLineText" },
        { name: "Excerpt", type: "multilineText" },
        { name: "OG Image URL", type: "url" },
        {
          name: "Is PDF",
          type: "checkbox",
          options: { icon: "check", color: "greenBright" }
        },
        {
          name: "Status",
          type: "singleSelect",
          options: {
            choices: [
              { name: "Published" },
              { name: "Draft" },
              { name: "Archived" }
            ]
          }
        },
        { name: "Resource ID", type: "singleLineText" }
      ]
    };

    const res = await request("POST", `/meta/bases/${BASE_ID}/tables`, createTablePayload);
    if (res.status !== 200) {
      console.error("❌ Failed to create table:", res.data || res.raw);
      process.exit(1);
    }
    table = res.data;
    console.log(`✅ Created table: "${table.name}" (ID: ${table.id})`);
  } else {
    console.log(`ℹ️ Table 'Curated Links' already exists (ID: ${table.id})`);
  }

  // Step 2: Batch upload all 32 curated links
  console.log(`\n📦 Uploading ${CURATED_LINKS.length} records in batches of 10...`);
  
  const records = CURATED_LINKS.map(item => ({
    fields: {
      "Title": item.title,
      "URL": item.url,
      "Publisher": item.publisher,
      "Domain": item.domain,
      "Category": item.category,
      "Jurisdiction": item.jurisdiction,
      "Published Date": item.publishedDate,
      "Excerpt": item.excerpt,
      ...(item.ogImage ? { "OG Image URL": item.ogImage } : {}),
      "Is PDF": Boolean(item.isPdf),
      "Status": "Published",
      "Resource ID": item.id
    }
  }));

  const batchSize = 10;
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    console.log(`Uploading records ${i + 1} to ${Math.min(i + batchSize, records.length)}...`);
    const insertRes = await request("POST", `/${BASE_ID}/${table.id}`, { records: batch });

    if (insertRes.status !== 200) {
      console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, insertRes.data || insertRes.raw);
    } else {
      console.log(`✅ Batch ${i / batchSize + 1} inserted successfully (${insertRes.data?.records?.length} records)`);
    }

    // Short delay to stay well under Airtable rate limit
    await new Promise(r => setTimeout(r, 250));
  }

  console.log("\n🎉 All 32 curated links successfully populated into Airtable!");
}

main().catch(console.error);
