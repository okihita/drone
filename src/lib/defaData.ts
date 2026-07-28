export interface DefaChapterStatus {
  chapterId: string;
  chapterName: string;
  status: "Active Ratification" | "Under Negotiation" | "Draft Annex" | "Strict Safeguards";
  summary: string;
  lastUpdated: string;
}

export interface CountryRegulatoryProfile {
  id: string;
  code: string;
  name: string;
  capital: string;
  regimeType: "Open Transfer" | "Hybrid" | "Strict Localization";
  threatScore: number;
  primaryAgency: string;
  keyLegislation: string;
  transferMechanism: string;
  maxPenalty: string;
  activePoliciesCount: number;
  description: string;
  chapters: Record<string, DefaChapterStatus["status"]>;
}

export interface PolicyAlert {
  id: string;
  countryCode: string;
  countryName: string;
  title: string;
  severity: "High Alert" | "Medium Risk" | "Rights Verified";
  category: "DEFA" | "Cross-Border Data" | "AI Governance" | "Cybersecurity";
  date: string;
  summary: string;
  impactScore: number;
  primaryLink: string;
}

export const DEFA_CHAPTERS = [
  { id: "data_flows", name: "Cross-Border Data Flows", icon: "Globe" },
  { id: "e_commerce", name: "Digital Trade Facilitation", icon: "ShoppingBag" },
  { id: "payments", name: "Digital Payments & Settlement", icon: "CreditCard" },
  { id: "ai_governance", name: "AI Ethics & Algorithmic Safety", icon: "Cpu" },
  { id: "cybersecurity", name: "Critical Infrastructure & Cyber", icon: "Shield" },
  { id: "ip_innovation", name: "Digital IP & Innovation", icon: "Award" },
] as const;

