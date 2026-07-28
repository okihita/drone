import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
}

/**
 * Browser-side client with cookie-based session persistence.
 * Compatible with the SSR auth flow — the login server action sets
 * httpOnly cookies, and createBrowserClient reads them automatically.
 */
export const supabase: SupabaseClient = createBrowserClient(
  supabaseUrl!,
  anonKey!,
);

/**
 * Service-role client for server-side privileged queries.
 * Only call from server contexts (API routes, server components).
 */
export function getServiceClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  }
  return createClient(supabaseUrl!, serviceKey!);
}
