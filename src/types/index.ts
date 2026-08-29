// ==============================================================================
// DRONE — Universal Domain Types Barrel Export
// Import all domain models directly from "@/types"
// ==============================================================================

// ── Policies & Regulatory Tracker ─────────────────────────────────────────────
export type {
  Policy,
  PolicyListItem,
  PolicyRadarEntry,
  PolicyCategory,
  ThreatLevel,
} from "./policy";

// ── Jurisdictions & Regime Classifications ────────────────────────────────────
export type {
  Jurisdiction,
  JurisdictionSummary,
  RegimeType,
} from "./jurisdiction";

// ── Investigations & News ─────────────────────────────────────────────────────
export type {
  NewsItem,
  NewsListItem,
  NewsCardItem,
  NewsDispatchItem,
} from "./news";

// ── Curated Resources & Primary Dossiers ──────────────────────────────────────
export type {
  CuratedLinkItem,
  CuratedLinkCategory,
  CuratedLinkJurisdiction,
} from "./links";

// ── Digital 2 Dozen Compliance Benchmark ──────────────────────────────────────
export type {
  BenchmarkPrinciple,
  BenchmarkScore,
  BenchmarkCountrySummary,
} from "./benchmark";

// ── ASEAN DEFA Treaty Suite ───────────────────────────────────────────────────
export type {
  DefaChapterId,
  DefaChapterInfo,
  DefaRatificationStatus,
  DefaChapterMemberStateStatus,
  DataRegimeTier,
  DefaDataGovernanceState,
} from "./defa";

// ── Consumer Protection & Intermediary Liability ──────────────────────────────
export type {
  ConsumerProtectionPolicy,
} from "./consumer_protection";

// ── Encryption & Intercept Monitoring ─────────────────────────────────────────
export type {
  EncryptionEventType,
  EncryptionEvent,
} from "./encryption";

// ── Digital Trade Negotiations & Milestones ───────────────────────────────────
export type {
  NegotiationFramework,
  NegotiationMilestone,
} from "./negotiation";
