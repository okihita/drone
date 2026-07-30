import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/supabase", () => {
  const from = vi.fn();
  return {
    supabase: { from },
    getServiceClient: vi.fn(() => ({ from })),
    getBrowserClient: vi.fn(() => ({ from })),
  };
});

const { supabase } = await import("@/lib/supabase");
const { listPolicies, getPolicyById } = await import("@/services/policies");

describe("listPolicies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns all policies ordered by date", async () => {
    const mockData = [
      { id: "1", title: "Policy A", jurisdiction: "ID", category: "DEFA", threat_level: "Medium Risk", date: "2026-07-01" },
      { id: "2", title: "Policy B", jurisdiction: "SG", category: "Cross-Border Data", threat_level: "High Alert", date: "2026-06-15" },
    ];

    const chain = {
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await listPolicies();
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe("Policy A");
    expect(chain.order).toHaveBeenCalledWith("date", { ascending: false });
  });

  it("throws on database error", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: null, error: { message: "Connection lost" } }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    await expect(listPolicies()).rejects.toThrow("Connection lost");
  });
});

describe("getPolicyById", () => {
  it("returns null for not found (PGRST116)", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { code: "PGRST116" } }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await getPolicyById("nonexistent");
    expect(result).toBeNull();
  });

  it("returns a Policy for a found record", async () => {
    const mockRow = {
      id: "pol-1",
      title: "Data Localization Decree",
      jurisdiction: "Vietnam (VN)",
      category: "Cross-Border Data",
      threat_level: "High Alert",
      date: "2026-05-20",
      summary: "New requirements",
      primary_source_url: "https://gov.vn",
      source_authority: "MIC",
    };

    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: mockRow, error: null }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    const result = await getPolicyById("pol-1");
    expect(result).not.toBeNull();
    expect(result?.title).toBe("Data Localization Decree");
    expect(result?.threat_level).toBe("High Alert");
  });

  it("throws on non-PGRST116 errors", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { code: "42P01", message: "Table missing" } }),
    };

    (supabase.from as ReturnType<typeof vi.fn>).mockReturnValue(chain);

    await expect(getPolicyById("any")).rejects.toThrow("Table missing");
  });
});
