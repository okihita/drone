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
