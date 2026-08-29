# DRONE — Engineering Architecture & System Design

> **Project**: DRONE (Digital Rights Oversight & Network Evaluator)  
> **Maintainer**: EngageMedia Research & Engineering Team  
> **Status**: Living Architecture Blueprint  

---

## 1. System Overview

DRONE is a policy intelligence observatory and automated monitoring portal for Southeast Asian digital rights, digital trade frameworks (ASEAN DEFA), AI governance, and cybersecurity regulations.

```mermaid
flowchart TD
    subgraph Client Layer
        A[Next.js 16 App Router & React 19] --> B[Tailwind CSS v4 & ASEAN Theme Tokens]
        A --> C[Interactive SVG Cartography / D3-Geo]
        A --> D[Dual Language System: EN / ID]
    end

    subgraph Data & Server Layer
        E[Next.js Server Actions & Route Handlers] --> F[Tier 1: Supabase PostgreSQL & Auth]
        E --> G[Tier 2: Airtable Headless CMS]
        E --> H[Tier 3: Static Benchmark Models]
    end

    subgraph Automation & Ingestion
        I[GitHub Actions Scheduled Cron] --> J[/api/cron/engagemedia-sync]
        J --> K[WordPress REST API Source]
        K --> L[Admin Staging Queue /admin/ingester]
    end

    A <--> E
```

---

## 2. Three-Tier Data Architecture

| Tier | Technology | Domain / Responsibilities | Caching / Performance |
| :--- | :--- | :--- | :--- |
| **Tier 1: Relational CMS & Auth** | **Supabase (PostgreSQL)** + `@supabase/ssr` | Policies, News items, Admin Auth, Ingestion staging queue | Server Actions, RLS, cookies |
| **Tier 2: Headless Editorial CMS** | **Airtable REST API** | Curated policy links (`/links`), researcher intake | Next.js ISR (1h) in prod, `no-store` in dev |
| **Tier 3: Intelligence Matrices** | **Static TypeScript Datasets** (`src/lib/*Data.ts`) | Digital 2 Dozen, DEFA chapters, Cartographic GeoJSON | Zero-latency, version-controlled in Git |

---

## 3. Core Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.x (App Router, Turbopack) | Server Components, Streaming Suspense, Route Handlers, Proxy |
| **UI Library** | React 19 | Concurrency, Server Actions, hooks |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/postcss` | Utility classes, ASEAN design tokens |
| **Database & Auth** | Supabase (PostgreSQL) + `@supabase/ssr` | Persistent storage, auth cookies, RLS |
| **Editorial CMS** | Airtable API | Collaborative spreadsheet CMS for curated policy links |
| **Data Fetching** | SWR (`swr`) | Client-side reactive data synchronization & caching |
| **Package Manager** | `pnpm 11` | Fast, deterministic dependency management |
| **Testing** | Vitest (`vitest`) + Testing Library | Fast unit and component testing |

---

## 3. Directory Layout & Route Architecture

```
src/
├── app/
│   ├── (home)/                 # Homepage route group
│   │   └── page.tsx            # Hero carousel, map canvas, and editorial grid
│   ├── (observatory)/          # Observatory route group with shared PageShell
│   │   ├── observatory/        # Cartographic jurisdiction map & regime filters
│   │   ├── ledger/             # Searchable verified regulatory ledger table
│   │   └── intake/             # Encrypted civil society submission portal
│   ├── defa/                   # ASEAN DEFA 5-Module Telemetry Suite
│   │   ├── chapters/           # 14 DEFA negotiation chapters tracker
│   │   ├── data-governance/    # Cross-border data flows & localization regimes
│   │   ├── civil-society/      # Digital rights impact & advocacy alerts
│   │   ├── ai-ethics/          # National AI frameworks & MMAI oversight
│   │   └── payments-cyber/     # E-payments & cybersecurity compliance
│   ├── d2d/                    # USTR Digital 2 Dozen Compliance Suite
│   │   ├── benchmark/          # 24-Principle heatmap & compliance scores
│   │   ├── consumer-protection/# Dark patterns & consumer digital safety
│   │   ├── encryption/         # Lawful intercept, backdoor & VPN regulations
│   │   ├── ip-monitor/         # AI training data & IP protection metrics
│   │   ├── negotiations/       # Timeline of regional trade agreements
│   │   └── tech-sovereignty/   # Source code disclosure & tech transfer radar
│   ├── investigations/         # Long-form investigative editorial reporting
│   │   ├── page.tsx            # Article index
│   │   └── [slug]/page.tsx     # Full editorial reading layout
│   ├── admin/                  # Authenticated Admin Dashboard & HITL Queue
│   │   ├── ingester/           # WordPress content ingestion review & triage
│   │   ├── jurisdictions/      # Country regime & posture editor
│   │   ├── news/               # Press and news post editor
│   │   └── policies/           # Regulatory decree ledger CRUD
│   └── api/                    # Serverless API routes
│       ├── cron/engagemedia-sync # Authenticated content ingestion endpoint
│       ├── jurisdictions/[code]  # Country dossier metadata endpoint
│       ├── policies/             # Regulatory ledger query endpoint
│       └── revalidate/           # On-demand tag/path cache invalidation
├── components/                 # Reusable UI & Domain Components
│   ├── benchmark/              # D2D heatmap, radar, and subnav components
│   ├── defa/                   # DEFA suite interactive components
│   ├── encryption/             # Encryption timeline & summary stats
│   ├── landing/                # Hero section, carousel, map canvas, editorial grid
│   ├── observatory/            # Jurisdiction cards, filter bar, search inputs
│   ├── tech-sovereignty/       # Radar visualization & violation timeline
│   ├── ui/                     # Base UI primitives (dialog, button, input, badge)
│   ├── Header.tsx              # Site masthead with desktop dropdown & mobile drawer
│   ├── Footer.tsx              # Server-rendered global footer
│   ├── AseanMap.tsx            # Full interactive GeoJSON cartographic map
│   └── PolicyLedgerTable.tsx   # Verified ledger data table
├── db/                         # Drizzle schema definitions & client initialization
├── lib/                        # Utilities, color definitions, constants, and server cache helpers
├── services/                   # Business logic services (news, policies, jurisdictions)
└── types/                      # Shared TypeScript interface and type definitions
```

---

## 4. Data Layer & Caching Strategy

1. **Server-Side Caching (`unstable_cache`)**:
   - Heavy database queries (e.g., all published news, jurisdiction profiles, regulatory policies) are wrapped in `unstable_cache` with tagged cache keys (e.g., `["news"]`, `["policies"]`, `["jurisdictions"]`).
2. **On-Demand Cache Revalidation**:
   - When admin mutations occur in `/admin/*`, `revalidateTag()` is invoked to purge cached representations immediately without rebuilding the whole app.
3. **Client-Side SWR**:
   - Client components interactively filter, paginate, and search via SWR keys, ensuring zero-latency transitions and automatic background re-validation.

---

## 5. Security & Authentication Guardrails

- **Authentication**: Supabase Auth sessions are validated through server middleware and Server Actions.
- **Admin Isolation**: Public routes never expose Supabase Service Role keys. Admin operations are strictly server-side.
- **Sanitization**: All user-submitted and TipTap HTML rich text content is sanitized with `dompurify` / `isomorphic-dompurify` prior to rendering.
- **Cron Security**: Ingestion endpoint (`/api/cron/engagemedia-sync`) validates a bearer token against `CRON_SECRET`.
