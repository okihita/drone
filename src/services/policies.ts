import { fetchAirtableTable } from "./airtableClient";
import type { Policy, PolicyListItem, PolicyRadarEntry, PolicyCategory, ThreatLevel } from "@/types";

interface PolicyFields {
  "Title"?: string;
  "Jurisdiction"?: string;
  "Category"?: string;
  "Threat Level"?: string;
  "Date"?: string;
  "Summary"?: string;
  "Primary Source URL"?: string;
  "Source Authority"?: string;
  "Legacy ID"?: string;
}

function toPolicy(r: { id: string; fields: PolicyFields; createdTime?: string }): Policy {
  const f = r.fields;
  return {
    id: f["Legacy ID"] || r.id,
    title: f["Title"] || "",
    jurisdiction: f["Jurisdiction"] || "",
    category: (f["Category"] || "DEFA") as PolicyCategory,
    threat_level: (f["Threat Level"] || "Medium Risk") as ThreatLevel,
    date: f["Date"] || "",
    summary: f["Summary"] || "",
    primary_source_url: f["Primary Source URL"] || "",
    source_authority: f["Source Authority"] || "",
    created_at: r.createdTime,
  };
}

async function getAllPolicies(): Promise<Policy[]> {
  const tableName = process.env.AIRTABLE_POLICIES_TABLE || "Policies";
  const records = await fetchAirtableTable<PolicyFields>(tableName, { tag: "policies" });
  return records.map(toPolicy);
}

/**
 * Fetch all policies ordered by date descending.
 * Used by policy ledger and observatory pages.
 */
export async function listPolicies(): Promise<PolicyListItem[]> {
  const policies = await getAllPolicies();
  return policies.map((p) => ({
    id: p.id,
    title: p.title,
    jurisdiction: p.jurisdiction,
    category: p.category,
    threat_level: p.threat_level,
    date: p.date,
  }));
}

/** Fetch full policy by ID (matches legacy UUID or Airtable record ID). */
export async function getPolicyById(id: string): Promise<Policy | null> {
  const policies = await getAllPolicies();
  return policies.find((p) => p.id === id) ?? null;
}

/** Fetch policy radar entries for the editorial grid (top N by date). */
export async function listPolicyRadar(limit = 3): Promise<PolicyRadarEntry[]> {
  const policies = await getAllPolicies();
  return policies.slice(0, limit).map((p) => ({
    id: p.id,
    jurisdiction: p.jurisdiction,
    title: p.title,
    threat_level: p.threat_level,
    date: p.date,
  }));
}

/**
 * Search policies with query string and optional category filter.
 */
export async function searchPoliciesServer(params: {
  q?: string;
  category?: string;
}): Promise<Policy[]> {
  let policies = await getAllPolicies();

  if (params.category && params.category !== "ALL") {
    policies = policies.filter((p) => p.category === params.category);
  }

  if (params.q && params.q.trim() !== "") {
    const q = params.q.toLowerCase().trim();
    policies = policies.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.jurisdiction.toLowerCase().includes(q),
    );
  }

  return policies;
}
