export interface HeroStory {
  id: string;
  category: string;
  readTime: string;
  title: string;
  summary: string;
  author: string;
  imageSrc: string;
  slug: string;
}

export const HERO_STORIES: HeroStory[] = [
  {
    id: "defa-legal-scrubbing",
    category: "DEFA SPECIAL REPORT",
    readTime: "8 min read",
    title: "ASEAN DEFA Legal Scrubbing: The Quiet Tug-of-War Over Cross-Border Data Privacy",
    summary: "As senior economic officials finalize the text of the world's first region-wide digital trade agreement in Manila, civil society watchdogs warn that mandatory data flow clauses risk preempting domestic privacy safeguards.",
    author: "EngageMedia Research Team",
    imageSrc: "/images/defa_lead.jpg",
    slug: "/investigations",
  },
  {
    id: "vietnam-decree-53",
    category: "DATA LOCALIZATION",
    readTime: "6 min read",
    title: "Vietnam's Decree 53 & Foreign Cloud Mandates: The Local Storage Squeeze",
    summary: "How Ministry of Information notices mandate foreign tech platforms to store user data in Hanoi server centers, creating severe compliance pressure on international civil society orgs.",
    author: "EngageMedia Research Team",
    imageSrc: "/images/vietnam_server.jpg",
    slug: "/investigations",
  },
  {
    id: "ai-audit-bans",
    category: "AI GOVERNANCE",
    readTime: "7 min read",
    title: "Banning Algorithmic Audits: How Big Tech Lobbying Targets Treaties",
    summary: "Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures, shielding high-risk automated decision systems from civil society scrutiny.",
    author: "EngageMedia Research Team",
    imageSrc: "/images/ai_audit.jpg",
    slug: "/investigations",
  },
];

export interface TopicPill {
  label: string;
  href: string;
}

export const POPULAR_TOPICS: TopicPill[] = [
  { label: "ASEAN DEFA", href: "/ledger?q=ASEAN%20DEFA" },
  { label: "Cross-Border Data", href: "/ledger?q=Cross-Border%20Data" },
  { label: "AI Governance", href: "/ledger?q=AI%20Governance" },
  { label: "Cybersecurity", href: "/ledger?q=Cybersecurity" },
  { label: "Data Localization", href: "/ledger?q=Data%20Localization" },
  { label: "Privacy Sovereignty", href: "/ledger?q=Privacy%20Sovereignty" },
  { label: "Source Code Audits", href: "/ledger?q=Source%20Code%20Audits" },
];

// ── Section 3: Editorial Grid ────────────────────────────────────────────────

export interface FrictionPoint {
  label: string;
  description: string;
}

export interface ExecutiveInsightsData {
  kebab: string;
  heading: string;
  bodyLeadChar: string;
  bodyPrefix: string;
  bodySuffix: string;
  frictionHeading: string;
  frictionPoints: FrictionPoint[];
  ctaLabel: string;
  ctaHref: string;
}

export const EXECUTIVE_INSIGHTS: ExecutiveInsightsData = {
  kebab: "01 \u2022 EXECUTIVE INSIGHTS",
  heading: "The Deregulatory Push Behind Closed-Door Trade Treaties",
  bodyLeadChar: "P",
  bodyPrefix: "rojected to expand Southeast Asia\u2019s digital economy to ",
  bodySuffix: ", the Digital Economy Framework Agreement (DEFA) governs nine core pillars. However, negotiations conducted exclusively behind closed doors leave regional civil society without democratic recourse.",
  frictionHeading: "Primary Friction Points:",
  frictionPoints: [
    {
      label: "Data Free Flow (DFFT):",
      description: "Tension between open transfer regimes (Singapore, Philippines) vs. mandatory localization (Vietnam Decree 53).",
    },
    {
      label: "Algorithmic Audit Bans:",
      description: "Big Tech lobbying seeking broad bans on mandatory source code disclosures.",
    },
  ],
  ctaLabel: "Read Complete Investigation Suite",
  ctaHref: "/investigations",
};

export interface FieldDispatch {
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  summary: string;
}

