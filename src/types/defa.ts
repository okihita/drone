import { ASEANCountryCode } from "@/lib/countries";

/** 9 Official DEFA Negotiating Chapters */
export type DefaChapterId =
  | "ch1-trade-facilitation"
  | "ch2-data-governance"
  | "ch3-cybersecurity"
  | "ch4-digital-payments"
  | "ch5-ai-emerging-tech"
  | "ch6-competition-consumer"
  | "ch7-digital-id-trust"
  | "ch8-talent-mobility"
  | "ch9-msme-equity";

export interface DefaChapterInfo {
  id: DefaChapterId;
  code: string;
  name: string;
  shortName: string;
  description: string;
  seomPillar: string;
  tppComparison: string;
  civilSocietyRisk: "High Risk" | "Medium Risk" | "Low Risk";
}

export type DefaRatificationStatus =
  | "CONCLUDED"
  | "LEGAL_SCRUBBING"
  | "PROVISIONAL_RESERVATION"
  | "PENDING_CONSULTATION";

export interface DefaChapterMemberStateStatus {
  countryCode: ASEANCountryCode;
  chapterId: DefaChapterId;
  status: DefaRatificationStatus;
  progressPercent: number;
  gazetteCitation?: string;
  lastUpdated: string;
  notes?: string;
}

export type DataRegimeTier = "OPEN_TRANSFER" | "HYBRID_CONDITIONAL" | "STRICT_LOCALIZATION";

export interface DefaDataGovernanceState {
  countryCode: ASEANCountryCode;
  regimeTier: DataRegimeTier;
  primaryDataLaw: string;
  dataLocalizationMandate: string;
  mccAdoptionStatus: "Full Integration" | "Partial Alignment" | "Domestic Only";
  legalFrictionScore: number; // 0-100 (higher = more friction for cross-border data)
  surveillanceRisk: "High" | "Medium" | "Low";
}

export interface DefaAiEthicsState {
  countryCode: ASEANCountryCode;
  aseanAiGuideAlignment: "Full Adoption" | "Draft Framework" | "No Framework";
  aiTrainingCopyrightExemption: boolean;
  algorithmicRiskClassification: boolean;
  stateAuditRights: boolean;
  watermarkingMandated: boolean;
  mmaiHarmIncidentsCount: number;
  readinessScore: number; // 0-100
}

export interface DefaPaymentState {
  countryCode: ASEANCountryCode;
  nationalQrStandard: string;
  crossBorderRpcCorridors: string[]; // e.g. ["SG", "MY", "TH"]
  eInvoicingStandard: string;
  financialSurveillanceScore: number; // 0-100
  certBreachDisclosureHours: number; // e.g. 24, 72, 168
}

export interface DefaCivilSocietyState {
  countryCode: ASEANCountryCode;
  seomTransparencyIndex: number; // 0-100
  bigTechPressureScore: number; // 0-100
  digitalDivideGapScore: number; // 0-100
  overallReadinessIndex: number; // 0-100
}
