import "dotenv/config";
import { Client } from "pg";

const connectionString = process.env.DATABASE_URL!;

// ── Country Seed Data (from aseanGeo.ts COUNTRY_METADATA) ─────────────────────

const countries = [
  { code: "ID", name: "Indonesia", capital: "Jakarta", regimeType: "Hybrid", activityLevel: "High Activity", threatScore: 4, activePoliciesCount: 14, dataFlowPolicy: "Public Sector Localization (PP 71/2019) & PDP Law No. 27/2022", keyLegislation: "PDP Law 27/2022 & Ministerial Regulation 5 (MR5)", description: "Public electronic system operators must store data domestically. Private operators can transfer data abroad under contractual safeguards. MR5 mandates 24-hour content removal for emergency compliance requests.", primaryLink: "https://kominfo.go.id" },
  { code: "MY", name: "Malaysia", capital: "Kuala Lumpur", regimeType: "Open Transfer", activityLevel: "Moderate", threatScore: 3, activePoliciesCount: 9, dataFlowPolicy: "Open Transfer Regime under Personal Data Protection Act (PDPA 2010)", keyLegislation: "PDPA 2010 & National Artificial Intelligence Roadmap 2021–2025", description: "Supports open cross-border data flows within ASEAN DEFA negotiations.", primaryLink: "https://pdp.gov.my" },
  { code: "SG", name: "Singapore", capital: "Singapore", regimeType: "Open Transfer", activityLevel: "High Activity", threatScore: 2, activePoliciesCount: 18, dataFlowPolicy: "Open Transfer Regime (PDPA Provisions & ASEAN MCCs Leader)", keyLegislation: "Personal Data Protection Act (PDPA) & AI Verify", description: "Leads ASEAN DEFA digital trade negotiations.", primaryLink: "https://imda.gov.sg" },
  { code: "PH", name: "Philippines", capital: "Manila", regimeType: "Open Transfer", activityLevel: "High Activity", threatScore: 3, activePoliciesCount: 11, dataFlowPolicy: "Open Transfer Regime with NPC Safeguards & APEC CBPR Interoperability", keyLegislation: "Data Privacy Act of 2012 (RA 10173)", description: "Host of May 2026 57th SEOM DEFA conclusion in Manila.", primaryLink: "https://privacy.gov.ph" },
  { code: "TH", name: "Thailand", capital: "Bangkok", regimeType: "Hybrid", activityLevel: "High Activity", threatScore: 4, activePoliciesCount: 12, dataFlowPolicy: "Hybrid Adequacy Regime (PDPA B.E. 2562)", keyLegislation: "Personal Data Protection Act (PDPA) & Royal Decree on Digital Platforms", description: "Cross-border data transfers allowed to jurisdictions with adequate protection.", primaryLink: "https://etda.or.th" },
  { code: "VN", name: "Vietnam", capital: "Hanoi", regimeType: "Strict Localization", activityLevel: "High Activity", threatScore: 5, activePoliciesCount: 16, dataFlowPolicy: "Mandatory Local Storage & Local Office Requirement (Decree 53/2022)", keyLegislation: "Law on Cybersecurity & Decree 53/2022", description: "Mandates foreign tech firms to store user data in Vietnam.", primaryLink: "https://mic.gov.vn" },
  { code: "KH", name: "Cambodia", capital: "Phnom Penh", regimeType: "Hybrid", activityLevel: "Monitoring", threatScore: 4, activePoliciesCount: 6, dataFlowPolicy: "National Internet Gateway (NIG) Sub-Decree Framework", keyLegislation: "E-Commerce Law 2019 & Sub-Decree on NIG", description: "Pending National Internet Gateway framework.", primaryLink: "https://mptc.gov.kh" },
  { code: "LA", name: "Laos", capital: "Vientiane", regimeType: "Hybrid", activityLevel: "Monitoring", threatScore: 3, activePoliciesCount: 4, dataFlowPolicy: "Draft Data Protection Law & Electronic Transactions Framework", keyLegislation: "Law on Electronic Transactions", description: "Developing digital economy infrastructure.", primaryLink: "https://mpt.gov.la" },
  { code: "MM", name: "Myanmar", capital: "Naypyidaw", regimeType: "Strict Localization", activityLevel: "High Activity", threatScore: 5, activePoliciesCount: 8, dataFlowPolicy: "Military Regime Control & Draft Cybersecurity Law", keyLegislation: "Draft Cybersecurity Law", description: "Severe digital rights restrictions, frequent internet shutdowns.", primaryLink: "https://motc.gov.mm" },
  { code: "BN", name: "Brunei", capital: "Bandar Seri Begawan", regimeType: "Hybrid", activityLevel: "Monitoring", threatScore: 2, activePoliciesCount: 5, dataFlowPolicy: "Personal Data Protection Order (PDPO) Draft Framework", keyLegislation: "AITI Digital Economy Masterplan 2025", description: "Harmonizing national digital trade rules.", primaryLink: "https://aiti.gov.bn" },
  { code: "TL", name: "Timor-Leste", capital: "Dili", regimeType: "Open Transfer", activityLevel: "Monitoring", threatScore: 2, activePoliciesCount: 3, dataFlowPolicy: "ASEAN Candidate Member State — Digital Integration Roadmap", keyLegislation: "National ICT Policy 2017–2030", description: "Preparing full accession to ASEAN.", primaryLink: "https://tic.gov.tl" },
];

