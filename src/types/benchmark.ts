/** Digital 2 Dozen principle definition with TPP source citations. */
export interface BenchmarkPrinciple {
  id: number; // 1-24
  title: string;
  shortTitle: string;
  cluster: "infrastructure" | "data_governance" | "tech_sovereignty" | "consumer_trust" | "ip_standards";
  tppSource: string; // e.g. "Ch. 14, Art. 10"
  description: string;
  /** Brief text from the TPP provision. */
  provisionText: string;
}

/** Per-country, per-principle compliance score. */
export interface BenchmarkScore {
  countryCode: string; // ISO 2-letter
  principleId: number; // 1-24
  score: number; // 0-100
  /** Assessment rationale — what laws/practices justify this score. */
  evidence: string;
  sourceUrl: string;
  lastReviewed: string; // ISO date
}

/** Aggregate cluster score for a country. */
interface BenchmarkClusterSummary {
  clusterId: string;
  clusterLabel: string;
  averageScore: number;
  principleCount: number;
  color: string;
}

/** Full benchmark summary for one country. */
export interface BenchmarkCountrySummary {
  countryCode: string;
  countryName: string;
  tradeAgreementStatus?: string;
  overallScore: number; // average of all 24 principles
  clusters: BenchmarkClusterSummary[];
  scores: BenchmarkScore[];
}