export const FIELD_DISPATCHES: FieldDispatch[] = [
  {
    imageSrc: "/images/vietnam_server.jpg",
    imageAlt: "Vietnam Cloud Data Center",
    category: "DATA LOCALIZATION",
    title: "Vietnam\u2019s Decree 53 & Foreign Cloud Mandates: The Local Storage Squeeze",
    summary: "How Ministry of Information notices mandate foreign tech platforms to store user data in Hanoi.",
  },
  {
    imageSrc: "/images/ai_audit.jpg",
    imageAlt: "AI Governance Code Audit",
    category: "AI GOVERNANCE",
    title: "Banning Algorithmic Audits: How Big Tech Lobbying Targets Treaties",
    summary: "Corporate trade lobbies advocate for broad treaty bans on mandatory source code disclosures.",
  },
];

export interface RegulatoryRadarEntry {
  jurisdiction: string;
  alertLevel: "High Alert" | "Rights Verified";
  title: string;
  date: string;
}

export const REGULATORY_RADAR: RegulatoryRadarEntry[] = [
  {
    jurisdiction: "ASEAN Regional",
    alertLevel: "High Alert",
    title: "SEOM 57 Manila DEFA Scrubbing",
    date: "July 15, 2026",
  },
  {
    jurisdiction: "Indonesia (ID)",
    alertLevel: "High Alert",
    title: "PDP Law Public Sector Server Storage",
    date: "July 08, 2026",
  },
  {
    jurisdiction: "Singapore (SG)",
    alertLevel: "Rights Verified",
    title: "IMDA ASEAN MCCs Guidelines",
    date: "June 28, 2026",
  },
];

// ── Section 4: Intelligence Suite ─────────────────────────────────────────────

export interface IntelligenceModule {
  number: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  accentColor: "asean-blue" | "asean-red" | "asean-yellow";
  hoverBorder: string;
  hoverText: string;
}

export const INTELLIGENCE_MODULES: IntelligenceModule[] = [
  {
    number: "01",
    title: "Cartographic Observatory",
    description: "Interactive 11-country SVG ASEAN map documenting legal data localization regimes and country dossiers.",
    href: "/observatory",
    ctaLabel: "Launch Map",
    accentColor: "asean-blue",
    hoverBorder: "hover:border-asean-blue",
    hoverText: "group-hover:text-asean-blue",
  },
  {
    number: "02",
    title: "Verified Policy Ledger",
    description: "Searchable database of ingested digital trade bills & decrees with 100% primary source verification.",
    href: "/ledger",
    ctaLabel: "Search Ledger",
    accentColor: "asean-blue",
    hoverBorder: "hover:border-asean-blue",
    hoverText: "group-hover:text-asean-blue",
  },
  {
    number: "03",
    title: "Rights Threat Matrix",
    description: "4-column structural risk assessment evaluating data sovereignty and algorithmic audit prohibitions.",
    href: "/threats",
    ctaLabel: "View Risk Matrix",
    accentColor: "asean-red",
    hoverBorder: "hover:border-asean-red",
    hoverText: "group-hover:text-asean-red",
  },
  {
    number: "04",
    title: "Submit Leaked Alert",
    description: "Encrypted intake portal for regional activists to submit leaked draft texts with anonymous protection.",
    href: "/intake",
    ctaLabel: "Submit Dossier",
    accentColor: "asean-yellow",
    hoverBorder: "hover:border-asean-yellow",
    hoverText: "group-hover:text-asean-yellow",
  },
];

// ── Section 5: Newsletter ─────────────────────────────────────────────────────

export interface NewsletterContent {
  kebab: string;
  heading: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  successMessage: string;
}

export const NEWSLETTER_CONTENT: NewsletterContent = {
  kebab: "WEEKLY POLICY PULSE DISPATCH",
  heading: "Receive Thursday Night Executive Policy Summaries",
  description: "Get concise, source-verified 3-minute digests covering ASEAN DEFA negotiations delivered straight to your inbox.",
  placeholder: "Enter work email address...",
  buttonLabel: "Subscribe Free",
  successMessage: "Subscribed to Weekly Policy Pulse Dispatch!",
};