export const REALISTIC_COUNTRY_PROFILES: CountryRegulatoryProfile[] = [
  {
    id: "sg", code: "SG", name: "Singapore", capital: "Singapore", regimeType: "Open Transfer", threatScore: 1,
    primaryAgency: "IMDA & PDPC", keyLegislation: "PDPA & AI Verify Framework", transferMechanism: "APEC CBPR & BCRs",
    maxPenalty: "Up to 10% turnover or S$1M", activePoliciesCount: 14,
    description: "Pioneer in ASEAN digital trade interoperability. Leads AI governance frameworks and cross-border sandbox trials.",
    chapters: { data_flows: "Active Ratification", e_commerce: "Active Ratification", payments: "Active Ratification", ai_governance: "Active Ratification", cybersecurity: "Active Ratification", ip_innovation: "Active Ratification" },
  },
  {
    id: "vn", code: "VN", name: "Vietnam", capital: "Hanoi", regimeType: "Strict Localization", threatScore: 5,
    primaryAgency: "Ministry of Public Security (MPS)", keyLegislation: "Decree 53/2022, Cybersecurity Law & Decree 147", transferMechanism: "Mandatory On-Shore Storage & MPS Dossier",
    maxPenalty: "Up to 5% turnover & service suspension", activePoliciesCount: 19,
    description: "Strict data localization mandates requiring foreign tech companies to store local user data onshore and maintain local branch offices.",
    chapters: { data_flows: "Strict Safeguards", e_commerce: "Under Negotiation", payments: "Under Negotiation", ai_governance: "Draft Annex", cybersecurity: "Strict Safeguards", ip_innovation: "Under Negotiation" },
  },
  {
    id: "id", code: "ID", name: "Indonesia", capital: "Jakarta", regimeType: "Hybrid", threatScore: 3,
    primaryAgency: "Kominfo & PDP Authority", keyLegislation: "PDP Law No. 27/2022 & GR 71 (MR5)", transferMechanism: "Equivalent Protection Adequacy & Consent",
    maxPenalty: "Up to 2% global turnover & data confiscation", activePoliciesCount: 16,
    description: "Hybrid data governance framework mandating local registration for private scope electronic system operators (PSE).",
    chapters: { data_flows: "Under Negotiation", e_commerce: "Active Ratification", payments: "Active Ratification", ai_governance: "Draft Annex", cybersecurity: "Under Negotiation", ip_innovation: "Under Negotiation" },
  },
  {
    id: "th", code: "TH", name: "Thailand", capital: "Bangkok", regimeType: "Hybrid", threatScore: 3,
    primaryAgency: "PDPC & ETDA", keyLegislation: "PDPA B.E. 2562 & Royal Decree on Platforms", transferMechanism: "Standard Contractual Clauses & Adequacy Lists",
    maxPenalty: "Up to THB 5M & 1 year imprisonment", activePoliciesCount: 11,
    description: "GDPR-inspired framework with active enforcement guidelines on cross-border transfers and digital platform operator oversight.",
    chapters: { data_flows: "Under Negotiation", e_commerce: "Active Ratification", payments: "Under Negotiation", ai_governance: "Draft Annex", cybersecurity: "Under Negotiation", ip_innovation: "Active Ratification" },
  },
  {
    id: "my", code: "MY", name: "Malaysia", capital: "Kuala Lumpur", regimeType: "Open Transfer", threatScore: 2,
    primaryAgency: "PDPD & MDEC", keyLegislation: "PDPA 2010 (Amendment 2024)", transferMechanism: "Ministerial Whitelist & Data Transfer Agreements",
    maxPenalty: "Up to RM 1M & 3 years imprisonment", activePoliciesCount: 12,
    description: "Progressive regional hub facilitating ASEAN DEFA digital payment bridges while strengthening breach notification duties.",
    chapters: { data_flows: "Active Ratification", e_commerce: "Active Ratification", payments: "Active Ratification", ai_governance: "Under Negotiation", cybersecurity: "Under Negotiation", ip_innovation: "Active Ratification" },
  },
  {
    id: "ph", code: "PH", name: "Philippines", capital: "Manila", regimeType: "Open Transfer", threatScore: 2,
    primaryAgency: "National Privacy Commission (NPC)", keyLegislation: "Data Privacy Act (RA 10173)", transferMechanism: "APEC CBPR & Subcontractor Accountability",
    maxPenalty: "Up to PHP 5M & 6 years imprisonment", activePoliciesCount: 10,
    description: "Strong advocate of APEC CBPR cross-border interoperability and regional IT-BPO privacy safeguards.",
    chapters: { data_flows: "Active Ratification", e_commerce: "Active Ratification", payments: "Under Negotiation", ai_governance: "Under Negotiation", cybersecurity: "Under Negotiation", ip_innovation: "Active Ratification" },
  },
  {
    id: "mm", code: "MM", name: "Myanmar", capital: "Naypyidaw", regimeType: "Strict Localization", threatScore: 5,
    primaryAgency: "MOTC", keyLegislation: "Draft Cybersecurity Law 2022", transferMechanism: "State Approval & Intercept Directives",
    maxPenalty: "Unrestricted administrative sanctions", activePoliciesCount: 8,
    description: "Extremely restrictive digital regime with draft provisions for warrantless data access and VPN criminalization.",
    chapters: { data_flows: "Strict Safeguards", e_commerce: "Draft Annex", payments: "Draft Annex", ai_governance: "Strict Safeguards", cybersecurity: "Strict Safeguards", ip_innovation: "Draft Annex" },
  },
  {
    id: "kh", code: "KH", name: "Cambodia", capital: "Phnom Penh", regimeType: "Hybrid", threatScore: 4,
    primaryAgency: "MPTC", keyLegislation: "Sub-Decree on National Internet Gateway (NIG)", transferMechanism: "NIG Route Monitoring & Consent",
    maxPenalty: "Up to KHR 500M & suspension", activePoliciesCount: 7,
    description: "National Internet Gateway architecture centralizes international web traffic and mandates local domain storage.",
    chapters: { data_flows: "Strict Safeguards", e_commerce: "Under Negotiation", payments: "Under Negotiation", ai_governance: "Draft Annex", cybersecurity: "Strict Safeguards", ip_innovation: "Draft Annex" },
  },
  {
    id: "la", code: "LA", name: "Laos", capital: "Vientiane", regimeType: "Hybrid", threatScore: 3,
    primaryAgency: "MTC", keyLegislation: "Law on Cybercrime & Electronic Data", transferMechanism: "Ministry Inspection & Service Reg.",
    maxPenalty: "Up to LAK 100M & hardware forfeiture", activePoliciesCount: 5,
    description: "Developing digital legal framework balancing infrastructure expansion with state cybersecurity oversight.",
    chapters: { data_flows: "Under Negotiation", e_commerce: "Under Negotiation", payments: "Under Negotiation", ai_governance: "Draft Annex", cybersecurity: "Under Negotiation", ip_innovation: "Draft Annex" },
  },
  {
    id: "bn", code: "BN", name: "Brunei", capital: "Bandar Seri Begawan", regimeType: "Hybrid", threatScore: 2,
    primaryAgency: "Cyber Security Brunei & AITI", keyLegislation: "Personal Data Protection Order", transferMechanism: "Standard Agreements & Consent",
    maxPenalty: "Up to BND 500,000", activePoliciesCount: 6,
    description: "High compliance standards prioritizing cloud security protocols and financial sector data safeguards.",
    chapters: { data_flows: "Under Negotiation", e_commerce: "Active Ratification", payments: "Active Ratification", ai_governance: "Under Negotiation", cybersecurity: "Active Ratification", ip_innovation: "Under Negotiation" },
  },
  {
    id: "tl", code: "TL", name: "Timor-Leste", capital: "Dili", regimeType: "Open Transfer", threatScore: 1,
    primaryAgency: "TIC TIMOR IP & MTC", keyLegislation: "National Digital Strategy 2030", transferMechanism: "International Open Treaties",
    maxPenalty: "Administrative warnings", activePoliciesCount: 4,
    description: "Observer member state aligning digital laws with ASEAN DEFA frameworks to accelerate accession.",
    chapters: { data_flows: "Active Ratification", e_commerce: "Active Ratification", payments: "Under Negotiation", ai_governance: "Draft Annex", cybersecurity: "Under Negotiation", ip_innovation: "Under Negotiation" },
  },
];

