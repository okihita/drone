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
 * Fetch Curated Links dynamically from Airtable Headless CMS with full offset pagination.
 * Supports arbitrary record counts (>100 records), custom table name via env var,
 * 60-second ISR caching in production, and cache: 'no-store' in development.
 */
export async function getCuratedLinks(): Promise<CuratedLinkItem[]> {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!pat || !baseId) {
    console.warn("Airtable credentials (AIRTABLE_PAT / AIRTABLE_BASE_ID) not configured.");
    return [];
  }

  try {
    const rawTableName = process.env.AIRTABLE_TABLE_NAME || "Curated Links";
    const tableName = encodeURIComponent(rawTableName);
    const baseUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;

    const isDev = process.env.NODE_ENV === "development";

    let allRecords: AirtableRecord[] = [];
    let offset: string | undefined = undefined;
    let pagesFetched = 0;
    const MAX_PAGES = 10; // Safety guard: up to 1,000 records

    do {
      const pageUrl = new URL(baseUrl);
      if (offset) {
        pageUrl.searchParams.set("offset", offset);
      }

      const res = await fetch(pageUrl.toString(), {
        headers: {
          Authorization: `Bearer ${pat}`,
        },
        ...(isDev
          ? { cache: "no-store" }
          : { next: { revalidate: 60, tags: ["curated-links"] } }),
      });

      if (!res.ok) {
        console.warn(`Airtable fetch failed with status ${res.status} on page ${pagesFetched + 1}`);
        break;
      }

      const data: AirtableListResponse = await res.json();

      if (data.records && Array.isArray(data.records)) {
        allRecords = allRecords.concat(data.records);
      }

      offset = data.offset;
      pagesFetched++;
    } while (offset && pagesFetched < MAX_PAGES);

    if (allRecords.length === 0) {
      return [];
    }

    const items: CuratedLinkItem[] = allRecords
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
