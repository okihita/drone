# D.R.O.N.E. Digital 2 Dozen Benchmark — PRD

> **Branch:** `feature/digital-2-dozen-benchmark`
> **Author:** D.R.O.N.E. Engineering
> **Created:** 2026-07-29
> **Target:** Full implementation across 8 sprints

---

## 1. Product Vision

Transform D.R.O.N.E. from a Southeast Asian digital policy observatory into the world's first fully interactive, publicly accessible **Digital 2 Dozen compliance benchmarking platform** — mapping all 24 USTR digital trade principles against every ASEAN member state with real-time data, visualization, and API access.

### Key Outcomes
- **11 ASEAN countries × 24 TPP principles** compliance heatmap with color-coded scores (0–100)
- **Technology Sovereignty Radar** tracking forced tech transfer, source code disclosure, encryption mandates
- **Encryption & Digital Security Observatory** monitoring VPN bans, backdoor mandates, lawful intercept expansions
- **Consumer Protection Dashboard** tracking platform liability laws, algorithmic audits, dark pattern regulations
- **Digital Trade Negotiations Timeline** Gantt visualization of DEFA, CPTPP, DEPA, IPEF, bilateral DEAs
- **IP & Trade Secret Risk Monitor** tracking AI model theft risks and copyright safe harbor provisions
- **Data Flow Compliance Index** with 8-axis quantitative scoring per country
- All features surfaced on a unified **Benchmark hub page** and cross-linked from existing pages

---

## 2. Architecture Principles

1. **Follow existing project patterns** — server components with `unstable_cache`, SWR for client fetching, Supabase as data store
2. **No new visualization library dependencies** — use `d3-geo` (already installed) for radar, CSS Grid for heatmaps, custom SVG for timelines
3. **Hardcoded seed data for all new features** — real research-based data lives in `src/lib/` files, with Supabase sync as Phase 2 feature
4. **Every new page follows the existing layout pattern:** `Header → Hero Banner → Main Content → Footer`
5. **Navigation link added for each new top-level page** in `constants.ts` `NAV_LINKS`
6. **TypeScript types for all new entities** in `src/types/`
7. **Revalidation on admin mutations** via `revalidateTag()`

---

## 3. Sprint Breakdown

### Sprint 1: Foundation — Categories, Schema, API, Data Layer
**Goal:** Extend the platform's taxonomy, database schema, types, and API to support Digital 2 Dozen features.

**Deliverables:**
- [ ] `src/lib/constants.ts` — Add 6 new categories: `TECHNOLOGY_SOVEREIGNTY`, `CONSUMER_PROTECTION`, `IP_AND_STANDARDS`, `INFRASTRUCTURE_ACCESS`, `ENCRYPTION_AUTH`, `COMPETITION_SOES`
- [ ] `src/types/benchmark.ts` — New types: `BenchmarkScore`, `BenchmarkPrinciple`, `BenchmarkCluster`, `BenchmarkSummary`
- [ ] `src/types/encryption.ts` — New types: `EncryptionEvent`
- [ ] `src/types/negotiation.ts` — New types: `NegotiationMilestone`
- [ ] `src/types/consumer_protection.ts` — New types: `ConsumerProtectionPolicy`
- [ ] `src/db/schema.ts` — Add 4 new tables: `benchmark_scores`, `encryption_events`, `negotiation_milestones`, `consumer_protection_policies`
- [ ] `src/lib/digital2dozen.ts` — Hardcoded seed data: all 24 principles, clustered, with TPP source citations
- [ ] `src/lib/benchmarkData.ts` — Hardcoded compliance scores for all 11 countries × 24 principles (research-backed)
- [ ] `src/lib/encryptionData.ts` — Hardcoded encryption events (VPN bans, backdoor mandates, lawful intercept)
- [ ] `src/lib/consumerData.ts` — Hardcoded consumer protection data (platform liability, algorithmic audits)
- [ ] `src/lib/negotiationData.ts` — Hardcoded negotiation milestones (DEFA rounds, CPTPP, DEPA, bilateral DEAs)
- [ ] `src/services/benchmark.ts` — Service layer: `getBenchmarkScores()`, `getPrinciples()`, `getBenchmarkSummary()`
- [ ] `src/services/encryption.ts` — `getEncryptionEvents()`, `getEncryptionSummary()`
- [ ] `src/services/negotiation.ts` — `getNegotiations()`, `getNegotiationSummary()`
- [ ] `src/services/consumer_protection.ts` — `getConsumerProtectionPolicies()`
- [ ] Added to `src/types/index.ts` — re-export all new types
- [ ] Drizzle migration SQL generated

**Files Changed:** 14+ new files, ~3 modified files

---

### Sprint 2: Benchmark Heatmap Page (`/benchmark`)
**Goal:** A 24-principle × 11-country compliance heatmap with filtering, detail panels, and export.

