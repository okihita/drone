import type { REGIME_TYPES } from "@/lib/constants";

export type RegimeType = (typeof REGIME_TYPES)[number];

/** Canonical jurisdiction shape matching the Supabase `jurisdictions` table. */
export interface Jurisdiction {
  id: string;
  code: string;
  name: string;
  capital: string;
  regime_type: RegimeType;
  activity_level: string;
  threat_score: number;
  active_policies_count: number;
  data_flow_policy: string;
  key_legislation: string;
  description: string;
  primary_link: string;
  created_at?: string;
}

/** Narrowed view for dashboard / inline lists. */
export type JurisdictionSummary = Pick<
  Jurisdiction,
  "id" | "code" | "name" | "regime_type" | "threat_score"
>;
