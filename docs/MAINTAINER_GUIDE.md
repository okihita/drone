# DRONE — Maintainer Guide & Cognitive Load Reduction

> **Target Audience**: Core Maintainers, AI Pair Programmers, and Contributors  
> **Mission**: Keep the DRONE codebase maintainable, prevent documentation rot, and minimize mental overhead.  

---

## 🧠 Core Philosophy: Reduce Cognitive Overhead

As projects grow, developer friction often stems from:
1. **Fragmented sources of truth** (conflicting documentation across obsolete files).
2. **Manual compliance checking** (trying to memorize color hex codes and font rules).
3. **Configuration drift** (inconsistent package manager versions, unpinned scripts).
4. **Point-in-time document sprawl** (one-off audits committed to git and left to rot).

This guide outlines practical standards and automated guardrails to maintain high engineering velocity with minimal cognitive load.

---

## 1. 📖 The 3-Tier Documentation Standard

To avoid documentation sprawl, all project knowledge is organized into exactly three distinct tiers:

```
drone/
├── AGENTS.md                  # Tier 1: Living Operational Guardrails (AI & Human)
├── README.md                  # Tier 1: Project Overview & Developer Onboarding
│
└── docs/
    ├── ARCHITECTURE.md        # Tier 1: Technical Stack, Routing & Data Flow
    ├── BRAND_AND_DESIGN.md    # Tier 1: Design Tokens, ASEAN Colors & Typography
    ├── MAINTAINER_GUIDE.md    # Tier 1: Maintenance Workflows & Cognitive Hygiene
    │
    └── specs/                 # Tier 2: Living Feature Specifications
        ├── cartography.md     # GeoJSON map engine & ambient spotlighting
        ├── content-ingester.md# Automated WordPress cron ingestion
        ├── defa-suite.md      # ASEAN DEFA 5-module telemetry suite
        └── digital-2-dozen.md # D2D 24-principle compliance suite
```

### 🚫 Rules for Preventing "Doc Rot":
* **No Brainstorm Dumps**: Do not commit raw chat transcripts, personal meeting scratchpads, or temporary brainstorming notes into the repository.
* **No Stale Line-Number Audits**: Avoid committing review files containing hardcoded source code line numbers (e.g. `File.tsx:184`) as they become misleading after subsequent commits.
* **Update Specs in Place**: When a feature evolves (e.g. DEFA chapters or Ingester fields), update the corresponding file in `docs/specs/` rather than creating a new `06_...PRD.md`.

---

## 2. 🤖 Automation Over Memory (Guardrail Tooling)

Never rely on mental checklists when a CLI tool can enforce the rule automatically:

| Guardrail Requirement | Enforcement Tool | Command |
| :--- | :--- | :--- |
| **ASEAN Brand Colors** | `scripts/check-colors.js` | `pnpm run lint:colors` |
| **TypeScript & Linting** | ESLint 9 + Next.js Flat Config | `pnpm run lint` |
| **Unit & Integration Tests** | Vitest 4 | `pnpm test` |
| **Build & Type Checking** | Next.js 16 Turbopack Compiler | `pnpm run build` |

> [!TIP]
> Always run `pnpm run lint:colors` before pushing. It automatically intercepts forbidden generic Tailwind tokens (`amber-700`, `green-500`) and unapproved hex codes.

---

## 3. 📦 Deterministic Package Management with `pnpm 11`

* **Enforced Version**: The project is pinned to **`pnpm 11`** via `"packageManager": "pnpm@11.22.0"` in `package.json`.
* **Build Script Security**: Allowed native build scripts (`esbuild`, `sharp`, `unrs-resolver`) are explicitly declared in `pnpm-workspace.yaml`.
* **Deterministic Installs**: Always use `pnpm install --frozen-lockfile` in CI / production environments to guarantee reproducibility.

---

## 4. 📐 Architecture Boundaries & Code Patterns

Maintainers can navigate any part of the application by remembering these core conventions:

### Route Groups
* **`(home)`**: Public landing experience (cinematic hero, featured story carousel, editorial grid).
* **`(observatory)`**: Cartographic Observatory (`/observatory`), Verified Ledger (`/ledger`), and Defender Dossier Intake (`/intake`).
* **`defa/`**: 5-module ASEAN DEFA treaty monitoring suite.
* **`d2d/`**: 24-principle Digital 2 Dozen benchmarking suite.
* **`admin/`**: Authenticated content moderation and ingestion staging queue.
* **`api/`**: Serverless API routes and cron endpoints (`/api/cron/engagemedia-sync`).

### Data Layer Rules
1. **Server-Side Queries**: Wrap database fetching logic in `unstable_cache` with domain tags (e.g. `["news"]`, `["policies"]`).
2. **Mutations**: Invoke `revalidateTag()` upon administrative inserts/updates to keep public pages fresh without full rebuilds.
3. **Client-Side SWR**: Use SWR hooks for interactive search, filters, and tabular pagination.
4. **Sanitization**: Sanitize any rich text with `dompurify` / `isomorphic-dompurify` prior to injection.

---

## 5. ✅ Quick 4-Step Maintainer Pre-Flight Checklist

Before opening a PR or pushing to `main`:

```bash
# 1. Run color guardrail scanner
pnpm run lint:colors

# 2. Run linter
pnpm run lint

# 3. Run test suite
pnpm test

# 4. Verify Turbopack build
pnpm run build
```
