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

// ── Section 4: Intelligence Suite ─────────────────────────────────────────────

export interface IntelligenceModule {
  number: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
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
    hoverBorder: "hover:border-asean-blue",
    hoverText: "group-hover:text-asean-blue",
  },
  {
    number: "02",
    title: "Verified Policy Ledger",
    description: "Searchable database of ingested digital trade bills & decrees with 100% primary source verification.",
    href: "/ledger",
    ctaLabel: "Search Ledger",
    hoverBorder: "hover:border-asean-blue",
    hoverText: "group-hover:text-asean-blue",
  },
  {
    number: "03",
    title: "Rights Threat Matrix",
    description: "4-column structural risk assessment evaluating data sovereignty and algorithmic audit prohibitions.",
    href: "/observatory",
    ctaLabel: "View Risk Matrix",
    hoverBorder: "hover:border-asean-red",
    hoverText: "group-hover:text-asean-red",
  },
  {
    number: "04",
    title: "Submit Leaked Alert",
    description: "Encrypted intake portal for regional activists to submit leaked draft texts with anonymous protection.",
    href: "/intake",
    ctaLabel: "Submit Dossier",
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
