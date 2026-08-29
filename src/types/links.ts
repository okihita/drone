import type { ASEANCountryCode } from "@/lib/countries";

/** Extensible categories with autocomplete for canonical trade & policy domains */
export type CuratedLinkCategory =
  | "Trade & Tariffs"
  | "DEFA & Treaties"
  | "Data Governance"
  | "AI & Labor"
  | "Tech Sovereignty"
  | (string & {});

/** Extensible jurisdictions supporting all 11 ASEAN member states, regional bodies, and global */
export type CuratedLinkJurisdiction =
  | ASEANCountryCode
  | "ASEAN"
  | "US"
  | "Global"
  | (string & {});

export interface CuratedLinkItem {
  id: string;
  url: string;
  title: string;
  publisher: string;
  domain: string;
  category: CuratedLinkCategory;
  jurisdiction: CuratedLinkJurisdiction;
  publishedDate?: string;
  excerpt: string;
  isPdf?: boolean;
  ogImage?: string;
}