**Deliverables:**
- [ ] `src/app/benchmark/page.tsx` — Server-rendered page with Hero banner and main content
- [ ] `src/components/benchmark/BenchmarkHeatmap.tsx` — Client component: 24×11 CSS Grid heatmap with color-coded cells
- [ ] `src/components/benchmark/ClusterFilter.tsx` — Toggle buttons for 5 thematic clusters
- [ ] `src/components/benchmark/CountryDetailPanel.tsx` — Slide-out drawer for per-country principle breakdown
- [ ] `src/components/benchmark/PrincipleDetailPopover.tsx` — Popover with TPP provision text and DEFA status
- [ ] `src/components/benchmark/BenchmarkExport.tsx` — Client-side CSV/JSON download button
- [ ] `src/components/benchmark/BenchmarkSummaryCard.tsx` — Aggregate scorecard per cluster per country
- [ ] Navigation link in `NAV_LINKS` (label: "Benchmark", icon: `BarChart3`)

**Files Changed:** 8 new files, 2 modified files

---

### Sprint 3: Technology Sovereignty Radar (`/tech-sovereignty`)
**Goal:** SVG radar chart tracking 5 technology sovereignty dimensions across all 11 ASEAN countries.

**Deliverables:**
- [ ] `src/app/tech-sovereignty/page.tsx` — Server-rendered page
- [ ] `src/components/tech-sovereignty/TechSovereigntyRadar.tsx` — Client component: SVG radar chart using `d3-shape` lineRadial
- [ ] `src/components/tech-sovereignty/CountryRadarCard.tsx` — Individual country radar card with 5-axis scores
- [ ] `src/components/tech-sovereignty/RadarComparison.tsx` — Overlay comparison of up to 4 countries simultaneously
- [ ] `src/components/tech-sovereignty/ViolationTimeline.tsx` — Chronological event log of forced tech transfer incidents
- [ ] `src/components/tech-sovereignty/IncidentMap.tsx` — Reuse existing `AseanMap` with incident dots
- [ ] Navigation link in `NAV_LINKS`

**Files Changed:** 7 new files, 1 modified file

---

### Sprint 4: Encryption & Digital Security Observatory (`/encryption`)
**Goal:** Dedicated tracker for encryption regulation changes: VPN bans, backdoor mandates, lawful intercept.

**Deliverables:**
- [ ] `src/app/encryption/page.tsx` — Server-rendered page
- [ ] `src/components/encryption/EncryptionEventList.tsx` — Filterable event log with severity badges
- [ ] `src/components/encryption/EncryptionSummaryStats.tsx` — Aggregate stats: # of VPN bans, # of backdoor mandates, etc.
- [ ] `src/components/encryption/EncryptionThreatMap.tsx` — Reuse `AseanMap` with encryption threat overlay
- [ ] `src/components/encryption/EncryptionTimeline.tsx` — Chronological timeline of encryption regulation milestones
- [ ] `src/components/encryption/EncryptionScorecard.tsx` — Per-country encryption freedom scorecard
- [ ] Navigation link in `NAV_LINKS`

**Files Changed:** 7 new files, 1 modified file

---

### Sprint 5: Consumer Protection Dashboard (`/consumer-protection`)
**Goal:** Tracking platform liability, algorithmic audits, dark patterns, breach notification mandates.

**Deliverables:**
- [ ] `src/app/consumer-protection/page.tsx` — Server-rendered page
- [ ] `src/components/consumer-protection/ConsumerPolicyGrid.tsx` — Grid of consumer protection policies per country
- [ ] `src/components/consumer-protection/PlatformLiabilityTable.tsx` — Comparison table of intermediary liability laws
- [ ] `src/components/consumer-protection/AlgorithmicAuditTracker.tsx` — Track audit mandates across ASEAN
- [ ] `src/components/consumer-protection/ConsumerScorecard.tsx` — Per-country consumer protection score
- [ ] Navigation link in `NAV_LINKS`

**Files Changed:** 6 new files, 1 modified file

---

### Sprint 6: Digital Trade Negotiations Timeline (`/negotiations`)
**Goal:** Gantt-style timeline tracking DEFA, CPTPP, DEPA, IPEF, and bilateral DEA negotiations.

**Deliverables:**
- [ ] `src/app/negotiations/page.tsx` — Server-rendered page
- [ ] `src/components/negotiations/NegotiationGantt.tsx` — Horizontal SVG timeline with milestones
- [ ] `src/components/negotiations/NegotiationFilters.tsx` — Filter by framework (DEFA / CPTPP / DEPA / IPEF / Bilateral)
- [ ] `src/components/negotiations/NegotiationCards.tsx` — Card-based alternative view for upcoming milestones
- [ ] `src/components/negotiations/NegotiationDetailModal.tsx` — Detail modal for each milestone
- [ ] Navigation link in `NAV_LINKS`

