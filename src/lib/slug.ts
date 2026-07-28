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
