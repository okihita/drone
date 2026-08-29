import { fetchAirtableTable } from "./airtableClient";
import type { CuratedLinkItem, CuratedLinkCategory, CuratedLinkJurisdiction } from "@/types/links";

interface LinkFields {
  "Title"?: string;
  "URL"?: string;
  "Publisher"?: string;
  "Domain"?: string;
  "Category"?: string;
  "Jurisdiction"?: string;
  "Published Date"?: string;
  "Excerpt"?: string;
  "OG Image URL"?: string;
  "Is PDF"?: boolean;
  "Status"?: string;
  "Resource ID"?: string;
}

/**
 * Fetch Curated Links dynamically from Airtable Headless CMS with full offset pagination.
 * Supports arbitrary record counts, 60-second ISR caching, and cache: 'no-store' in dev.
 */
export async function getCuratedLinks(): Promise<CuratedLinkItem[]> {
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Curated Links";
  const records = await fetchAirtableTable<LinkFields>(tableName, { tag: "curated-links" });

  if (records.length === 0) return [];

  return records
    .filter((r) => r.fields.Status !== "Draft" && r.fields.Title && r.fields.URL)
    .map((r) => {
      const f = r.fields;
      return {
        id: f["Resource ID"] || r.id,
        title: f["Title"] || "",
        url: f["URL"] || "",
        publisher: f["Publisher"] || "",
        domain: f["Domain"] || "",
        category: (f["Category"] || "DEFA & Treaties") as CuratedLinkCategory,
        jurisdiction: (f["Jurisdiction"] || "ASEAN") as CuratedLinkJurisdiction,
        publishedDate: f["Published Date"] || "",
        excerpt: f["Excerpt"] || "",
        ogImage: f["OG Image URL"] || undefined,
        isPdf: Boolean(f["Is PDF"]),
      };
    });
}
