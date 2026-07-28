/**
 * Generate a URL-safe slug from a title string.
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
 * Strip all HTML tags from a string and collapse whitespace.
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Extract a clean, tag-free plain text excerpt from HTML content.
 */
export function getExcerpt(html: string | null | undefined, maxLength = 180): string {
  const plainText = stripHtml(html);
  if (!plainText) return "";
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + "…";
}

/**
 * Calculate estimated read time from HTML content.
 * Strips tags, counts words, divides by average reading speed (225 wpm).
 * Returns formatted string like "4 min read" or "1 min read".
 * Never returns "0 min read" — floors at 1.
 */
export function calculateReadTime(html: string): string {
  const text = stripHtml(html);
  if (!text) return "1 min read";
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}
