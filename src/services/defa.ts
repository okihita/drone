import {
  DefaChapterInfo,
  DefaChapterMemberStateStatus,
  DefaDataGovernanceState,
  DefaAiEthicsState,
  DefaPaymentState,
  DefaCivilSocietyState,
} from "@/types/defa";
import { ASEAN_MEMBER_STATES, ASEANCountryCode } from "@/lib/countries";

/** 9 Official DEFA Negotiating Chapters */
export const DEFA_CHAPTERS: DefaChapterInfo[] = [
  {
    id: "ch1-trade-facilitation",
    code: "CH-01",
    name: "Digital Trade Facilitation & Paperless Customs",
    shortName: "Digital Trade",
    description: "Eliminating paper-based cross-border customs documentation, establishing single-window electronic trade clearance, and standardizing e-signatures across ASEAN ports.",
    seomPillar: "Trade Facilitation",
    tppComparison: "Aligns with CPTPP Article 14.9; enforces digital customs clearance without physical paper requirements.",
    civilSocietyRisk: "Low Risk",
  },
  {
    id: "ch2-data-governance",
    code: "CH-02",
    name: "Data Governance & Cross-Border Data Flows",
    shortName: "Data Flows (DFFT)",
    description: "Establishing Data Free Flow with Trust (DFFT), restricting mandatory domestic server localization, and harmonizing cross-border transfer mechanisms.",
    seomPillar: "Data Governance",
    tppComparison: "Combines DEPA Module 4 & CPTPP 14.11; highly contentious regarding domestic server localization exceptions for state security.",
    civilSocietyRisk: "High Risk",
  },
  {
    id: "ch3-cybersecurity",
    code: "CH-03",
    name: "Cybersecurity & Critical Information Infrastructure",
    shortName: "Cybersecurity & CII",
    description: "Regional threat intelligence sharing, mandatory CERT notification windows, and joint defense standards for Critical Information Infrastructure (CII).",
    seomPillar: "Regional Security",
    tppComparison: "Expands RCEP Chapter 12; introduces regional CERT-to-CERT incident response coordination.",
    civilSocietyRisk: "High Risk",
  },
  {
    id: "ch4-digital-payments",
    code: "CH-04",
    name: "Digital Payments & Invoicing Interoperability",
    shortName: "Digital Payments",
    description: "Integrating ASEAN Regional Payment Connectivity (RPC), linking national QR payment systems (QRIS, DuitNow, PayNow, PromptPay), and adopting Peppol e-invoicing.",
    seomPillar: "Financial Integration",
    tppComparison: "World-first regional QR interoperability binding mandate, surpassing USMCA and CPTPP payment clauses.",
    civilSocietyRisk: "Medium Risk",
  },
  {
    id: "ch5-ai-emerging-tech",
    code: "CH-05",
    name: "Artificial Intelligence & Emerging Technologies",
    shortName: "AI & Emerging Tech",
    description: "Standardizing safety baselines based on the ASEAN Guide on AI Ethics and Governance (2024), algorithmic transparency, and fair training data standards.",
    seomPillar: "Innovation & Tech",
    tppComparison: "Pioneering regional AI governance framework balancing innovation with safety, preceding EU AI Act bilateral accords.",
    civilSocietyRisk: "High Risk",
  },
  {
    id: "ch6-competition-consumer",
    code: "CH-06",
    name: "Digital Competition & Consumer Safeguards",
    shortName: "Digital Competition",
    description: "Preventing anti-competitive practices by foreign tech monopolies, banning dark patterns, and protecting online consumers against digital fraud.",
    seomPillar: "Market Integrity",
    tppComparison: "Adapts EU Digital Markets Act principles into regional digital trade rules.",
    civilSocietyRisk: "Medium Risk",
  },
  {
    id: "ch7-digital-id-trust",
    code: "CH-07",
    name: "Digital ID & Trust Services",
    shortName: "Digital ID & Trust",
    description: "Establishing mutual recognition of national digital identities (e.g. Singpass, digital KTP) and cross-border trust services for secure authentication.",
    seomPillar: "Identity & Trust",
    tppComparison: "Modeled after DEPA Module 3; creates seamless identity verification across ASEAN borders.",
    civilSocietyRisk: "Medium Risk",
  },
  {
    id: "ch8-talent-mobility",
    code: "CH-08",
    name: "Digital Talent & Human Capital Mobility",
    shortName: "Talent Mobility",
    description: "Facilitating cross-border remote work visas, mutual recognition of digital skill credentials, and regional tech workforce capacity building.",
    seomPillar: "Human Capital",
    tppComparison: "Expands ASEAN Agreement on Movement of Natural Persons to software engineers and tech specialists.",
    civilSocietyRisk: "Low Risk",
  },
  {
    id: "ch9-msme-equity",
    code: "CH-09",
    name: "MSME Digital Inclusion & Equity",
    shortName: "MSME Inclusion",
    description: "Targeted digital literacy programs, subsidized e-commerce access, and preferential customs thresholds for micro, small, and medium enterprises.",
    seomPillar: "Inclusive Growth",
    tppComparison: "Dedicated equity chapter ensuring small business participation in regional digital supply chains.",
    civilSocietyRisk: "Low Risk",
  },
];

