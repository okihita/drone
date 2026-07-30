import type { EncryptionEvent } from "@/types/encryption";

/**
 * Encryption regulation events across ASEAN.
 * Sources: AccessNow #KeepItOn, national legislation databases, Freedom House.
 * Last reviewed: 2026-07-29
 */
const ENCRYPTION_EVENTS: EncryptionEvent[] = [
  // ── Myanmar ──
  {
    id: "enc-mm-001",
    countryCode: "MM", countryName: "Myanmar",
    eventType: "VPN_BAN",
    title: "Draft Cybersecurity Law Criminalizes VPN Usage",
    summary: "Military junta proposes amendments mandating ISP packet inspection and criminalizing VPN usage without prior military administrative clearance. Penalties include imprisonment.",
    sourceUrl: "https://www.accessnow.org",
    eventDate: "2024-03-15",
    severityScore: 95,
  },
  {
    id: "enc-mm-002",
    countryCode: "MM", countryName: "Myanmar",
    eventType: "INTERCEPT_EXPANSION",
    title: "Warrantless Access to Telecommunication Logs Mandated",
    summary: "Draft law grants military authorities unrestricted warrantless access to all telecommunication logs and user data.",
    sourceUrl: "https://www.motc.gov.mm",
    eventDate: "2024-02-20",
    severityScore: 98,
  },
  {
    id: "enc-mm-003",
    countryCode: "MM", countryName: "Myanmar",
    eventType: "BACKDOOR_MANDATE",
    title: "ISP Packet Inspection Infrastructure Deployed",
    summary: "State-owned MPT has deployed deep packet inspection equipment from Chinese vendors enabling real-time traffic monitoring and interception.",
    sourceUrl: "https://www.accessnow.org",
    eventDate: "2023-06-10",
    severityScore: 90,
  },

  // ── Vietnam ──
  {
    id: "enc-vn-001",
    countryCode: "VN", countryName: "Vietnam",
    eventType: "KEY_ESCROW",
    title: "Decree 53 Mandates Data Access for Authorities",
    summary: "Decree 53/2022/ND-CP requires foreign tech firms to store user data locally and provide access to authorities upon request, effectively mandating key escrow for law enforcement access.",
    sourceUrl: "https://vanban.chinhphu.vn",
    eventDate: "2022-10-01",
    severityScore: 80,
  },
  {
    id: "enc-vn-002",
    countryCode: "VN", countryName: "Vietnam",
    eventType: "BACKDOOR_MANDATE",
    title: "Cybersecurity Law Requires Decryption Capability",
    summary: "Law No. 24/2018/QH14 requires telecommunications and internet service providers to provide decryption capabilities to competent state agencies when requested.",
    sourceUrl: "https://vanban.chinhphu.vn",
    eventDate: "2019-01-01",
    severityScore: 85,
  },
  {
    id: "enc-vn-003",
    countryCode: "VN", countryName: "Vietnam",
    eventType: "E2EE_RESTRICTION",
    title: "Draft AI Law Proposes Algorithmic Audit Mandates",
    summary: "Proposed AI governance framework would require foreign AI and encryption service providers to submit algorithms for government review and audit, potentially weakening end-to-end encryption implementations.",
    sourceUrl: "https://mic.gov.vn",
    eventDate: "2025-11-28",
    severityScore: 75,
  },

  // ── Indonesia ──
  {
    id: "enc-id-001",
    countryCode: "ID", countryName: "Indonesia",
    eventType: "INTERCEPT_EXPANSION",
    title: "MR5 Mandates 24-Hour Content Removal and Access",
    summary: "Ministerial Regulation 5 requires private electronic system operators to provide access to systems and data within 24 hours for emergency compliance requests from Kominfo.",
    sourceUrl: "https://www.kominfo.go.id",
    eventDate: "2024-05-15",
    severityScore: 65,
  },
  {
    id: "enc-id-002",
    countryCode: "ID", countryName: "Indonesia",
    eventType: "BACKDOOR_MANDATE",
    title: "BSSN National Cryptography Standards Push",
    summary: "National Cyber and Crypto Agency (BSSN) promotes mandatory use of national cryptographic standards (SNI cryptography) for government systems, raising concerns about potential backdoor requirements.",
    sourceUrl: "https://www.bssn.go.id",
    eventDate: "2023-11-10",
    severityScore: 50,
  },

  // ── Cambodia ──
  {
    id: "enc-kh-001",
    countryCode: "KH", countryName: "Cambodia",
    eventType: "INTERCEPT_EXPANSION",
    title: "National Internet Gateway Enables Centralized Monitoring",
    summary: "NIG sub-decree routes all international internet traffic through state-controlled gateway, enabling centralized monitoring and potential interception of all cross-border communications.",
    sourceUrl: "https://www.mptc.gov.kh",
    eventDate: "2022-02-16",
    severityScore: 75,
  },

  // ── Thailand ──
  {
    id: "enc-th-001",
    countryCode: "TH", countryName: "Thailand",
    eventType: "INTERCEPT_EXPANSION",
    title: "Computer Crime Act Amendments Expand Surveillance Powers",
    summary: "Amendments to Computer Crime Act expand authorities' power to compel ISPs to provide user data and traffic logs without judicial warrant in 'emergency' situations.",
    sourceUrl: "https://www.etda.or.th",
    eventDate: "2023-08-30",
    severityScore: 60,
  },

  // ── Philippines ──
  {
    id: "enc-ph-001",
    countryCode: "PH", countryName: "Philippines",
    eventType: "CAPACITY_BUILDING",
    title: "CICC Partners with Interpol on Cybercrime Capacity Building",
    summary: "Cybercrime Investigation and Coordinating Center partners with Interpol to enhance cyber forensics and encryption analysis capabilities for law enforcement.",
    sourceUrl: "https://www.dict.gov.ph",
    eventDate: "2025-02-14",
    severityScore: 25,
  },

  // ── Singapore ──
  {
    id: "enc-sg-001",
    countryCode: "SG", countryName: "Singapore",
    eventType: "CAPACITY_BUILDING",
    title: "ASEAN-Singapore Cybersecurity Centre of Excellence Launched",
    summary: "Singapore commits S$30M to establish ASEAN cybersecurity capacity building centre, providing training on encryption standards, threat intelligence sharing, and incident response.",
    sourceUrl: "https://www.csa.gov.sg",
    eventDate: "2024-10-01",
    severityScore: 5,
  },

  // ── Malaysia ──
  {
    id: "enc-my-001",
    countryCode: "MY", countryName: "Malaysia",
    eventType: "CAPACITY_BUILDING",
    title: "NACSA Launches National Encryption Standards Framework",
    summary: "National Cyber Security Agency publishes voluntary encryption standards for critical infrastructure sectors, emphasizing AES-256 and post-quantum readiness without backdoor requirements.",
    sourceUrl: "https://www.nacsa.gov.my",
    eventDate: "2025-06-15",
    severityScore: 10,
  },
];

