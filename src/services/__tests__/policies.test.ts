import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetchAirtableTable = vi.fn();

vi.mock("../airtableClient", () => ({
  fetchAirtableTable: (...args: unknown[]) => mockFetchAirtableTable(...args),
}));

const { listPolicies, getPolicyById, listPolicyRadar } = await import("@/services/policies");

describe("policies service (Airtable-backed)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockRecords = [
    {
      id: "rec1",
      fields: {
        "Title": "DEFA Chapter 5 Finalization",
        "Jurisdiction": "ASEAN Regional",
        "Category": "DEFA",
        "Threat Level": "High Alert",
        "Date": "July 15, 2026",
        "Summary": "Draft text finalized on DFFT.",
        "Primary Source URL": "https://asean.org",
        "Source Authority": "ASEAN Secretariat",
        "Legacy ID": "pol-1",
      },
    },
    {
      id: "rec2",
      fields: {
        "Title": "Vietnam Decree 53",
        "Jurisdiction": "Vietnam (VN)",
        "Category": "Data Privacy",
        "Threat Level": "Critical Alert",
        "Date": "June 30, 2026",
        "Summary": "Local data storage mandate.",
        "Legacy ID": "pol-2",
      },
    },
  ];

  it("listPolicies returns all policies mapped correctly", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const result = await listPolicies();
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("pol-1");
    expect(result[0].title).toBe("DEFA Chapter 5 Finalization");
    expect(result[1].id).toBe("pol-2");
    expect(result[1].threat_level).toBe("Critical Alert");
  });

  it("getPolicyById finds record by legacy ID", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const policy = await getPolicyById("pol-1");
    expect(policy).not.toBeNull();
    expect(policy?.title).toBe("DEFA Chapter 5 Finalization");
    expect(policy?.source_authority).toBe("ASEAN Secretariat");
  });

  it("getPolicyById returns null if not found", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const policy = await getPolicyById("nonexistent");
    expect(policy).toBeNull();
  });

  it("listPolicyRadar returns top N policies", async () => {
    mockFetchAirtableTable.mockResolvedValue(mockRecords);

    const radar = await listPolicyRadar(1);
    expect(radar).toHaveLength(1);
    expect(radar[0].id).toBe("pol-1");
  });
});
