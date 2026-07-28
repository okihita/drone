/**
 * Fire-and-forget ISR revalidation after admin mutations.
 * Silently POSTs to the revalidation webhook — non-blocking.
 */
export function revalidateAfterMutation(...tags: string[]) {
  const secret = process.env.NEXT_PUBLIC_REVALIDATION_SECRET || "drone-revalidate-secret";
  for (const tag of tags) {
    fetch(`/api/revalidate?tag=${encodeURIComponent(tag)}&secret=${encodeURIComponent(secret)}`, {
      method: "POST",
    }).catch(() => {}); // fire-and-forget — best-effort
  }
}
