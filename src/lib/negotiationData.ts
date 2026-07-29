import type { NegotiationMilestone } from "@/types/negotiation";

/**
 * Digital trade negotiation milestones for ASEAN-related frameworks.
 * Sources: Wikipedia CPTPP, ASEAN Secretariat, MTI Singapore, DEPA joint committee.
 * Last reviewed: 2026-07-29
 */
export const NEGOTIATION_MILESTONES: NegotiationMilestone[] = [
  // ── DEFA ──────────────────────────────────────────────────────
  {
    id: "defa-001", framework: "DEFA",
    title: "ASEAN Digital Economy Framework Agreement (DEFA) Launch",
    description: "ASEAN Economic Ministers endorse the launch of DEFA negotiations, aiming to establish a comprehensive digital economy framework for the region by 2025.",
    milestoneDate: "2023-09-03", status: "COMPLETED",
    countries: ["SG", "MY", "ID", "TH", "PH", "VN", "BN", "KH", "LA", "MM"],
    sourceUrl: "https://asean.org",
  },
  {
    id: "defa-002", framework: "DEFA",
    title: "First DEFA Negotiation Round",
    description: "First formal round of DEFA text-based negotiations covering cross-border data flows, digital trade facilitation, and e-payments.",
    milestoneDate: "2024-01-15", endDate: "2024-01-19", status: "COMPLETED",
    countries: ["SG", "MY", "ID", "TH", "PH", "VN", "BN", "KH", "LA", "MM"],
    sourceUrl: "https://asean.org",
  },
  {
    id: "defa-003", framework: "DEFA",
    title: "57th SEOM DEFA Conclusion (Manila)",
    description: "Senior Economic Officials Meeting concludes key DEFA negotiation chapters in Manila. Philippines hosts milestone meeting advancing data flows and digital payments pillars.",
    milestoneDate: "2026-05-20", status: "COMPLETED",
    countries: ["PH"],
    sourceUrl: "https://www.dti.gov.ph",
  },
  {
    id: "defa-004", framework: "DEFA",
    title: "DEFA Legal Scrubbing & Finalization",
    description: "Final legal review and text scrubbing of agreed DEFA chapters ahead of expected signing by ASEAN Leaders.",
    milestoneDate: "2027-01-15", endDate: "2027-06-30", status: "UPCOMING",
    countries: ["SG", "MY", "ID", "TH", "PH", "VN", "BN", "KH", "LA", "MM"],
    sourceUrl: "https://asean.org",
  },
  {
    id: "defa-005", framework: "DEFA",
    title: "Expected DEFA Signing Ceremony",
    description: "Anticipated signing of the Digital Economy Framework Agreement by ASEAN Leaders at the ASEAN Summit.",
    milestoneDate: "2027-09-01", status: "UPCOMING",
    countries: ["SG", "MY", "ID", "TH", "PH", "VN", "BN", "KH", "LA", "MM"],
    sourceUrl: "https://asean.org",
  },
  {
    id: "defa-006", framework: "DEFA",
    title: "DEFA Ratification Window (National Processes)",
    description: "Individual ASEAN member states initiate domestic ratification processes for DEFA. Expected staggered entry into force.",
    milestoneDate: "2027-10-01", endDate: "2029-06-30", status: "UPCOMING",
    countries: ["SG", "MY", "ID", "TH", "PH", "VN", "BN", "KH", "LA", "MM"],
    sourceUrl: "https://asean.org",
  },

  // ── CPTPP ─────────────────────────────────────────────────────
  {
    id: "cptpp-001", framework: "CPTPP",
    title: "CPTPP Signed (Santiago, Chile)",
    description: "11 countries sign the Comprehensive and Progressive Agreement for Trans-Pacific Partnership. ASEAN signatories: Brunei, Malaysia, Singapore, Vietnam.",
    milestoneDate: "2018-03-08", status: "COMPLETED",
    countries: ["SG", "MY", "VN", "BN"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-002", framework: "CPTPP",
    title: "CPTPP Entry Into Force (First 6 Ratifiers)",
    description: "Agreement enters into force for Australia, Canada, Japan, Mexico, New Zealand, Singapore. ASEAN member Singapore among initial parties.",
    milestoneDate: "2018-12-30", status: "COMPLETED",
    countries: ["SG"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-003", framework: "CPTPP",
    title: "Vietnam CPTPP Ratification & Entry Into Force",
    description: "Vietnam deposits ratification instrument. CPTPP enters into force for Vietnam, extending digital trade chapter obligations.",
    milestoneDate: "2019-01-14", status: "COMPLETED",
    countries: ["VN"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-004", framework: "CPTPP",
    title: "Malaysia CPTPP Ratification",
    description: "Malaysia cabinet approves and deposits CPTPP ratification instrument. Major ASEAN economy joins comprehensive digital trade framework.",
    milestoneDate: "2022-11-29", status: "COMPLETED",
    countries: ["MY"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-005", framework: "CPTPP",
    title: "Brunei CPTPP Ratification",
    description: "Brunei Darussalam deposits CPTPP ratification, becoming the final original ASEAN signatory to bring the agreement into force domestically.",
    milestoneDate: "2023-07-12", status: "COMPLETED",
    countries: ["BN"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-006", framework: "CPTPP",
    title: "UK CPTPP Accession",
    description: "United Kingdom becomes first non-original signatory to accede to CPTPP. Expands digital trade provisions to European market access.",
    milestoneDate: "2024-12-15", status: "COMPLETED",
    countries: ["GB"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-007", framework: "CPTPP",
    title: "Thailand CPTPP Accession Consideration",
    description: "Thailand formally initiates internal assessment and stakeholder consultations for potential CPTPP accession. Cabinet review ongoing.",
    milestoneDate: "2025-03-01", status: "IN_PROGRESS",
    countries: ["TH"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-008", framework: "CPTPP",
    title: "Indonesia CPTPP Accession Application",
    description: "Indonesia formally applies for CPTPP membership. Domestic economic reform packages align with CPTPP requirements including digital trade chapter.",
    milestoneDate: "2025-06-15", status: "IN_PROGRESS",
    countries: ["ID"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },
  {
    id: "cptpp-009", framework: "CPTPP",
    title: "Philippines CPTPP Accession Interest",
    description: "Philippines formally expresses interest in CPTPP accession. Initial working-level discussions with CPTPP Commission members commence.",
    milestoneDate: "2026-04-10", status: "IN_PROGRESS",
    countries: ["PH"],
    sourceUrl: "https://en.wikipedia.org/wiki/CPTPP",
  },

  // ── DEPA ──────────────────────────────────────────────────────
  {
    id: "depa-001", framework: "DEPA",
    title: "DEPA Signed (Virtual Ceremony)",
    description: "Chile, New Zealand, and Singapore sign the Digital Economy Partnership Agreement — a modular digital trade framework emphasizing interoperability.",
    milestoneDate: "2020-06-12", status: "COMPLETED",
    countries: ["SG"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "depa-002", framework: "DEPA",
    title: "DEPA Entry Into Force",
    description: "DEPA enters into force for founding parties Chile, New Zealand, and Singapore. Establishes digital trade standards for AI, data flows, and digital identity.",
    milestoneDate: "2021-01-07", status: "COMPLETED",
    countries: ["SG"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "depa-003", framework: "DEPA",
    title: "South Korea DEPA Accession",
    description: "Republic of Korea becomes fourth DEPA member. First expansion of the agreement demonstrates modular framework success.",
    milestoneDate: "2024-05-03", status: "COMPLETED",
    countries: ["KR"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "depa-004", framework: "DEPA",
    title: "China DEPA Accession Working Group",
    description: "DEPA Joint Committee establishes accession working group for China. Negotiations ongoing on digital trade alignment.",
    milestoneDate: "2022-08-18", status: "IN_PROGRESS",
    countries: ["CN"],
    sourceUrl: "https://www.mti.gov.sg",
  },

  // ── Bilateral DEAs ────────────────────────────────────────────
  {
    id: "bil-001", framework: "BILATERAL",
    title: "Singapore-Australia Digital Economy Agreement",
    description: "First bilateral DEA in the region. Covers digital trade facilitation, data flows, AI governance cooperation, and digital identity interoperability.",
    milestoneDate: "2020-12-08", status: "COMPLETED",
    countries: ["SG", "AU"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "bil-002", framework: "BILATERAL",
    title: "Singapore-UK Digital Economy Agreement",
    description: "Comprehensive DEA covering digital trade, data flows, cybersecurity cooperation, and fintech regulatory coordination with first European partner.",
    milestoneDate: "2022-06-14", status: "COMPLETED",
    countries: ["SG", "GB"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "bil-003", framework: "BILATERAL",
    title: "Singapore-Korea Digital Partnership Agreement",
    description: "Bilateral DPA building on Korea-Singapore FTA. Adds digital trade chapter provisions on data flows, AI ethics, and e-payments interoperability.",
    milestoneDate: "2023-11-21", status: "COMPLETED",
    countries: ["SG", "KR"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "bil-004", framework: "BILATERAL",
    title: "Singapore-EU Digital Trade Agreement (Negotiations)",
    description: "Singapore and EU launch negotiations for a standalone Digital Trade Agreement covering data flows, trusted government access provisions, and paperless trading.",
    milestoneDate: "2024-06-01", status: "IN_PROGRESS",
    countries: ["SG", "EU"],
    sourceUrl: "https://www.mti.gov.sg",
  },
  {
    id: "bil-005", framework: "BILATERAL",
    title: "Malaysia-Singapore QR Payment Corridor (DuitNow-PayNow)",
    description: "Bank Negara Malaysia and MAS launch real-time cross-border QR payment linkage under ASEAN DEFA Article 7 provisions.",
    milestoneDate: "2026-07-20", status: "COMPLETED",
    countries: ["MY", "SG"],
    sourceUrl: "https://www.bnm.gov.my",
  },

  // ── IPEF ──────────────────────────────────────────────────────
  {
    id: "ipef-001", framework: "IPEF",
    title: "IPEF Launch (Tokyo)",
    description: "US-led Indo-Pacific Economic Framework launched. ASEAN participants: Brunei, Indonesia, Malaysia, Philippines, Singapore, Thailand, Vietnam. Digital economy pillar included.",
    milestoneDate: "2022-05-23", status: "COMPLETED",
    countries: ["BN", "ID", "MY", "PH", "SG", "TH", "VN"],
    sourceUrl: "https://www.commerce.gov/ipef",
  },
  {
    id: "ipef-002", framework: "IPEF",
    title: "IPEF Digital Economy Agreement Substantial Conclusion",
    description: "IPEF partners reach substantial conclusion on digital economy pillar covering data flows, AI governance, and online consumer protections.",
    milestoneDate: "2024-11-15", status: "COMPLETED",
    countries: ["BN", "ID", "MY", "PH", "SG", "TH", "VN"],
    sourceUrl: "https://www.commerce.gov/ipef",
  },
];

/** Get all negotiation milestones, optionally filtered by framework. */
export function getNegotiationMilestones(framework?: string): NegotiationMilestone[] {
  let milestones = NEGOTIATION_MILESTONES;
  if (framework && framework !== "ALL") {
    milestones = milestones.filter((m) => m.framework === framework);
  }
  return milestones.sort((a, b) => a.milestoneDate.localeCompare(b.milestoneDate));
}

/** Group milestones by framework. */
export function getNegotiationsByFramework(): Record<string, NegotiationMilestone[]> {
  const grouped: Record<string, NegotiationMilestone[]> = {};
  for (const m of NEGOTIATION_MILESTONES) {
    if (!grouped[m.framework]) grouped[m.framework] = [];
    grouped[m.framework].push(m);
  }
  return grouped;
}
