import { describe, it, expect } from "vitest";
import { CACHE_TAGS } from "@/lib/cache";

describe("CACHE_TAGS", () => {
  it("has all expected tag groups", () => {
    expect(CACHE_TAGS.news).toBe("news");
    expect(CACHE_TAGS.stories).toBe("news:stories");
    expect(CACHE_TAGS.policies).toBe("policies");
    expect(CACHE_TAGS.jurisdictions).toBe("jurisdictions");
    expect(CACHE_TAGS.homepage).toBe("homepage");
  });

  it("uses hierarchical tag convention", () => {
    expect(CACHE_TAGS.stories).toMatch(/^news:/);
    expect(CACHE_TAGS.dispatches).toMatch(/^news:/);
    expect(CACHE_TAGS.radar).toMatch(/^policies:/);
  });

  it("all tags are strings", () => {
    Object.values(CACHE_TAGS).forEach((tag) => {
      expect(typeof tag).toBe("string");
      expect(tag.length).toBeGreaterThan(0);
    });
  });
});
