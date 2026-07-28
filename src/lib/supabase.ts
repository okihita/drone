import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * General-purpose client (anon key). Works in both server and client contexts.
 * Use for data queries (policies, news, jurisdictions). Auth-unaware.
 */
export const supabase: SupabaseClient = createClient(supabaseUrl, anonKey);

/**
 * Browser-only client with cookie-based session persistence.
 * Use ONLY in client components for auth checks (AdminBar, session state).
 * Does NOT work in server components — use supabase-server.ts there.
 */
let _browserClient: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (!_browserClient) {
    _browserClient = createBrowserClient(supabaseUrl, anonKey);
  }
  return _browserClient;
}

/**
 * Service-role client for server-side privileged queries.
 * Only call from server contexts (API routes, server components).
 */
export function getServiceClient(): SupabaseClient {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  }
  return createClient(supabaseUrl, serviceKey);
}
