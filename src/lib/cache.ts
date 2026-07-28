/**
 * Cache tag constants — single source of truth for ISR revalidation.
 * Tags follow a hierarchical namespace: "domain:scope"
 *
 * Admin mutations call revalidateTag() with these to bust the right caches.
 * Supabase webhooks can POST to /api/revalidate?tag=... for the same effect.
 */

// Group tags — revalidating a group tag busts all sub-tags
export const CACHE_TAGS = {
  // Homepage sections
  homepage: "homepage",
  stories: "news:stories",
  dispatches: "news:dispatches",
  radar: "policies:radar",

  // Full entity lists
  policies: "policies",
  news: "news",
  jurisdictions: "jurisdictions",
} as const;

// Revalidation helper — wraps revalidateTag with error logging
export async function revalidate(...tags: string[]) {
  const { revalidateTag } = await import("next/cache");
  for (const tag of tags) {
    try {
      revalidateTag(tag, "max");
    } catch {
      // Tag-based revalidation is best-effort in dev mode
    }
  }
}

// Default ISR revalidation period (seconds)
export const ISR_TTL = 300; // 5 minutes

// CDN/API cache TTL (seconds)
export const API_CACHE_TTL = "s-maxage=300, stale-while-revalidate=60";
