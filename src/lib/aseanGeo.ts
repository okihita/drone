import { geoMercator, geoPath } from "d3-geo";
import geoData from "../../public/data/southeast-asia.json";
import type { Jurisdiction } from "@/types";

export interface GeoCountryData {
  id: string;
  name: string;
  code: string;
  capital: string;
  regimeType: "Open Transfer" | "Hybrid" | "Strict Localization";
  activityLevel: "High Activity" | "Moderate" | "Monitoring";
  threatScore: number;
  activePoliciesCount: number;
  dataFlowPolicy: string;
  keyLegislation: string;
  description: string;
  primaryLink: string;
  pathD: string;
  centerPos: { x: number; y: number };
}

// Map GeoJSON feature names / codes to country metadata
const COUNTRY_METADATA_LIST: Omit<GeoCountryData, "pathD" | "centerPos">[] = [
  {
    id: "ID",
    name: "Indonesia",
    code: "ID",
    capital: "Jakarta",
    regimeType: "Hybrid",
    activityLevel: "High Activity",
    threatScore: 4,
    activePoliciesCount: 14,
    dataFlowPolicy: "Public Sector Localization (PP 71/2019) & PDP Law No. 27/2022",
    keyLegislation: "PDP Law 27/2022 & Ministerial Regulation 5 (MR5)",
    description: "Public electronic system operators must store data domestically. Private operators can transfer data abroad under contractual safeguards. MR5 mandates 24-hour content removal for emergency compliance requests.",
    primaryLink: "https://kominfo.go.id",
  },
  {
    id: "MY",
    name: "Malaysia",
    code: "MY",
    capital: "Kuala Lumpur",
    regimeType: "Open Transfer",
    activityLevel: "Moderate",
    threatScore: 3,
    activePoliciesCount: 9,
    dataFlowPolicy: "Open Transfer Regime under Personal Data Protection Act (PDPA 2010)",
    keyLegislation: "PDPA 2010 & National Artificial Intelligence Roadmap 2021–2025",
    description: "Supports open cross-border data flows within ASEAN DEFA negotiations. Active proponent of paperless e-customs and cross-border QR payment linkages with Singapore and Indonesia.",
    primaryLink: "https://pdp.gov.my",
  },
  {
    id: "SG",
    name: "Singapore",
    code: "SG",
    capital: "Singapore",
    regimeType: "Open Transfer",
    activityLevel: "High Activity",
    threatScore: 2,
    activePoliciesCount: 18,
    dataFlowPolicy: "Open Transfer Regime (PDPA Provisions & ASEAN MCCs Leader)",
    keyLegislation: "Personal Data Protection Act (PDPA) & AI Verify Governance Testing Framework",
    description: "Leads ASEAN DEFA digital trade negotiations. Strongly advocates banning mandatory data localization, mandatory source code disclosures, and digital service customs duties.",
    primaryLink: "https://imda.gov.sg",
  },
  {
    id: "PH",
    name: "Philippines",
    code: "PH",
    capital: "Manila",
    regimeType: "Open Transfer",
    activityLevel: "High Activity",
    threatScore: 3,
    activePoliciesCount: 11,
    dataFlowPolicy: "Open Transfer Regime with NPC Safeguards & APEC CBPR Interoperability",
    keyLegislation: "Data Privacy Act of 2012 (RA 10173) & E-Governance Act",
    description: "Host of May 2026 57th SEOM DEFA conclusion in Manila. Champions cross-border data interoperability while preserving National Privacy Commission enforcement mechanisms.",
    primaryLink: "https://privacy.gov.ph",
  },
  {
    id: "TH",
    name: "Thailand",
    code: "TH",
    capital: "Bangkok",
    regimeType: "Hybrid",
    activityLevel: "High Activity",
    threatScore: 4,
    activePoliciesCount: 12,
    dataFlowPolicy: "Hybrid Adequacy Regime (PDPA B.E. 2562)",
    keyLegislation: "Personal Data Protection Act (PDPA) & Royal Decree on Digital Platforms",
    description: "Cross-border data transfers allowed to jurisdictions with adequate protection or via standard contractual clauses. Active platform governance regulations.",
    primaryLink: "https://etda.or.th",
  },
  {
    id: "VN",
    name: "Vietnam",
    code: "VN",
    capital: "Hanoi",
    regimeType: "Strict Localization",
    activityLevel: "High Activity",
    threatScore: 5,
    activePoliciesCount: 16,
    dataFlowPolicy: "Mandatory Local Storage & Local Office Requirement (Decree 53/2022)",
    keyLegislation: "Law on Cybersecurity (Law No. 24/2018) & Decree 53/2022/ND-CP",
    description: "Mandates foreign tech firms (cloud, social networks, OTT telecommunications) to store user data in Vietnam and establish branch offices upon police request.",
    primaryLink: "https://mic.gov.vn",
  },
  {
    id: "KH",
    name: "Cambodia",
    code: "KH",
    capital: "Phnom Penh",
    regimeType: "Hybrid",
    activityLevel: "Monitoring",
    threatScore: 4,
    activePoliciesCount: 6,
    dataFlowPolicy: "National Internet Gateway (NIG) Sub-Decree Framework",
    keyLegislation: "E-Commerce Law 2019 & Sub-Decree on National Internet Gateway",
    description: "Pending National Internet Gateway framework creates centralized internet traffic inspection concerns. Receiving regional technical assistance for DEFA compliance.",
    primaryLink: "https://mptc.gov.kh",
  },
  {
    id: "LA",
    name: "Laos",
    code: "LA",
    capital: "Vientiane",
    regimeType: "Hybrid",
    activityLevel: "Monitoring",
    threatScore: 3,
    activePoliciesCount: 4,
    dataFlowPolicy: "Draft Data Protection Law & Electronic Transactions Framework",
    keyLegislation: "Law on Electronic Transactions & Cybercrime Prevention Law",
    description: "Developing digital economy infrastructure; aligning national regulations with the ASEAN Digital Masterplan 2025.",
    primaryLink: "https://mpt.gov.la",
  },
  {
    id: "MM",
    name: "Myanmar",
    code: "MM",
    capital: "Naypyidaw",
    regimeType: "Strict Localization",
    activityLevel: "High Activity",
    threatScore: 5,
    activePoliciesCount: 8,
    dataFlowPolicy: "Military Regime Control & Draft Cybersecurity Law",
    keyLegislation: "Draft Cybersecurity Law & Telecommunications Directives",
    description: "Severe digital rights restrictions, frequent internet shutdowns, mandatory VPN restrictions, and unconstrained police access to user data.",
    primaryLink: "https://motc.gov.mm",
  },
  {
    id: "BN",
    name: "Brunei",
    code: "BN",
    capital: "Bandar Seri Begawan",
    regimeType: "Hybrid",
    activityLevel: "Monitoring",
    threatScore: 2,
    activePoliciesCount: 5,
    dataFlowPolicy: "Personal Data Protection Order (PDPO) Draft Framework",
    keyLegislation: "AITI Digital Economy Masterplan 2025",
    description: "Harmonizing national digital trade rules with ASEAN DEFA frameworks; focus on paperless e-customs and e-invoicing.",
    primaryLink: "https://aiti.gov.bn",
  },
  {
    id: "TL",
    name: "Timor-Leste",
    code: "TL",
    capital: "Dili",
    regimeType: "Open Transfer",
    activityLevel: "Monitoring",
    threatScore: 2,
    activePoliciesCount: 3,
    dataFlowPolicy: "ASEAN Candidate Member State — Digital Integration Roadmap",
    keyLegislation: "National ICT Policy 2017–2030 & Draft Cybercrime Law",
    description: "Preparing full accession to ASEAN; aligning national telecommunication framework with ASEAN Digital Integration Index.",
    primaryLink: "https://tic.gov.tl",
  },
];