// ── Policy Seed Data (from PolicyLedgerTable) ─────────────────────────────────

const policySeeds = [
  { title: "ASEAN Digital Economy Framework Agreement (DEFA) Chapter 5 Legal Scrubbing", jurisdiction: "ASEAN Regional", category: "DEFA", threatLevel: "High Alert", date: "July 15, 2026", summary: "Senior Economic Officials Meeting (SEOM 57) in Manila finalized draft text on Data Free Flow with Trust (DFFT).", primarySourceUrl: "https://asean.org/our-work/digital-economy/", sourceAuthority: "ASEAN Secretariat & SEOM 57 Manila Gazette" },
  { title: "Indonesia Personal Data Protection (PDP Law) Public Sector Localization Decree", jurisdiction: "Indonesia (ID)", category: "Cross-Border Data", threatLevel: "High Alert", date: "July 08, 2026", summary: "Kominfo Ministerial Regulation enforcing mandatory local server storage for public electronic system operators.", primarySourceUrl: "https://kominfo.go.id", sourceAuthority: "Ministry of Communication & Informatics (Kominfo RI)" },
  { title: "Vietnam Decree 53 Implementation Notice on Foreign Cloud Infrastructure", jurisdiction: "Vietnam (VN)", category: "Cybersecurity", threatLevel: "High Alert", date: "June 30, 2026", summary: "Ministry of Information & Communications notice requiring foreign cloud providers to store local user data in Hanoi.", primarySourceUrl: "https://mic.gov.vn", sourceAuthority: "MIC Vietnam & Department of Cybersecurity (A05)" },
  { title: "Singapore IMDA Model Governance Framework & ASEAN Cross-Border Model Clauses", jurisdiction: "Singapore (SG)", category: "AI Governance", threatLevel: "Rights Verified", date: "June 28, 2026", summary: "Updated guidelines for ASEAN Model Contractual Clauses (MCCs) for cross-border data transfers.", primarySourceUrl: "https://imda.gov.sg", sourceAuthority: "Info-communications Media Development Authority (IMDA)" },
  { title: "Philippines NPC Advisory on APEC Cross-Border Privacy Rules (CBPR) Interoperability", jurisdiction: "Philippines (PH)", category: "Cross-Border Data", threatLevel: "Rights Verified", date: "June 14, 2026", summary: "National Privacy Commission circular clarifying data controller liability during international transfers.", primarySourceUrl: "https://privacy.gov.ph", sourceAuthority: "National Privacy Commission (NPC Philippines)" },
  { title: "Thailand PDPA Royal Gazette Announcement on Cross-Border Adequacy Standards", jurisdiction: "Thailand (TH)", category: "Cross-Border Data", threatLevel: "Medium Risk", date: "May 20, 2026", summary: "PDPC announcement establishing criteria for approving destination countries with adequate data protection.", primarySourceUrl: "https://etda.or.th", sourceAuthority: "Electronic Transactions Development Agency (ETDA Thailand)" },
];

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  const client = new Client({ connectionString, connectionTimeoutMillis: 10_000 });
  await client.connect();

  console.log("Seeding jurisdictions...");
  for (const c of countries) {
    await client.query(
      `INSERT INTO jurisdictions (code, name, capital, regime_type, activity_level, threat_score, active_policies_count, data_flow_policy, key_legislation, description, primary_link)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       ON CONFLICT (code) DO NOTHING`,
      [c.code, c.name, c.capital, c.regimeType, c.activityLevel, c.threatScore, c.activePoliciesCount, c.dataFlowPolicy, c.keyLegislation, c.description, c.primaryLink]
    );
  }
  console.log(`  → ${countries.length} countries inserted`);

  console.log("Seeding policies...");
  for (const p of policySeeds) {
    await client.query(
      `INSERT INTO policies (title, jurisdiction, category, threat_level, date, summary, primary_source_url, source_authority)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [p.title, p.jurisdiction, p.category, p.threatLevel, p.date, p.summary, p.primarySourceUrl, p.sourceAuthority]
    );
  }
  console.log(`  → ${policySeeds.length} policies inserted`);

  await client.end();
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
