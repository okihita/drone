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
  wpPostId: integer("wp_post_id").unique(),                   // Original WP post ID for deduplication
  status: text("status").notNull().default("published"),      // "pending_review" | "published" | "archived"
  title: text("title").notNull(),
  jurisdiction: text("jurisdiction").notNull(),        // e.g. "Indonesia (ID)"
  category: text("category").notNull(),                // "DEFA" | "AI Governance" | "Cybersecurity" | "Cross-Border Data"
  threatLevel: text("threat_level"),                   // "High Alert" | "Medium Risk" | "Rights Verified"
  summary: text("summary").notNull(),
  sourceUrl: text("source_url").notNull(),
  sourceName: text("source_name").notNull(),
  imageUrl: text("image_url"),
  author: text("author"),
  readTime: text("read_time"),
  slug: text("slug").unique(),                               // URL-safe identifier, e.g. "vietnam-decree-53"
  publishedDate: date("published_date").notNull(),
  rawWpData: text("raw_wp_data"),                            // Original WP API JSON payload
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Benchmark Scores (Digital 2 Dozen) ─────────────────────────────────────

export const benchmarkScores = pgTable("benchmark_scores", {
  id: uuid("id").defaultRandom().primaryKey(),
  countryCode: text("country_code").notNull().references(() => jurisdictions.code),
  principleId: integer("principle_id").notNull(),               // 1-24
  score: integer("score").notNull(),                            // 0-100
  evidence: text("evidence").notNull(),
  sourceUrl: text("source_url"),
  lastReviewed: date("last_reviewed").notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Encryption Events ───────────────────────────────────────────────────────

export const encryptionEvents = pgTable("encryption_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  countryCode: text("country_code").notNull().references(() => jurisdictions.code),
  eventType: text("event_type").notNull(),                      // VPN_BAN, BACKDOOR_MANDATE, etc.
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  sourceUrl: text("source_url"),
  eventDate: date("event_date").notNull(),
  severityScore: integer("severity_score").notNull().default(50),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Negotiation Milestones ──────────────────────────────────────────────────

export const negotiationMilestones = pgTable("negotiation_milestones", {
  id: uuid("id").defaultRandom().primaryKey(),
  framework: text("framework").notNull(),                       // DEFA, CPTPP, DEPA, IPEF, BILATERAL
  title: text("title").notNull(),
  description: text("description").notNull(),
  milestoneDate: date("milestone_date").notNull(),
  endDate: date("end_date"),
  status: text("status").notNull().default("UPCOMING"),         // COMPLETED, IN_PROGRESS, UPCOMING, DELAYED
  countries: text("countries").notNull(),                       // JSON array of country codes
  sourceUrl: text("source_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ── Consumer Protection Policies ────────────────────────────────────────────

export const consumerProtectionPolicies = pgTable("consumer_protection_policies", {
  id: uuid("id").defaultRandom().primaryKey(),
  countryCode: text("country_code").notNull().references(() => jurisdictions.code),
  intermediaryLiability: text("intermediary_liability").notNull(),
  intermediaryLiabilityScore: integer("intermediary_liability_score").notNull(),
  algorithmicAudit: text("algorithmic_audit").notNull(),
  algorithmicAuditScore: integer("algorithmic_audit_score").notNull(),
  breachNotification: text("breach_notification").notNull(),
  breachNotificationScore: integer("breach_notification_score").notNull(),
  spamRegulation: text("spam_regulation").notNull(),
  spamRegulationScore: integer("spam_regulation_score").notNull(),
  darkPatternRestriction: text("dark_pattern_restriction").notNull(),
  darkPatternScore: integer("dark_pattern_score").notNull(),
  compositeScore: integer("composite_score").notNull(),
  lastUpdated: date("last_updated").notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

