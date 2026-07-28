/** Canonical policy shape matching the Supabase `policies` table. */
export interface Policy {
  id: string;
  title: string;
  jurisdiction: string;            // e.g. "Indonesia (ID)"
  category: PolicyCategory;
  threat_level: ThreatLevel;
  date: string;                     // display date string, e.g. "July 15, 2026"
  summary: string;
  primary_source_url: string;
  source_authority: string;
  created_at?: string;
}

/** Narrowed view used by listing components that don't need the full payload. */
export type PolicyListItem = Pick<
  Policy,
  "id" | "title" | "jurisdiction" | "category" | "threat_level" | "date"
>;

/** Narrowed view for search-type components. */
export type PolicySearchItem = Pick<
  Policy,
  "id" | "title" | "jurisdiction" | "category" | "summary"
>;

/** Narrowed view for the regulatory radar widget. */
export type PolicyRadarEntry = Pick<
  Policy,
  "id" | "jurisdiction" | "title" | "threat_level" | "date"
>;

import type { POLICY_CATEGORIES, ThreatLevel } from "@/lib/constants";
export type { ThreatLevel };
export type PolicyCategory = (typeof POLICY_CATEGORIES)[number];
