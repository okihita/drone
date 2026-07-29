import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
  return url;
}

function getAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
  return key;
}

let _supabase: SupabaseClient | null = null;

function initSupabase(): SupabaseClient {
  if (!_supabase) {
    _supabase = createClient(getSupabaseUrl(), getAnonKey());
  }
  return _supabase;
}

/**
 * General-purpose client (anon key). Works in both server and client contexts.
 * Lazily initialized — only throws if accessed when env vars are missing.
 * Use for data queries (policies, news, jurisdictions). Auth-unaware.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (initSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
  set(_target, prop, value) {
    (initSupabase() as unknown as Record<string | symbol, unknown>)[prop] = value;
    return true;
  },
});

/**
 * Browser-only client with cookie-based session persistence.
 * Use ONLY in client components for auth checks (AdminBar, session state).
 * Does NOT work in server components — use supabase-server.ts there.
 */
let _browserClient: SupabaseClient | null = null;

export function getBrowserClient(): SupabaseClient {
  if (!_browserClient) {
    _browserClient = createBrowserClient(getSupabaseUrl(), getAnonKey());
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
  return createClient(getSupabaseUrl(), serviceKey);
}