/** Get encryption events, optionally filtered by country and event type. */
export function getEncryptionEvents(countryCode?: string, eventType?: string): EncryptionEvent[] {
  let events = ENCRYPTION_EVENTS;
  if (countryCode) events = events.filter((e) => e.countryCode === countryCode);
  if (eventType) events = events.filter((e) => e.eventType === eventType);
  return events.sort((a, b) => b.eventDate.localeCompare(a.eventDate));
}

/** Get summary stats by country. */
export function getEncryptionSummary() {
  const byCountry: Record<string, { countryName: string; totalEvents: number; avgSeverity: number; worstEvent: string }> = {};
  for (const e of ENCRYPTION_EVENTS) {
    if (!byCountry[e.countryCode]) {
      byCountry[e.countryCode] = { countryName: e.countryName, totalEvents: 0, avgSeverity: 0, worstEvent: "" };
    }
    byCountry[e.countryCode].totalEvents++;
    byCountry[e.countryCode].avgSeverity += e.severityScore;
    if (e.severityScore > (ENCRYPTION_EVENTS.find((x) => x.title === byCountry[e.countryCode].worstEvent)?.severityScore ?? 0)) {
      byCountry[e.countryCode].worstEvent = e.title;
    }
  }
  for (const key of Object.keys(byCountry)) {
    byCountry[key].avgSeverity = Math.round(byCountry[key].avgSeverity / byCountry[key].totalEvents);
  }
  return byCountry;
}
