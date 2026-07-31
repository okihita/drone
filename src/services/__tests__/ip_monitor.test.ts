import { describe, it, expect } from "vitest";
import { fetchIPProfiles, fetchIPProfileByCode } from "@/services/ip_monitor";

describe("IP Monitor Service", () => {
  it("fetches all 11 ASEAN country IP profiles", () => {
    const profiles = fetchIPProfiles();
    expect(profiles.length).toBe(11);
  });

  it("retrieves a profile by country code", () => {
    const profile = fetchIPProfileByCode("SG");
    expect(profile).toBeDefined();
    expect(profile?.countryName).toBe("Singapore");
    expect(profile?.compositeScore).toBeGreaterThan(80);
  });
});
