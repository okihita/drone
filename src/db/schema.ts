import { pgTable, uuid, text, integer, timestamp, date } from "drizzle-orm/pg-core";

// ── Jurisdictions ─────────────────────────────────────────────────────────────

export const jurisdictions = pgTable("jurisdictions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),               // ISO 2-letter (ID, SG, etc.)
  name: text("name").notNull(),
  capital: text("capital").notNull(),
  regimeType: text("regime_type").notNull(),           // "Open Transfer" | "Hybrid" | "Strict Localization"
  activityLevel: text("activity_level").notNull(),     // "High Activity" | "Moderate" | "Monitoring"
  threatScore: integer("threat_score").notNull(),      // 1–5
  activePoliciesCount: integer("active_policies_count").notNull().default(0),
  dataFlowPolicy: text("data_flow_policy").notNull(),
  keyLegislation: text("key_legislation").notNull(),
  description: text("description").notNull(),
  primaryLink: text("primary_link").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Policies ──────────────────────────────────────────────────────────────────

export const policies = pgTable("policies", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  jurisdiction: text("jurisdiction").notNull(),        // e.g. "Indonesia (ID)"
  category: text("category").notNull(),                // "DEFA" | "Cross-Border Data" | "AI Governance" | "Cybersecurity"
  threatLevel: text("threat_level").notNull(),         // "High Alert" | "Medium Risk" | "Rights Verified"
  date: text("date").notNull(),                        // display date string, e.g. "July 15, 2026"
  summary: text("summary").notNull(),
  primarySourceUrl: text("primary_source_url").notNull(),
  sourceAuthority: text("source_authority").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── News Items ────────────────────────────────────────────────────────────────

export const newsItems = pgTable("news_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  jurisdiction: text("jurisdiction").notNull(),        // e.g. "Indonesia (ID)"
  category: text("category").notNull(),                // "DEFA" | "AI Governance" | "Cybersecurity" | "Cross-Border Data"
  summary: text("summary").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceName: text("source_name").notNull(),
  imageUrl: text("image_url"),
  publishedDate: date("published_date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
