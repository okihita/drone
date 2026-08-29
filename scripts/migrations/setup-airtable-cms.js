/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Setup Airtable CMS: Creates tables and seeds all data from Supabase dumps.
 * 
 * Tables created in Airtable:
 * 1. "Policies"
 * 2. "News"
 * 3. "Jurisdictions"
 * 
 * Run with:
 *   node scripts/migrations/setup-airtable-cms.js
 */

require("dotenv").config({ path: ".env.local" });
const https = require("https");
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.AIRTABLE_PAT;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!TOKEN || !BASE_ID) {
  console.error("❌ Missing AIRTABLE_PAT or AIRTABLE_BASE_ID in environment.");
  process.exit(1);
}

function request(method, urlPath, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(`https://api.airtable.com/v0${urlPath}`, {
      method,
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {})
      }
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getExistingTables() {
  const res = await request("GET", `/meta/bases/${BASE_ID}/tables`);
  return res.tables || [];
}

async function createTableIfNotExists(tableSchema) {
  const existing = await getExistingTables();
  const found = existing.find(t => t.name === tableSchema.name);
  if (found) {
    console.log(`ℹ️ Table "${tableSchema.name}" already exists (${found.id}).`);
    return found;
  }

  console.log(`🔨 Creating table "${tableSchema.name}"...`);
  const created = await request("POST", `/meta/bases/${BASE_ID}/tables`, tableSchema);
  console.log(`✅ Table "${tableSchema.name}" created (${created.id}).`);
  await sleep(1000);
  return created;
}

async function batchInsert(tableName, records) {
  console.log(`📦 Inserting ${records.length} records into "${tableName}"...`);
  const BATCH_SIZE = 10;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const chunk = records.slice(i, i + BATCH_SIZE);
    const body = {
      records: chunk.map(fields => ({ fields }))
    };
    await request("POST", `/${BASE_ID}/${encodeURIComponent(tableName)}`, body);
    console.log(`   Uploaded records ${i + 1} to ${Math.min(i + BATCH_SIZE, records.length)}`);
    await sleep(250); // Respect rate limits
  }
  console.log(`🎉 Finished inserting into "${tableName}"!\n`);
}

async function main() {
  console.log("🚀 Initializing Airtable CMS Migration...");

  // 1. Table: Policies
  const policiesSchema = {
    name: "Policies",
    description: "Verified regulatory policies and digital trade decrees",
    fields: [
      { name: "Title", type: "singleLineText" },
      { name: "Jurisdiction", type: "singleLineText" },
      { name: "Category", type: "singleLineText" },
      { name: "Threat Level", type: "singleLineText" },
      { name: "Date", type: "singleLineText" },
      { name: "Summary", type: "multilineText" },
      { name: "Primary Source URL", type: "url" },
      { name: "Source Authority", type: "singleLineText" },
      { name: "Legacy ID", type: "singleLineText" },
    ]
  };
  await createTableIfNotExists(policiesSchema);

  // 2. Table: News
  const newsSchema = {
    name: "News",
    description: "Investigations, field dispatches, and policy analysis long-reads",
    fields: [
      { name: "Title", type: "singleLineText" },
      { name: "Slug", type: "singleLineText" },
      { name: "Jurisdiction", type: "singleLineText" },
      { name: "Category", type: "singleLineText" },
      { name: "Summary", type: "multilineText" },
      { name: "Source URL", type: "url" },
      { name: "Source Name", type: "singleLineText" },
      { name: "Published Date", type: "singleLineText" },
      { name: "Image URL", type: "url" },
      { name: "Author", type: "singleLineText" },
      { name: "Read Time", type: "singleLineText" },
      { name: "Status", type: "singleLineText" },
      { name: "Threat Level", type: "singleLineText" },
      { name: "Legacy ID", type: "singleLineText" },
    ]
  };
  await createTableIfNotExists(newsSchema);

  // 3. Table: Jurisdictions
  const jurisdictionsSchema = {
    name: "Jurisdictions",
    description: "ASEAN Member States and jurisdiction governance telemetry",
    fields: [
      { name: "Name", type: "singleLineText" },
      { name: "Code", type: "singleLineText" },
      { name: "Capital", type: "singleLineText" },
      { name: "Regime Type", type: "singleLineText" },
      { name: "Activity Level", type: "singleLineText" },
      { name: "Threat Score", type: "number", options: { precision: 0 } },
      { name: "Active Policies Count", type: "number", options: { precision: 0 } },
      { name: "Data Flow Policy", type: "singleLineText" },
      { name: "Key Legislation", type: "singleLineText" },
      { name: "Description", type: "multilineText" },
      { name: "Primary Link", type: "url" },
      { name: "Legacy ID", type: "singleLineText" },
    ]
  };
  await createTableIfNotExists(jurisdictionsSchema);

  // Load Seed Files
  const policiesData = JSON.parse(fs.readFileSync(path.join(__dirname, "seed-policies.json"), "utf8"));
  const newsData = JSON.parse(fs.readFileSync(path.join(__dirname, "seed-news.json"), "utf8"));
  const jurisdictionsData = JSON.parse(fs.readFileSync(path.join(__dirname, "seed-jurisdictions.json"), "utf8"));

  // Format records for Airtable
  const formattedPolicies = policiesData.map(p => ({
    "Title": p.title || "",
    "Jurisdiction": p.jurisdiction || "",
    "Category": p.category || "",
    "Threat Level": p.threat_level || "",
    "Date": p.date || "",
    "Summary": p.summary || "",
    "Primary Source URL": p.primary_source_url || undefined,
    "Source Authority": p.source_authority || "",
    "Legacy ID": p.id || ""
  }));

  const formattedNews = newsData.map(n => ({
    "Title": n.title || "",
    "Slug": n.slug || "",
    "Jurisdiction": n.jurisdiction || "",
    "Category": n.category || "",
    "Summary": n.summary || "",
    "Source URL": n.source_url || undefined,
    "Source Name": n.source_name || "",
    "Published Date": n.published_date || "",
    "Image URL": n.image_url || undefined,
    "Author": n.author || "EngageMedia Research Team",
    "Read Time": n.read_time || "4 min read",
    "Status": n.status || "published",
    "Threat Level": n.threat_level || "",
    "Legacy ID": n.id || ""
  }));

  const formattedJurisdictions = jurisdictionsData.map(j => ({
    "Name": j.name || "",
    "Code": j.code || "",
    "Capital": j.capital || "",
    "Regime Type": j.regime_type || "",
    "Activity Level": j.activity_level || "",
    "Threat Score": Number(j.threat_score) || 0,
    "Active Policies Count": Number(j.active_policies_count) || 0,
    "Data Flow Policy": j.data_flow_policy || "",
    "Key Legislation": j.key_legislation || "",
    "Description": j.description || "",
    "Primary Link": j.primary_link || undefined,
    "Legacy ID": j.id || ""
  }));

  await batchInsert("Policies", formattedPolicies);
  await batchInsert("News", formattedNews);
  await batchInsert("Jurisdictions", formattedJurisdictions);

  console.log("✨ All 3 tables successfully provisioned and populated in Airtable!");
}

main().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