**Files Changed:** 6 new files, 1 modified file

---

### Sprint 7: IP & Trade Secret Risk Monitor (`/ip-monitor`)
**Goal:** Tracking trade secret theft, copyright safe harbors, patent disclosure mandates, AI training data risks.

**Deliverables:**
- [ ] `src/app/ip-monitor/page.tsx` — Server-rendered page
- [ ] `src/components/ip-monitor/IPTradeSecretTable.tsx` — Table of trade secret protection adequacy per country
- [ ] `src/components/ip-monitor/CopyrightSafeHarborMap.tsx` — Map overlay showing safe harbor status
- [ ] `src/components/ip-monitor/AIModelRiskCards.tsx` — Risk cards for AI model exfiltration per country
- [ ] `src/components/ip-monitor/IPScorecard.tsx` — Per-country IP protection score
- [ ] Navigation link in `NAV_LINKS`

**Files Changed:** 6 new files, 1 modified file

---

### Sprint 8: Integration, Homepage Module, Cross-Linking, Docs
**Goal:** Polish — integrated homepage module, cross-linking between all pages, documentation, and final review.

**Deliverables:**
- [ ] `src/components/landing/BenchmarkPreview.tsx` — Homepage module showing top-line benchmark scores
- [ ] Cross-linking from Observatory country modals to benchmark pages
- [ ] Cross-linking from Ledger policy rows to relevant Digital 2 Dozen principles
- [ ] Cross-linking from DEFA tracker to benchmark and negotiations
- [ ] Admin CRUD pages for benchmark scores (optional — Phase 1 uses hardcoded data)
- [ ] Update `AGENTS.md` for new architecture
- [ ] `docs/implementation/Digital2Dozen-PRD.md` — This document
- [ ] Clean up, test builds, verify all routes

**Files Changed:** 5+ new/modified files

---

## 4. Data Source Strategy

All Sprint 1-7 data is hardcoded in `src/lib/` files backed by real research. Sources include:
- USTR Digital 2 Dozen PDF (primary source text for each principle)
- OECD Digital Services Trade Restrictiveness Index (DSTRI)
- Freedom House "Freedom on the Net" reports
- ASEAN Secretariat DEFA negotiation updates
- AccessNow #KeepItOn shutdown tracker
- National legislation databases (Vietnam: vanban.chinhphu.vn, Indonesia: jdih.setneg.go.id, etc.)
- EngageMedia WordPress archives (existing ingestion pipeline)
- CSIS, Carnegie, ISEAS policy analysis

Supabase tables are created via Drizzle migrations but not depended on at runtime (hardcoded data is the source of truth until admin CRUD is built).

---

## 5. Total Deliverables

| Sprint | New Files | Modified Files | New Pages | New Components |
|---|---|---|---|---|
| Sprint 1 | 14 | 3 | 0 | 0 |
| Sprint 2 | 8 | 2 | 1 (`/benchmark`) | 5 |
| Sprint 3 | 7 | 1 | 1 (`/tech-sovereignty`) | 5 |
| Sprint 4 | 7 | 1 | 1 (`/encryption`) | 5 |
| Sprint 5 | 6 | 1 | 1 (`/consumer-protection`) | 4 |
| Sprint 6 | 6 | 1 | 1 (`/negotiations`) | 4 |
| Sprint 7 | 6 | 1 | 1 (`/ip-monitor`) | 4 |
| Sprint 8 | 5 | 2 | 0 | 1 |
| **Total** | **59** | **12** | **6** | **28** |

---

## 6. Navigation Architecture (Post-Implementation)

After all sprints, the header navigation will be:

| Route | Label | Icon | Current? |
|---|---|---|---|
| `/benchmark` | **Digital 2 Dozen** | `BarChart3` | New |
| `/tech-sovereignty` | **Tech Sovereignty** | `Cpu` | New |
| `/encryption` | **Encryption Observatory** | `Lock` | New |
| `/consumer-protection` | **Consumer Protections** | `Shield` | New |
| `/negotiations` | **Trade Deals Timeline** | `Calendar` | New |
| `/ip-monitor` | **IP & Trade Secrets** | `FileKey` | New |
| `/investigations` | Investigators | `BookOpen` | Existing |
| `/defa` | DEFA Tracker | `Activity` | Existing |
| `/observatory` | Cartographic Observatory | `Map` | Existing |
| `/ledger` | Policy Ledger | `Database` | Existing |
| `/threats` | Threat Matrix | `ShieldAlert` | Existing |
| `/intake` | Submit Dossier | `Send` | Existing |

The header will need a "More" dropdown or secondary navigation row to accommodate 12 items.