/** Mock Ratification Telemetry for 11 ASEAN Member States across 9 Chapters */
export function getDefaChapterStatuses(): DefaChapterMemberStateStatus[] {
  const statuses: DefaChapterMemberStateStatus[] = [];

  const memberCodes: ASEANCountryCode[] = [
    "BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"
  ];

  memberCodes.forEach((code) => {
    DEFA_CHAPTERS.forEach((ch) => {
      let status: DefaChapterMemberStateStatus["status"] = "LEGAL_SCRUBBING";
      let progressPercent = 75;

      // Singapore, Malaysia, Philippines lead legal scrubbing
      if (code === "SG" || code === "MY" || code === "PH") {
        status = ch.id === "ch1-trade-facilitation" || ch.id === "ch4-digital-payments" ? "CONCLUDED" : "LEGAL_SCRUBBING";
        progressPercent = status === "CONCLUDED" ? 100 : 88;
      } else if (code === "ID" || code === "TH" || code === "VN") {
        status = ch.id === "ch2-data-governance" ? "PROVISIONAL_RESERVATION" : "LEGAL_SCRUBBING";
        progressPercent = status === "PROVISIONAL_RESERVATION" ? 65 : 80;
      } else if (code === "MM" || code === "LA" || code === "KH" || code === "TL" || code === "BN") {
        status = ch.id === "ch2-data-governance" || ch.id === "ch5-ai-emerging-tech" ? "PENDING_CONSULTATION" : "LEGAL_SCRUBBING";
        progressPercent = status === "PENDING_CONSULTATION" ? 45 : 60;
      }

      statuses.push({
        countryCode: code,
        chapterId: ch.id,
        status,
        progressPercent,
        gazetteCitation: `SEOM-DEFA/2026/LEG/${code}/${ch.code}`,
        lastUpdated: "2026-07-28",
        notes: `Legal scrubbing post-57th SEOM Manila meeting. Domestic consultation active in ${code}.`,
      });
    });
  });

  return statuses;
}

