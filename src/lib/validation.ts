import { z } from "zod";
import { NEWS_CATEGORIES, POLICY_CATEGORIES, THREAT_LEVELS, REGIME_TYPES } from "./constants";

// ── Shared primitives ────────────────────────────────────────────────────────

const newsCategory = z.enum(NEWS_CATEGORIES);
const policyCategory = z.enum(POLICY_CATEGORIES);
const threatLevel = z.enum(THREAT_LEVELS);
const regimeType = z.enum(REGIME_TYPES);

// ── News ─────────────────────────────────────────────────────────────────────

export const newsItemSchema = z.object({
  id: z.string(),
  wp_post_id: z.number().nullable().optional(),
  status: z.enum(["pending_review", "published", "archived"]).optional(),
  title: z.string(),
  jurisdiction: z.string(),
  category: newsCategory,
  threat_level: z.string().nullable().optional(),
  summary: z.string(),
  source_url: z.string(),
  source_name: z.string(),
  image_url: z.string().nullable(),
  author: z.string().nullable(),
  read_time: z.string().nullable(),
  slug: z.string().nullable(),
  published_date: z.string(),
  raw_wp_data: z.string().nullable().optional(),
  created_at: z.string().optional(),
});

export const newsListItemSchema = newsItemSchema.pick({
  id: true,
  title: true,
  slug: true,
  jurisdiction: true,
  category: true,
  image_url: true,
  published_date: true,
});

// ── Policies ─────────────────────────────────────────────────────────────────

export const policySchema = z.object({
  id: z.string(),
  title: z.string(),
  jurisdiction: z.string(),
  category: policyCategory,
  threat_level: threatLevel,
  date: z.string(),
  summary: z.string(),
  primary_source_url: z.string(),
  source_authority: z.string(),
  created_at: z.string().optional(),
});

// ── Jurisdictions ────────────────────────────────────────────────────────────

export const jurisdictionSchema = z.object({
  id: z.string(),
  code: z.string().length(2),
  name: z.string(),
  regime_type: regimeType,
  threat_score: z.number().min(0).max(5),
  legislation_url: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().optional(),
});

// ── Inferred types (replace manual interfaces if desired) ────────────────────

export type ValidatedNewsItem = z.infer<typeof newsItemSchema>;
export type ValidatedPolicy = z.infer<typeof policySchema>;
export type ValidatedJurisdiction = z.infer<typeof jurisdictionSchema>;
