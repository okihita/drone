import { supabase } from "@/lib/supabase";
import type { Jurisdiction, JurisdictionSummary } from "@/types";

// ── Queries ──────────────────────────────────────────────────────────────────

export async function listJurisdictions(): Promise<Jurisdiction[]> {
  const { data, error } = await supabase
    .from("jurisdictions")
    .select("*")
    .order("code");

  if (error) throw new Error(error.message);
  return (data as Jurisdiction[]) ?? [];
}

export async function listJurisdictionSummaries(
  limit = 5,
): Promise<JurisdictionSummary[]> {
  const { data, error } = await supabase
    .from("jurisdictions")
    .select("id,code,name,regime_type,threat_score")
    .order("threat_score", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data as JurisdictionSummary[]) ?? [];
}

export async function getJurisdictionByCode(
  code: string,
): Promise<Jurisdiction | null> {
  const { data, error } = await supabase
    .from("jurisdictions")
    .select("*")
    .eq("code", code)
    .single();

  if (error) throw new Error(error.message);
  return (data as Jurisdiction) ?? null;
}

// ── Mutations ────────────────────────────────────────────────────────────────

export async function updateJurisdiction(
  id: string,
  patch: Partial<Jurisdiction>,
): Promise<void> {
  const { error } = await supabase
    .from("jurisdictions")
    .update(patch)
    .eq("id", id);

  if (error) throw new Error(error.message);
}