/** Data Governance & DFFT Telemetry Data */
export function getDefaDataGovernanceStates(): DefaDataGovernanceState[] {
  return [
    {
      countryCode: "SG",
      regimeTier: "OPEN_TRANSFER",
      primaryDataLaw: "Personal Data Protection Act (PDPA)",
      dataLocalizationMandate: "Prohibited by default; cross-border flow enabled",
      mccAdoptionStatus: "Full Integration",
      legalFrictionScore: 12,
      surveillanceRisk: "Low",
    },
    {
      countryCode: "PH",
      regimeTier: "OPEN_TRANSFER",
      primaryDataLaw: "Data Privacy Act (RA 10173)",
      dataLocalizationMandate: "No mandatory localization; transfer with consent",
      mccAdoptionStatus: "Full Integration",
      legalFrictionScore: 24,
      surveillanceRisk: "Medium",
    },
    {
      countryCode: "MY",
      regimeTier: "OPEN_TRANSFER",
      primaryDataLaw: "Personal Data Protection Act 2010 (PDPA Amendment 2024)",
      dataLocalizationMandate: "Open transfer with adequacy or contract safeguards",
      mccAdoptionStatus: "Full Integration",
      legalFrictionScore: 28,
      surveillanceRisk: "Low",
    },
    {
      countryCode: "ID",
      regimeTier: "HYBRID_CONDITIONAL",
      primaryDataLaw: "Law No. 27/2022 (PDP Law) & PP 71/2019",
      dataLocalizationMandate: "Public sector ESOs must store data domestically",
      mccAdoptionStatus: "Partial Alignment",
      legalFrictionScore: 58,
      surveillanceRisk: "Medium",
    },
    {
      countryCode: "TH",
      regimeTier: "HYBRID_CONDITIONAL",
      primaryDataLaw: "Personal Data Protection Act (PDPA B.E. 2562)",
      dataLocalizationMandate: "Conditional transfer requiring destination adequacy",
      mccAdoptionStatus: "Partial Alignment",
      legalFrictionScore: 52,
      surveillanceRisk: "Medium",
    },
    {
      countryCode: "VN",
      regimeTier: "STRICT_LOCALIZATION",
      primaryDataLaw: "Law on Cybersecurity (Decree 53/2022 & Decree 13/2023)",
      dataLocalizationMandate: "Mandatory domestic server & data storage for foreign tech",
      mccAdoptionStatus: "Domestic Only",
      legalFrictionScore: 88,
      surveillanceRisk: "High",
    },
    {
      countryCode: "MM",
      regimeTier: "STRICT_LOCALIZATION",
      primaryDataLaw: "Draft Cybersecurity Law (SAC Military Decree)",
      dataLocalizationMandate: "Strict local data storage and direct state access",
      mccAdoptionStatus: "Domestic Only",
      legalFrictionScore: 95,
      surveillanceRisk: "High",
    },
    {
      countryCode: "KH",
      regimeTier: "STRICT_LOCALIZATION",
      primaryDataLaw: "Sub-Decree on National Internet Gateway (NIG)",
      dataLocalizationMandate: "Traffic routing through state gateway; localized logs",
      mccAdoptionStatus: "Domestic Only",
      legalFrictionScore: 78,
      surveillanceRisk: "High",
    },
    {
      countryCode: "LA",
      regimeTier: "STRICT_LOCALIZATION",
      primaryDataLaw: "Law on Prevention and Combating of Cybercrime",
      dataLocalizationMandate: "Mandatory local server storage for telecom operators",
      mccAdoptionStatus: "Domestic Only",
      legalFrictionScore: 72,
      surveillanceRisk: "Medium",
    },
    {
      countryCode: "BN",
      regimeTier: "HYBRID_CONDITIONAL",
      primaryDataLaw: "Personal Data Protection Order (PDPO)",
      dataLocalizationMandate: "Government data localization with commercial exemptions",
      mccAdoptionStatus: "Partial Alignment",
      legalFrictionScore: 46,
      surveillanceRisk: "Low",
    },
    {
      countryCode: "TL",
      regimeTier: "HYBRID_CONDITIONAL",
      primaryDataLaw: "Draft National ICT Framework 2026",
      dataLocalizationMandate: "Provisional data management rules pending DEFA accession",
      mccAdoptionStatus: "Domestic Only",
      legalFrictionScore: 62,
      surveillanceRisk: "Low",
    },
  ];
}