export const REALISTIC_POLICY_ALERTS: PolicyAlert[] = [
  {
    id: "alert-1", countryCode: "VN", countryName: "Vietnam", title: "Decree 147 Enforces Onshore Data Storage for Social & Cloud Platforms",
    severity: "High Alert", category: "Cross-Border Data", date: "2026-07-28", impactScore: 4.8, primaryLink: "https://vanban.chinhphu.vn",
    summary: "Ministry of Public Security publishes updated enforcement guidelines requiring foreign tech companies to store local user data and maintain local representative offices within 90 days.",
  },
  {
    id: "alert-2", countryCode: "SG", countryName: "Singapore", title: "IMDA Releases ASEAN Generative AI Evaluation & Safety Protocol",
    severity: "Rights Verified", category: "AI Governance", date: "2026-07-26", impactScore: 1.2, primaryLink: "https://www.imda.gov.sg",
    summary: "Singapore IMDA expands AI Verify foundation model sandbox to all 11 ASEAN member states, providing open-source benchmark suites for cross-border AI compliance.",
  },
  {
    id: "alert-3", countryCode: "ID", countryName: "Indonesia", title: "Kominfo Issues Ministerial Regulation on Cross-Border Data Adequacy",
    severity: "Medium Risk", category: "DEFA", date: "2026-07-24", impactScore: 3.4, primaryLink: "https://www.kominfo.go.id",
    summary: "Personal Data Protection Authority clarifies whitelist assessment criteria for transferring personal data outside Indonesia under Law No. 27/2022.",
  },
  {
    id: "alert-4", countryCode: "MM", countryName: "Myanmar", title: "MOTC Draft Law Grants Warrantless Access to Telecommunication Logs",
    severity: "High Alert", category: "Cybersecurity", date: "2026-07-22", impactScore: 4.9, primaryLink: "https://www.motc.gov.mm",
    summary: "Proposed cybersecurity amendment mandates ISP packet inspection and criminalizes VPN usage without prior military administrative clearance.",
  },
  {
    id: "alert-5", countryCode: "MY", countryName: "Malaysia", title: "Bank Negara & MAS Launch Bilateral Real-Time QR Payment Corridor",
    severity: "Rights Verified", category: "DEFA", date: "2026-07-20", impactScore: 1.5, primaryLink: "https://www.bnm.gov.my",
    summary: "Malaysia DNG and Singapore MAS integrate PayNow-DuitNow linkage under ASEAN DEFA Article 7 provisions for instant cross-border settlement.",
  },
  {
    id: "alert-6", countryCode: "TH", countryName: "Thailand", title: "ETDA Mandates Transparency Audits for Large Digital Service Platforms",
    severity: "Medium Risk", category: "AI Governance", date: "2026-07-18", impactScore: 3.1, primaryLink: "https://www.etda.or.th",
    summary: "Thailand's Electronic Transactions Development Agency requires annual algorithmic accountability reports for platforms exceeding 5 Million active local users.",
  },
];
