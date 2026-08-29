# DRONE — Engineering Architecture & System Design

> **Project**: DRONE (Digital Rights Oversight & Network Evaluator)  
> **Maintainer**: EngageMedia Research & Engineering Team  
> **Status**: Living Architecture Blueprint  

---

## 1. System Overview

DRONE is a policy intelligence observatory and automated monitoring portal for Southeast Asian digital rights, digital trade frameworks (ASEAN DEFA), AI governance, and semiconductor supply chains (Pax Silica).

```mermaid
flowchart TD
    subgraph Client Layer
        A[Next.js 16 App Router & React 19] --> B[Tailwind CSS v4 & ASEAN Theme Tokens]
        A --> C[Interactive SVG Cartography / D3-Geo]
        A --> D[Dual Language System: EN / ID]
    end

    subgraph Data & Server Layer
        E[Next.js Server Components & Route Handlers] --> F[Tier 1: Airtable Headless CMS]
        E --> G[Tier 2: Static Benchmark & Treaty Datasets]
    end

    subgraph Automation & Ingestion
        H[GitHub Actions / Vercel Cron] --> I[/api/cron/engagemedia-sync]
        I --> J[WordPress REST API Source]
        J --> K[Gemini Flash LLM Classification]
        K --> F
    end

    A <--> E
```

---

## 2. Two-Tier Data Architecture

| Tier | Technology | Domain / Responsibilities | Caching / Performance |
| :--- | :--- | :--- | :--- |
| **Tier 1: Headless Editorial CMS** | **Airtable REST API** (`appu4obXmSR8kzkYx`) | Curated Links (`/links`), News & Investigations, Policies Ledger, Jurisdiction Profiles | Edge ISR (`revalidate: 60`, cache tags) in prod, `no-store` in dev |
| **Tier 2: Intelligence Matrices** | **Static TypeScript Datasets** (`src/lib/*Data.ts`) | Digital 2 Dozen, DEFA chapters, Cartographic GeoJSON | Zero-latency, version-controlled in Git, 100% Edge static pre-rendering |

---

## 3. Core Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.x (App Router, Turbopack) | Server Components, Streaming Suspense, Edge ISR, Route Handlers |
| **UI Library** | React 19 | Concurrency, Server Components, client hooks |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/postcss` | Utility classes, custom ASEAN brand design tokens |
| **Headless CMS** | Airtable REST API (`airtableClient.ts`) | Collaborative spreadsheet CMS for all editorial content |
| **Data Fetching** | SWR (`swr`) | Client-side reactive table search and filtering |
| **Package Manager** | `pnpm 11` | Fast, deterministic dependency management |
| **Testing** | Vitest (`vitest`) + Testing Library | Fast unit and component testing |

---

## 4. Directory Layout & Route Architecture

```
src/
├── app/
│   ├── (home)/                 # Homepage route group
│   │   └── page.tsx            # Hero radar map, atelier editorial, and lead dispatches
│   ├── (observatory)/          # Observatory route group with shared PageShell
│   │   ├── observatory/        # Cartographic jurisdiction map & regime filters
│   │   ├── ledger/             # Searchable verified regulatory ledger table
│   │   └── intake/             # Encrypted civil society submission portal
│   ├── links/                  # Curated trade & digital policy links directory
│   ├── defa/                   # ASEAN DEFA 5-Module Telemetry Suite
│   │   ├── chapters/           # 9 DEFA negotiation chapters tracker
│   │   ├── data-governance/    # Cross-border data flows & localization regimes
│   │   ├── civil-society/      # Digital rights impact & advocacy alerts
│   │   ├── ai-ethics/          # National AI frameworks & MMAI oversight
│   │   └── payments-cyber/     # E-payments & cybersecurity compliance
│   ├── d2d/                    # Digital 2 Dozen Compliance Suite
│   │   ├── benchmark/          # 24-Principle heatmap & compliance scores
│   │   ├── consumer-protection/# Dark patterns & consumer digital safety
│   │   ├── encryption/         # Lawful intercept, backdoor & VPN regulations
│   │   ├── ip-monitor/         # AI training data & IP protection metrics
│   │   ├── negotiations/       # Timeline of regional trade agreements
│   │   └── tech-sovereignty/   # Source code disclosure & tech transfer radar
│   ├── investigations/         # Long-form investigative editorial reporting
│   │   ├── page.tsx            # Article index
│   │   └── [slug]/page.tsx     # Full editorial reading layout
│   └── api/                    # Serverless API routes
│       ├── cron/engagemedia-sync # Daily automated WordPress crawler
│       ├── jurisdictions/[code]  # Country dossier metadata endpoint
│       └── policies/             # Regulatory ledger query endpoint
├── components/                 # Reusable UI & Domain Components
│   ├── benchmark/              # D2D heatmap, radar, and subnav components
│   ├── defa/                   # DEFA suite interactive components
│   ├── landing/                # Hero section, map canvas, core capabilities
│   ├── links/                  # Curated links grid, filter pills, empty state
│   ├── observatory/            # Jurisdiction cards, filter bar, AseanMap
│   ├── layout/                 # Header, Footer, PageShell, ThemeToggle, LanguageSwitcher
│   └── ui/                     # Base UI primitives (dialog, button, input, badge)
├── lib/                        # Utilities, color definitions, constants, and validation
├── services/                   # Business logic services (airtableClient, news, policies, jurisdictions)
└── types/                      # Shared TypeScript interface and type definitions
```

---

## 5. Data Layer & Edge Caching Strategy

1. **Edge Incremental Static Regeneration (ISR)**:
   - All public pages (`/`, `/links`, `/ledger`, `/observatory`, `/investigations`) are pre-rendered statically at build time.
   - Live Airtable queries run with `{ next: { revalidate: 60, tags: [tableName] } }`. Content edits in Airtable automatically reflect globally within 60 seconds.
2. **Zero Dynamic Cookie Blocking**:
   - The root layout contains zero cookie reads, guaranteeing all routes achieve sub-20ms TTFB directly from Vercel's global Edge CDN.
3. **Automated Content Ingestion Pipeline**:
   - `/api/cron/engagemedia-sync` runs on schedule, fetches published WordPress articles from EngageMedia, uses Gemini 2.0 Flash to classify them by jurisdiction/category/threat level, and writes directly into Airtable's `News` table.

---

## 6. Security Guardrails

- **Zero Admin Attack Surface**: No `/admin` endpoints, no authentication cookie sessions, and no user databases to compromise.
- **Credential Protection**: Airtable PAT is server-side only (`process.env.AIRTABLE_PAT`) and never exposed in client bundles.
- **Sanitization**: All user-submitted intake dossiers and editorial HTML are sanitized with `isomorphic-dompurify` prior to rendering.
- **Cron Authentication**: Ingestion endpoint requires a valid `Bearer ${CRON_SECRET}` authorization header.
