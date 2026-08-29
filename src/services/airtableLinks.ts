import type { CuratedLinkItem, CuratedLinkCategory, CuratedLinkJurisdiction } from "@/types/links";

interface AirtableRecord {
  id: string;
  fields: {
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
  };
}

interface AirtableListResponse {
  records?: AirtableRecord[];
  offset?: string;
  error?: {
    type: string;
    message: string;
  };
}

/**
 * Fetch Curated Links dynamically from Airtable Headless CMS.
 * Implements 60-second ISR caching in production with 'curated-links' tag,
 * and cache: 'no-store' in development for instantaneous live updates.
 */
export async function getCuratedLinks(): Promise<CuratedLinkItem[]> {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!pat || !baseId) {
    console.warn("Airtable credentials (AIRTABLE_PAT / AIRTABLE_BASE_ID) not configured.");
    return [];
  }

  try {
    const tableName = encodeURIComponent("Curated Links");
    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const isDev = process.env.NODE_ENV === "development";

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${pat}`,
      },
      ...(isDev
        ? { cache: "no-store" }
        : { next: { revalidate: 60, tags: ["curated-links"] } }),
    });

    if (!res.ok) {
      console.warn(`Airtable fetch failed with status ${res.status}`);
      return [];
    }

    const data: AirtableListResponse = await res.json();

    if (!data.records || !Array.isArray(data.records)) {
      return [];
    }

    const items: CuratedLinkItem[] = data.records
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

    return items;
  } catch (error) {
    console.error("Error fetching links from Airtable:", error);
    return [];
  }
}
