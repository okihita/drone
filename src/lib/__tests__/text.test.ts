import { describe, it, expect } from "vitest";
import { generateSlug, getExcerpt, decodeHtmlEntities, calculateReadTime } from "@/lib/text";

describe("generateSlug", () => {
  it("converts a title to a URL-safe slug", () => {
    expect(generateSlug("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(generateSlug("ASEAN's Digital Future: 2026 & Beyond!")).toBe("aseans-digital-future-2026-beyond");
  });

  it("handles empty strings", () => {
    expect(generateSlug("")).toBe("");
  });

  it("collapses multiple spaces and hyphens", () => {
    expect(generateSlug("  multiple   spaces  here  ")).toBe("multiple-spaces-here");
  });
});

describe("getExcerpt", () => {
  it("truncates text to the given max length", () => {
    const long = "A".repeat(200);
    expect(getExcerpt(long, 100).length).toBeLessThanOrEqual(103); // ... adds 3 chars
  });

  it("returns full text if shorter than max length", () => {
    expect(getExcerpt("Short text", 100)).toBe("Short text");
  });

  it("handles empty text", () => {
    expect(getExcerpt("", 50)).toBe("");
  });
});

describe("decodeHtmlEntities", () => {
  it("decodes common HTML entities", () => {
    expect(decodeHtmlEntities("Hello &amp; World")).toBe("Hello & World");
    expect(decodeHtmlEntities("It&#8217;s great")).toBe("It's great");
  });

  it("returns plain text unchanged", () => {
    expect(decodeHtmlEntities("Plain text")).toBe("Plain text");
  });
});

describe("calculateReadTime", () => {
  it("calculates read time for short text", () => {
    const text = "word ".repeat(50); // 50 words
    expect(calculateReadTime(text)).toBe("1 min read");
  });

  it("returns minimal time for very short text", () => {
    expect(calculateReadTime("five words here now")).toBe("1 min read");
  });

  it("handles HTML content", () => {
    const html = "<p>" + "word ".repeat(300) + "</p>";
    expect(calculateReadTime(html)).toMatch(/\d+ min read/);
  });
});
