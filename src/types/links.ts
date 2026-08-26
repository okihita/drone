export type CuratedLinkCategory =
  | "Trade & Tariffs"
  | "DEFA & Treaties"
  | "Data Governance"
  | "AI & Labor"
  | "Tech Sovereignty";

export type CuratedLinkJurisdiction = "ID" | "MY" | "PH" | "ASEAN" | "US" | "Global";

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
}