/** AI Ethics & Governance Alignment Data */
export function getDefaAiEthicsStates(): DefaAiEthicsState[] {
  return [
    { countryCode: "SG", aseanAiGuideAlignment: "Full Adoption", aiTrainingCopyrightExemption: true, algorithmicRiskClassification: true, stateAuditRights: true, watermarkingMandated: true, mmaiHarmIncidentsCount: 4, readinessScore: 96 },
    { countryCode: "MY", aseanAiGuideAlignment: "Full Adoption", aiTrainingCopyrightExemption: true, algorithmicRiskClassification: true, stateAuditRights: false, watermarkingMandated: true, mmaiHarmIncidentsCount: 7, readinessScore: 84 },
    { countryCode: "ID", aseanAiGuideAlignment: "Full Adoption", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: true, stateAuditRights: true, watermarkingMandated: false, mmaiHarmIncidentsCount: 19, readinessScore: 76 },
    { countryCode: "TH", aseanAiGuideAlignment: "Full Adoption", aiTrainingCopyrightExemption: true, algorithmicRiskClassification: true, stateAuditRights: false, watermarkingMandated: false, mmaiHarmIncidentsCount: 11, readinessScore: 74 },
    { countryCode: "PH", aseanAiGuideAlignment: "Full Adoption", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: true, stateAuditRights: false, watermarkingMandated: true, mmaiHarmIncidentsCount: 14, readinessScore: 78 },
    { countryCode: "VN", aseanAiGuideAlignment: "Draft Framework", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: true, stateAuditRights: true, watermarkingMandated: true, mmaiHarmIncidentsCount: 28, readinessScore: 62 },
    { countryCode: "BN", aseanAiGuideAlignment: "Draft Framework", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: false, stateAuditRights: false, watermarkingMandated: false, mmaiHarmIncidentsCount: 2, readinessScore: 68 },
    { countryCode: "KH", aseanAiGuideAlignment: "Draft Framework", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: false, stateAuditRights: true, watermarkingMandated: false, mmaiHarmIncidentsCount: 9, readinessScore: 48 },
    { countryCode: "LA", aseanAiGuideAlignment: "Draft Framework", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: false, stateAuditRights: false, watermarkingMandated: false, mmaiHarmIncidentsCount: 5, readinessScore: 42 },
    { countryCode: "MM", aseanAiGuideAlignment: "No Framework", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: false, stateAuditRights: true, watermarkingMandated: true, mmaiHarmIncidentsCount: 36, readinessScore: 28 },
    { countryCode: "TL", aseanAiGuideAlignment: "Draft Framework", aiTrainingCopyrightExemption: false, algorithmicRiskClassification: false, stateAuditRights: false, watermarkingMandated: false, mmaiHarmIncidentsCount: 1, readinessScore: 35 },
  ];
}

