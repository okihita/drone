import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetchAirtableTable = vi.fn();

vi.mock("../airtableClient", () => ({
  fetchAirtableTable: (...args: unknown[]) => mockFetchAirtableTable(...args),
}));

const { listNews, getNewsById, getNewsBySlug, listStories, listDispatches } = await import("@/services/news");

describe("news service (Airtable-backed)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockRecords = [
    {
      id: "rec-news-1",
      fields: {
        "Title": "Vietnam Decree 53 Analysis",
        "Slug": "vietnam-decree-53-analysis",
        "Jurisdiction": "Vietnam (VN)",
        "Category": "DATA LOCALIZATION",
        "Summary": "Severe compliance pressure on international civil society.",
        "Published Date": "2026-06-30",
        "Status": "published",
        "Author": "EngageMedia Research Team",
        "Legacy ID": "news-1",
      },
    },
    {
      id: "rec-news-2",
      fields: {
        "Title": "Draft Dispatch Under Review",
        "Slug": "draft-dispatch",
        "Status": "draft",
        "Legacy ID": "news-2",
      },
    },
  ];

  it("listNews returns only published news items", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const result = await listNews();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("news-1");
    expect(result[0].title).toBe("Vietnam Decree 53 Analysis");
  });

  it("getNewsById finds news by legacy ID", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const item = await getNewsById("news-1");
    expect(item).not.toBeNull();
    expect(item?.title).toBe("Vietnam Decree 53 Analysis");
  });

  it("getNewsBySlug finds news by slug", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const item = await getNewsBySlug("vietnam-decree-53-analysis");
    expect(item).not.toBeNull();
    expect(item?.id).toBe("news-1");
  });

  it("getNewsBySlug returns null for nonexistent slug", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const item = await getNewsBySlug("nonexistent");
    expect(item).toBeNull();
  });

  it("listStories and listDispatches return expected slices", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const stories = await listStories(1);
    expect(stories).toHaveLength(1);

    const dispatches = await listDispatches(1);
    expect(dispatches).toHaveLength(1);
  });
});
