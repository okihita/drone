/**
 * Cache tag constants — single source of truth for ISR revalidation.
 * Tags follow a hierarchical namespace convention: "domain:scope"
 * Note: Next.js revalidateTag() does NOT support hierarchical busting —
 * revalidating "news" does not invalidate "news:stories". Each tag is independent.
 *
 * Admin mutations call revalidateTag() with these to bust the right caches.
 * Supabase webhooks can POST to /api/revalidate?tag=... for the same effect.
 */

// Domain-scoped tags for ISR revalidation
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
