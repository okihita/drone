import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the supabase module before importing the service
vi.mock("@/lib/supabase", () => {
  const from = vi.fn();
  return {
    supabase: { from },
    getServiceClient: vi.fn(() => ({ from })),
    getBrowserClient: vi.fn(() => ({ from })),
  };
});

const { supabase } = await import("@/lib/supabase");
const { listNews, getNewsById, getNewsBySlug } = await import("@/services/news");

describe("listNews", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns published news items", async () => {
    const mockData = [
      {
        id: "1",
        title: "ASEAN DEFA Update",
        slug: "asean-defa-update",
        jurisdiction: "Indonesia (ID)",
        category: "DEFA",
        image_url: null,
        published_date: "2026-07-01",
        status: "published",
      },
    ];

    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await listNews();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("ASEAN DEFA Update");
    expect(chain.eq).toHaveBeenCalledWith("status", "published");
  });

  it("throws on database error", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: null, error: { message: "DB error" } }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    await expect(listNews()).rejects.toThrow("DB error");
  });
});

describe("getNewsById", () => {
  it("returns null for not found (PGRST116)", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { code: "PGRST116", message: "No rows" },
      }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await getNewsById("nonexistent");
    expect(result).toBeNull();
  });

  it("returns a NewsItem for a found record", async () => {
    const mockRow = {
      id: "2",
      title: "Test Article",
      slug: "test-article",
      jurisdiction: "SG",
      category: "Cybersecurity",
      image_url: null,
      published_date: "2026-06-01",
      read_time: null,
      summary: "Summary text",
      author: null,
      source_url: "https://example.com",
      source_name: "Example",
      status: "published",
      wp_post_id: null,
      content: null,
      created_at: "2026-01-01",
    };

    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: mockRow, error: null }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await getNewsById("2");
    expect(result).not.toBeNull();
    expect(result?.title).toBe("Test Article");
    expect(result?.id).toBe("2");
  });
});

describe("getNewsBySlug", () => {
  it("returns null when slug column does not exist (42703)", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockRejectedValue({ code: "42703", message: "column does not exist" }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await getNewsBySlug("any-slug");
    expect(result).toBeNull();
  });

  it("re-throws unexpected errors", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockRejectedValue(new Error("Unexpected failure")),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    await expect(getNewsBySlug("any-slug")).rejects.toThrow("Unexpected failure");
  });
});
