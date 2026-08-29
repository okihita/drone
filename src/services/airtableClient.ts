export interface AirtableRecord<T = Record<string, unknown>> {
  id: string;
  fields: T;
  createdTime?: string;
}

interface AirtableListResponse<T = Record<string, unknown>> {
  records?: AirtableRecord<T>[];
  offset?: string;
  error?: {
    type: string;
    message: string;
  };
}

export interface FetchAirtableOptions {
  filterByFormula?: string;
  maxRecords?: number;
  tag?: string;
}

/**
 * Shared fetcher for Airtable Headless CMS tables.
 * Implements 60-second ISR caching in production and cache: 'no-store' in development.
 * Automatically loops through offset pagination up to MAX_PAGES.
 */
export async function fetchAirtableTable<T = Record<string, unknown>>(
  tableName: string,
  options?: FetchAirtableOptions,
): Promise<AirtableRecord<T>[]> {
  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!pat || !baseId) {
    console.warn(`[airtable] Missing AIRTABLE_PAT or AIRTABLE_BASE_ID. Skipping fetch for table "${tableName}".`);
    return [];
  }

  try {
    const encodedTable = encodeURIComponent(tableName);
    const baseUrl = `https://api.airtable.com/v0/${baseId}/${encodedTable}`;
    const isDev = process.env.NODE_ENV === "development";
    const cacheTag = options?.tag || tableName.toLowerCase();

    let allRecords: AirtableRecord<T>[] = [];
    let offset: string | undefined = undefined;
    let pages = 0;
    const MAX_PAGES = 10;

    do {
      const pageUrl = new URL(baseUrl);
      if (offset) pageUrl.searchParams.set("offset", offset);
      if (options?.filterByFormula) pageUrl.searchParams.set("filterByFormula", options.filterByFormula);
      if (options?.maxRecords) pageUrl.searchParams.set("maxRecords", String(options.maxRecords));

      const res = await fetch(pageUrl.toString(), {
        headers: {
          Authorization: `Bearer ${pat}`,
        },
        ...(isDev
          ? { cache: "no-store" }
          : { next: { revalidate: 60, tags: [cacheTag] } }),
      });

      if (!res.ok) {
        console.warn(`[airtable] Table "${tableName}" returned HTTP ${res.status}`);
        break;
      }

      const data: AirtableListResponse<T> = await res.json();
      if (data.records && Array.isArray(data.records)) {
        allRecords = allRecords.concat(data.records);
      }

      offset = data.offset;
      pages++;
    } while (offset && pages < MAX_PAGES);

    return allRecords;
  } catch (err) {
    console.error(`[airtable] Error fetching table "${tableName}":`, err);
    return [];
  }
}