// Round projection coordinates to avoid server/client floating-point mismatch
function r(v: number): number {
  return Math.round(v * 10000) / 10000;
}

// Generate high-precision SVG path strings using Mercator projection over 540x370 viewBox.
// Merges live Airtable CMS jurisdictions metadata with GeoJSON vector geometries.
export function getRealAseanCountries(liveJurisdictions?: Jurisdiction[]): GeoCountryData[] {
  const width = 540;
  const height = 370;

  const projection = geoMercator()
    .center([115, 6.5])
    .scale(620)
    .translate([width / 2, height / 2 + 66.7]);

  const pathGenerator = geoPath().projection(projection).digits(4);

  // Build dynamic lookup maps merging static baseline with live Airtable data if provided
  const metaByCode = new Map<string, Omit<GeoCountryData, "pathD" | "centerPos">>();
  for (const item of COUNTRY_METADATA_LIST) {
    metaByCode.set(item.code.toUpperCase(), { ...item });
  }

  if (liveJurisdictions && Array.isArray(liveJurisdictions)) {
    for (const j of liveJurisdictions) {
      const code = j.code?.toUpperCase();
      const existing = code ? metaByCode.get(code) : undefined;
      if (existing) {
        metaByCode.set(code, {
          ...existing,
          name: j.name || existing.name,
          capital: j.capital || existing.capital,
          regimeType: (j.regime_type as GeoCountryData["regimeType"]) || existing.regimeType,
          activityLevel: (j.activity_level as GeoCountryData["activityLevel"]) || existing.activityLevel,
          threatScore: typeof j.threat_score === "number" ? j.threat_score : existing.threatScore,
          activePoliciesCount: typeof j.active_policies_count === "number" ? j.active_policies_count : existing.activePoliciesCount,
          dataFlowPolicy: j.data_flow_policy || existing.dataFlowPolicy,
          keyLegislation: j.key_legislation || existing.keyLegislation,
          description: j.description || existing.description,
          primaryLink: j.primary_link || existing.primaryLink,
        });
      }
    }
  }

  const metaByName = new Map<string, Omit<GeoCountryData, "pathD" | "centerPos">>();
  for (const meta of metaByCode.values()) {
    metaByName.set(meta.name.toLowerCase(), meta);
  }

  const result: GeoCountryData[] = [];
  const processedCodes = new Set<string>();

  // Iterate over GeoJSON features
  for (const feature of geoData.features as GeoJSON.Feature<
    GeoJSON.Geometry,
    { name?: string; code?: string; iso?: string }
  >[]) {
    const code = (feature.properties?.code || feature.properties?.iso || "").toUpperCase();
    const geoName = (feature.properties?.name || "").toLowerCase();

    const meta = (code ? metaByCode.get(code) : null) || metaByName.get(geoName);

    if (meta && !processedCodes.has(meta.code)) {
      processedCodes.add(meta.code);
      const pathD = pathGenerator(feature) || "";
      const centroid = pathGenerator.centroid(feature);

      result.push({
        ...meta,
        pathD,
        centerPos: {
          x: isNaN(centroid[0]) ? width / 2 : r(centroid[0]),
          y: isNaN(centroid[1]) ? height / 2 : r(centroid[1]),
        },
      });
    }
  }

  return result;
}
