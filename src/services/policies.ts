import { supabase, getServiceClient } from "@/lib/supabase";
import type { Policy, PolicyListItem, PolicySearchItem, PolicyRadarEntry } from "@/types";
import type { PolicyCategory, ThreatLevel } from "@/types";

// Re-export the array types so consumers can depend on this module
export type { PolicyCategory, ThreatLevel };

// ── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all policies ordered by date descending (for admin listing). */
export async function listPolicies(): Promise<PolicyListItem[]> {
  const { data, error } = await supabase
    .from("policies")
    .select("id,title,jurisdiction,category,threat_level,date")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return (data as PolicyListItem[]) ?? [];
}

/** Fetch full policy by ID. */
export async function getPolicyById(id: string): Promise<Policy | null> {
  const { data, error } = await supabase
    .from("policies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return (data as Policy) ?? null;
}

/** Fetch policies for the hero search dropdown (lightweight fields). */
export async function listPoliciesForSearch(): Promise<PolicySearchItem[]> {
  const { data, error } = await supabase
    .from("policies")
    .select("id, title, jurisdiction, category, summary");

  if (error) throw new Error(error.message);
  return (data as PolicySearchItem[]) ?? [];
}

/** Fetch policy radar entries for the editorial grid (top 3 by date). */
export async function listPolicyRadar(limit = 3): Promise<PolicyRadarEntry[]> {
  const { data, error } = await supabase
    .from("policies")
    .select("id,jurisdiction,title,threat_level,date")
    .order("date", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as PolicyRadarEntry[]) ?? [];
}

/** Server-side search (used by API route and SSR pages). */
export async function searchPoliciesServer(params: {
  q?: string;
  category?: string;
}): Promise<Policy[]> {
  const client = getServiceClient();
  let query = client
    .from("policies")
    .select("*")
    .order("date", { ascending: false });

  if (params.q) {
    query = query.or(
      `title.ilike.%${params.q}%,summary.ilike.%${params.q}%,jurisdiction.ilike.%${params.q}%`,
    );
  }
  if (params.category && params.category !== "ALL") {
    query = query.eq("category", params.category);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return (data as Policy[]) ?? [];
}

// ── Mutations ────────────────────────────────────────────────────────────────

export async function createPolicy(
  input: Omit<Policy, "id" | "created_at">,
): Promise<Policy> {
  const { data, error } = await supabase
    .from("policies")
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Policy;
}

export async function updatePolicy(
  id: string,
  patch: Partial<Policy>,
): Promise<void> {
  const { error } = await supabase
    .from("policies")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deletePolicy(id: string): Promise<void> {
  const { error } = await supabase.from("policies").delete().eq("id", id);
  if (error) throw new Error(error.message);
}


