import { fetchAirtableTable } from "./airtableClient";
import type { Jurisdiction, JurisdictionSummary, RegimeType } from "@/types";

interface JurisdictionFields {
  "Name"?: string;
  "Code"?: string;
  "Capital"?: string;
  "Regime Type"?: string;
  "Activity Level"?: string;
  "Threat Score"?: number;
  "Active Policies Count"?: number;
  "Data Flow Policy"?: string;
  "Key Legislation"?: string;
  "Description"?: string;
  "Primary Link"?: string;
  "Legacy ID"?: string;
}

function toJurisdiction(r: { id: string; fields: JurisdictionFields; createdTime?: string }): Jurisdiction {
  const f = r.fields;
  return {
    id: f["Legacy ID"] || r.id,
    code: f["Code"] || "",
    name: f["Name"] || "",
    capital: f["Capital"] || "",
    regime_type: (f["Regime Type"] || "Hybrid") as RegimeType,
    activity_level: f["Activity Level"] || "Moderate Activity",
    threat_score: Number(f["Threat Score"]) || 0,
    active_policies_count: Number(f["Active Policies Count"]) || 0,
    data_flow_policy: f["Data Flow Policy"] || "",
    key_legislation: f["Key Legislation"] || "",
    description: f["Description"] || "",
    primary_link: f["Primary Link"] || "",
    created_at: r.createdTime,
  };
}

async function getAllJurisdictions(): Promise<Jurisdiction[]> {
  const tableName = process.env.AIRTABLE_JURISDICTIONS_TABLE || "Jurisdictions";
  const records = await fetchAirtableTable<JurisdictionFields>(tableName, { tag: "jurisdictions" });
  return records.map(toJurisdiction).sort((a, b) => a.code.localeCompare(b.code));
}

export async function listJurisdictions(): Promise<Jurisdiction[]> {
  return getAllJurisdictions();
}

export async function listJurisdictionSummaries(limit = 5): Promise<JurisdictionSummary[]> {
  const jurisdictions = await getAllJurisdictions();
  return jurisdictions
    .sort((a, b) => b.threat_score - a.threat_score)
    .slice(0, limit)
    .map((j) => ({
      id: j.id,
      code: j.code,
      name: j.name,
      regime_type: j.regime_type,
      threat_score: j.threat_score,
    }));
}

export async function getJurisdictionByCode(code: string): Promise<Jurisdiction | null> {
  const jurisdictions = await getAllJurisdictions();
  const normalized = code.trim().toUpperCase();
  return jurisdictions.find((j) => j.code.toUpperCase() === normalized) ?? null;
}
