import { describe, it, expect } from "vitest";
import { newsItemSchema, policySchema, jurisdictionSchema } from "@/lib/validation";

describe("newsItemSchema", () => {
  it("validates a complete news item", () => {
    const item = {
      id: "abc-123",
      title: "ASEAN DEFA Negotiations Update",
      jurisdiction: "Indonesia (ID)",
      category: "DEFA",
      summary: "Talks continue in Jakarta",
      source_url: "https://engagemedia.org/article",
      source_name: "EngageMedia",
      image_url: null,
      author: "Research Team",
      read_time: "5 min read",
      slug: "asean-defa-negotiations-update",
      published_date: "2026-07-15",
      status: "published",
    };
    const result = newsItemSchema.safeParse(item);
    expect(result.success).toBe(true);
  });

  it("rejects invalid category", () => {
    const item = {
      id: "abc",
      title: "Test",
      jurisdiction: "SG",
      category: "INVALID_CATEGORY",
      summary: "Test",
      source_url: "https://example.com",
      source_name: "Source",
      image_url: null,
      author: null,
      read_time: null,
      slug: "test",
      published_date: "2026-01-01",
    };
    const result = newsItemSchema.safeParse(item);
    expect(result.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    const result = newsItemSchema.safeParse({ id: "1" });
    expect(result.success).toBe(false);
  });
});

describe("policySchema", () => {
  it("validates a complete policy", () => {
    const policy = {
      id: "pol-1",
      title: "Cross-Border Data Decree 2026",
      jurisdiction: "Vietnam (VN)",
      category: "Cross-Border Data",
      threat_level: "High Alert",
      date: "2026-06-01",
      summary: "New data localization requirements",
      primary_source_url: "https://gov.vn/decree",
      source_authority: "Ministry of Information",
    };
    const result = policySchema.safeParse(policy);
    expect(result.success).toBe(true);
  });

  it("rejects invalid threat level", () => {
    const policy = {
      id: "p1",
      title: "T",
      jurisdiction: "X",
      category: "Cybersecurity",
      threat_level: "CRITICAL",
      date: "2026-01-01",
      summary: "S",
      primary_source_url: "https://x.com",
      source_authority: "A",
    };
    const result = policySchema.safeParse(policy);
    expect(result.success).toBe(false);
  });
});

describe("jurisdictionSchema", () => {
  it("validates a complete jurisdiction", () => {
    const jur = {
      id: "jur-1",
      code: "ID",
      name: "Indonesia",
      regime_type: "Hybrid",
      threat_score: 3,
      legislation_url: null,
      notes: null,
    };
    const result = jurisdictionSchema.safeParse(jur);
    expect(result.success).toBe(true);
  });

  it("rejects code not exactly 2 characters", () => {
    const jur = {
      id: "j1",
      code: "IDN",
      name: "Indonesia",
      regime_type: "Hybrid",
      threat_score: 3,
      legislation_url: null,
      notes: null,
    };
    const result = jurisdictionSchema.safeParse(jur);
    expect(result.success).toBe(false);
  });

  it("rejects threat_score out of range", () => {
    const jur = {
      id: "j1",
      code: "ID",
      name: "Indonesia",
      regime_type: "Hybrid",
      threat_score: 10,
      legislation_url: null,
      notes: null,
    };
    const result = jurisdictionSchema.safeParse(jur);
    expect(result.success).toBe(false);
  });
});
