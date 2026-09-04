// ── Section 3: Editorial Grid ────────────────────────────────────────────────

interface FrictionPoint {
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
  ctaHref: "/accountability/investigations",
};

