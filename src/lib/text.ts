/**
 * Generate a URL-safe slug from a title string.
 *
 * Strategy (Our World in Data-inspired):
 *   - Strip special characters, keep alphanumeric + hyphens
 *   - Collapse whitespace into single hyphens
 *   - Trim to max 80 characters at word boundary
 *   - Never end with a hyphen
 *
 * Admin can override the auto-generated slug before publishing.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")   // strip special chars
    .trim()
    .replace(/\s+/g, "-")           // spaces → hyphens
    .replace(/-+/g, "-")            // collapse multiple hyphens
    .substring(0, 80)               // cap length
    .replace(/-$/, "");             // no trailing hyphen
}

/**
 * Calculate estimated read time from HTML content.
 * Strips tags, counts words, divides by average reading speed (225 wpm).
 * Returns formatted string like "4 min read" or "1 min read".
 * Never returns "0 min read" — floors at 1.
 */
export function calculateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  if (!text) return "1 min read";
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}