/** Regional Payments & Cyber Defense Data */
export function getDefaPaymentStates(): DefaPaymentState[] {
  return [
    { countryCode: "SG", nationalQrStandard: "SGQR / PayNow", crossBorderRpcCorridors: ["MY", "TH", "ID", "PH", "VN"], eInvoicingStandard: "Peppol International", financialSurveillanceScore: 22, certBreachDisclosureHours: 72 },
    { countryCode: "MY", nationalQrStandard: "DuitNow QR", crossBorderRpcCorridors: ["SG", "TH", "ID", "PH"], eInvoicingStandard: "Peppol / MyInvois", financialSurveillanceScore: 30, certBreachDisclosureHours: 24 },
    { countryCode: "ID", nationalQrStandard: "QRIS", crossBorderRpcCorridors: ["SG", "MY", "TH", "PH"], eInvoicingStandard: "e-Faktur National", financialSurveillanceScore: 48, certBreachDisclosureHours: 72 },
    { countryCode: "TH", nationalQrStandard: "PromptPay", crossBorderRpcCorridors: ["SG", "MY", "ID", "VN", "KH"], eInvoicingStandard: "e-Tax Invoice", financialSurveillanceScore: 40, certBreachDisclosureHours: 72 },
    { countryCode: "PH", nationalQrStandard: "QR Ph", crossBorderRpcCorridors: ["SG", "MY", "ID"], eInvoicingStandard: "EIS System", financialSurveillanceScore: 34, certBreachDisclosureHours: 72 },
    { countryCode: "VN", nationalQrStandard: "VietQR / Netcode", crossBorderRpcCorridors: ["TH", "SG"], eInvoicingStandard: "General Dept Taxation", financialSurveillanceScore: 78, certBreachDisclosureHours: 24 },
    { countryCode: "BN", nationalQrStandard: "NBDRA QR", crossBorderRpcCorridors: ["MY", "SG"], eInvoicingStandard: "Treasury Invoicing", financialSurveillanceScore: 28, certBreachDisclosureHours: 72 },
    { countryCode: "KH", nationalQrStandard: "Bakong QR", crossBorderRpcCorridors: ["TH", "VN"], eInvoicingStandard: "GDT E-System", financialSurveillanceScore: 65, certBreachDisclosureHours: 48 },
    { countryCode: "LA", nationalQrStandard: "LaoQR", crossBorderRpcCorridors: ["TH", "VN"], eInvoicingStandard: "TaxDept Invoicing", financialSurveillanceScore: 58, certBreachDisclosureHours: 72 },
    { countryCode: "MM", nationalQrStandard: "MMQR", crossBorderRpcCorridors: [], eInvoicingStandard: "Manual / Central Bank", financialSurveillanceScore: 92, certBreachDisclosureHours: 12 },
    { countryCode: "TL", nationalQrStandard: "PNTL QR", crossBorderRpcCorridors: ["ID"], eInvoicingStandard: "Draft Customs Invoicing", financialSurveillanceScore: 35, certBreachDisclosureHours: 168 },
  ];
}

/** Civil Society Threat Matrix & Readiness Data */
export function getDefaCivilSocietyStates(): DefaCivilSocietyState[] {
  return [
    { countryCode: "SG", seomTransparencyIndex: 45, bigTechPressureScore: 82, digitalDivideGapScore: 12, overallReadinessIndex: 94 },
    { countryCode: "MY", seomTransparencyIndex: 58, bigTechPressureScore: 74, digitalDivideGapScore: 24, overallReadinessIndex: 82 },
    { countryCode: "ID", seomTransparencyIndex: 52, bigTechPressureScore: 78, digitalDivideGapScore: 42, overallReadinessIndex: 76 },
    { countryCode: "TH", seomTransparencyIndex: 48, bigTechPressureScore: 70, digitalDivideGapScore: 36, overallReadinessIndex: 74 },
    { countryCode: "PH", seomTransparencyIndex: 62, bigTechPressureScore: 72, digitalDivideGapScore: 44, overallReadinessIndex: 72 },
    { countryCode: "VN", seomTransparencyIndex: 25, bigTechPressureScore: 65, digitalDivideGapScore: 48, overallReadinessIndex: 64 },
    { countryCode: "BN", seomTransparencyIndex: 40, bigTechPressureScore: 45, digitalDivideGapScore: 28, overallReadinessIndex: 68 },
    { countryCode: "KH", seomTransparencyIndex: 30, bigTechPressureScore: 50, digitalDivideGapScore: 68, overallReadinessIndex: 46 },
    { countryCode: "LA", seomTransparencyIndex: 28, bigTechPressureScore: 42, digitalDivideGapScore: 72, overallReadinessIndex: 40 },
    { countryCode: "MM", seomTransparencyIndex: 10, bigTechPressureScore: 30, digitalDivideGapScore: 88, overallReadinessIndex: 24 },
    { countryCode: "TL", seomTransparencyIndex: 50, bigTechPressureScore: 25, digitalDivideGapScore: 76, overallReadinessIndex: 34 },
  ];
}
