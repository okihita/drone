# DRONE — Full Codebase Review & Scorecard

**Date:** 2026-07-30  
**Review Type:** Comprehensive architecture, security, quality audit  
**Overall Score:** **6.5 / 10**

---

## Category Breakdown

| # | Category | Score | Weight | Weighted | Target |
|---|---|---|---|---|---|
| 1 | Architecture & Structure | 7.0 | 15% | 1.05 | **10** |
| 2 | Code Quality & Patterns | 6.5 | 20% | 1.30 | **10** |
| 3 | TypeScript | 7.0 | 10% | 0.70 | **10** |
| 4 | Error Handling | 5.0 | 10% | 0.50 | **10** |
| 5 | Security | 4.5 | 15% | 0.68 | **10** |
| 6 | Performance | 7.0 | 10% | 0.70 | **10** |
| 7 | Accessibility | 5.0 | 10% | 0.50 | **10** |
| 8 | Testing | 1.0 | 5% | 0.05 | **10** |
| 9 | Documentation | 8.0 | 5% | 0.40 | **10** |
| **TOTAL** | | | | **6.48/10** | **10/10** |

---

## 1. Architecture & Structure — 7.0 / 10

### Strengths
- Clean App Router layout with proper `loading.tsx`, `error.tsx`, and `not-found.tsx` boundaries at root
- Strong separation of concerns: `components/`, `services/`, `lib/`, `types/`, `db/` each have clear responsibilities
- Feature-organized routes (`d2d/`, `investigations/`, `observatory/`, `defa/`, `intake/`)
- Dynamic imports prevent Supabase dependency from breaking builds when env vars are absent

### Weaknesses
- **`src/proxy.ts` is dead code.** `src/middleware.ts` doesn't exist, and nothing imports proxy.ts. Admin routes have **no authentication** — see Security.
- **Zero `revalidate` or `dynamic` exports across `src/app/`.** Every page is statically rendered at build time and will serve stale data indefinitely after deployment. The homepage, ledger, observatory — all will show frozen data.
- 1,412 lines of static data in JS files (`benchmarkData.ts`, `encryptionData.ts`, `negotiationData.ts`, etc.) that belong in the database or CMS

### Improvement Plan
1. [ ] Rename `src/proxy.ts` → `src/middleware.ts` and verify middleware is active
2. [ ] Add `export const revalidate = 3600` to all data-dependent pages
3. [ ] Migrate 1,412 lines of static data to database seeds or CMS
4. [ ] Ensure consistent `loading.tsx` and `error.tsx` boundaries on all route segments

---

## 2. Code Quality & Patterns — 6.5 / 10

### Strengths
- Consistent `cva`-based variant system (button, badge, etc.) — clean and composable
- `as const` arrays → derived union types pattern is idiomatic and type-safe
- Clean barrel exports in `types/index.ts` and `services/`
- Custom color guardrail linter (`scripts/check-colors.js`) enforces brand palette

### Weaknesses
- **Footer.tsx has `"use client"` but zero interactivity** — no hooks, no event handlers, no browser APIs. Pure presentational component.
- **Type erosion in `news.ts`**: data is cast to `Record<string, unknown>[]` and manually mapped with `as` assertions, bypassing Supabase return types entirely.
- **`RichTextEditor.tsx` uses `(editor.commands as any).setImageCaption`** — an unsafe cast to call a potentially non-existent command.
- **Mid-file imports** in `constants.ts` (lucide-react at line 77), `HeroMapCanvas.tsx` (flag components at line 42)
- Hardcoded values: year in Footer (`© 2026`), corridor count in HeroMapCanvas (`"8 Data Flow Corridors"`), principle IDs in `BENCHMARK_CLUSTERS` (magic numbers 1-24)

### Improvement Plan
1. [ ] Remove `"use client"` from Footer.tsx; create server-compatible Footer
2. [ ] Replace `Record<string, unknown>[]` casts in `news.ts` with proper Drizzle-inferred or Zod-validated types
3. [ ] Fix RichTextEditor image insertion — use standard TipTap API instead of `as any`
4. [ ] Move all imports to top of file
5. [ ] Replace all hardcoded values with derived/constant references
6. [ ] Add ESLint rules to prevent these patterns from recurring

---

## 3. TypeScript — 7.0 / 10

### Strengths
- Strict mode enabled across the project
- Domain-specific types for all entities with `Pick<>`/`Omit<>` for narrow views
- `ThreatLevel`, `PolicyCategory`, `MapFilterMode` derived from `as const` arrays — single source of truth

### Weaknesses
- **No runtime validation layer.** Types are compile-time only. A Supabase column rename produces objects with silent `undefined` fields.
- **`NewsItem.category` is typed as `string`**, not a union of valid categories from `NEWS_CATEGORIES`.
- **`as` casts bypass types** in `news.ts` service functions, `RichTextEditor`, and several admin pages
- Service functions accept over-permissive `Partial<Entity>` types — callers could mutate `id`, `created_at`, etc.

### Improvement Plan
1. [ ] Add Zod schemas to all entity types for runtime validation
2. [ ] Change `NewsItem.category` from `string` to a union type derived from `NEWS_CATEGORIES`
3. [ ] Eliminate all unsafe `as` casts; replace with type guards or validation
4. [ ] Tighten service function parameter types (`Omit<Entity, "id" | "created_at">`)
5. [ ] Add `satisfies` checks on data constants against their type interfaces
6. [ ] Use Drizzle `inferSelect`/`inferInsert` for database-derived types

---

## 4. Error Handling — 5.0 / 10

### Strengths
- `news.ts` correctly handles `PGRST116` (0 rows) in `getNewsById` → returns `null`
- Cron endpoint has proper `err: unknown` → `instanceof Error` → `String(err)` pattern
- `loading.tsx` / `error.tsx` / `not-found.tsx` boundaries exist at root and for investigation pages

### Weaknesses
- **Homepage (`page.tsx`) has zero error handling** — if Supabase is down, the entire page crashes.
- **`policies.ts` and `jurisdictions.ts` don't handle `PGRST116`** on `.single()` queries — throws a generic error instead of returning `null`.
- **`engagemedia-sync.ts`: overbroad catch** in `getNewsBySlug` checks for `42703` but silently swallows all query errors.
- **`admin/page.tsx`** uses `Promise.all` — if two queries fail, only the first error is shown.
- **`error.tsx`** destructures only `reset`, never logs or displays the `error` prop.
- **Supabase cookie errors silently swallowed** in `login/actions.ts`.

### Improvement Plan
1. [ ] Wrap homepage data fetches in try/catch with graceful degradation (fallback UI when DB unavailable)
2. [ ] Add consistent `PGRST116` handling to all `.single()` queries (policies.ts, jurisdictions.ts)
3. [ ] Narrow catch blocks to specific error codes; re-throw unexpected errors
4. [ ] Replace `Promise.all` with `Promise.allSettled` in admin dashboard for partial-failure resilience
5. [ ] Display `error.digest` in `error.tsx` for user reporting
6. [ ] Add structured error logging (at minimum `console.error` in production)
7. [ ] Add `useEffect(() => { console.error(error) }, [error])` in error.tsx
8. [ ] Throw or log loudly when cookie auth fails in login actions

---

## 5. Security — 4.5 / 10

### 🔴 CRITICAL: Admin routes have no authentication
`src/proxy.ts` is dead code — it's named `proxy.ts` instead of `middleware.ts`, and nothing imports it. Visiting `/admin` directly bypasses all auth.

### Strengths
- Cron endpoint uses `CRON_SECRET` Bearer token auth with graceful dev fallback
- Content-Security-Policy headers, HSTS with preload, `X-Frame-Options: DENY`, `nosniff` in next.config.ts
- Supabase RLS likely in place (not verifiable from code alone)

### Weaknesses
- **No CSP header** in `next.config.ts` — the most critical security header
- **No file validation** in `news.ts:uploadNewsImage` — no MIME-type check, no size limit.
- **Gemini API key in URL query string** (`engagemedia-sync.ts`) — leaks if request URLs are logged
- **PostgREST filter injection risk** in `policies.ts:searchPoliciesServer` — user input in `.or()` with `%` wildcards
- `getClient()` in engagemedia-sync **silently falls back to anon client** when service role key is missing
- Middleware's `request.cookies.set()` is a **no-op** — NextRequest cookies are read-only in middleware

### Improvement Plan
1. [ ] **CRITICAL:** Rename `src/proxy.ts` → `src/middleware.ts` and verify all `/admin/*` routes redirect unauthenticated users
2. [ ] Add Content-Security-Policy header to `next.config.ts`
3. [ ] Add file type (image/* only) and size (e.g., 5MB max) validation to `uploadNewsImage`
4. [ ] Sanitize search query input in `searchPoliciesServer` (escape PostgREST special chars)
5. [ ] Make `getClient()` in engagemedia-sync throw or log loudly when service key is absent
6. [ ] Remove `request.cookies.set()` from middleware (dead no-op)
7. [ ] Add rate limiting to login action
8. [ ] Verify Supabase RLS policies on all tables
9. [ ] Move Gemini API key from URL query string to request headers if possible

---

## 6. Performance — 7.0 / 10

### Strengths
- Server Components used by default; only interactive parts are `"use client"` (29 of 72 `.tsx` files)
- Dynamic `import()` for Supabase-dependent services — app renders without database
- `useMemo` on computed arc data and country lookups in map components

### Weaknesses
- `minimumCacheTTL: 86400` (24h) — masks slow origins. Image updates take a full day to propagate.
- Footer image: `next/image` loads at `768×230` but renders at `h-14` (~3.5rem = 56px). Massive overfetch.
- `RichTextEditor` calls `editor.getHTML()` during React render — expensive sync operation running on every toolbar re-render
- 1,412 lines of static data shipped in JS bundle — should be in the DB or statically generated at build time
- No `revalidate` means pages render once at build and never refresh

### Improvement Plan
1. [ ] Reduce `minimumCacheTTL` from 86400 to 3600 (1h)
2. [ ] Optimize Footer image: use smaller source image or proper `sizes` prop
3. [ ] Memoize `getHTML()` result in RichTextEditor; compute on content change only
4. [ ] Add `export const revalidate = 3600` to dynamic pages (ISR)
5. [ ] Lazy-load benchmark/encryption data with dynamic imports or move to DB
6. [ ] Add `loading="lazy"` to below-fold images
7. [ ] Audit bundle size with `@next/bundle-analyzer`

---

## 7. Accessibility — 5.0 / 10

### Strengths
- `aria-current="page"`, `aria-expanded`, `aria-label` on interactive elements in Header
- Semantic HTML: `<nav>`, `<header>`, `<footer>`, proper heading hierarchy
- `skip-to-content` pattern present
- Dark mode support throughout with proper contrast

### Weaknesses
- **SVG maps (AseanMap, HeroMapCanvas) are completely inaccessible** — `<path>` and `<g>` elements have `onClick` but no `role="button"`, `tabIndex={0}`, `aria-label`, or `onKeyDown` handlers.
- **HeroSection tabs** lack ARIA roles: no `role="tablist"`, `role="tab"`, `aria-selected`, or `tabIndex` management
- **BenchmarkHeatmap table** has no `scope="col"`/`scope="row"`, no `<caption>`, no `aria-sort`
- **Modal (AseanMap) lacks** `aria-modal="true"`, `role="dialog"`, focus trap, and ESC key dismissal
- **`loading.tsx`** missing `aria-busy="true"` and `aria-label="Loading"`
- **Mobile menu** (Header) has no ESC key dismissal, no focus trap, no `aria-controls` linking toggle to panel

### Improvement Plan
1. [ ] Add `role="button"`, `tabIndex={0}`, `aria-label`, `onKeyDown` to SVG map country elements
2. [ ] Add `role="tablist"`, `role="tab"`, `aria-selected`, `tabIndex` to HeroSection tabs with keyboard navigation
3. [ ] Add `scope="col"`/`scope="row"`, `<caption>`, `aria-sort` to BenchmarkHeatmap
4. [ ] Add `aria-modal="true"`, `role="dialog"`, focus trap, ESC dismissal to map modal
5. [ ] Add `aria-busy="true"` and `aria-label="Loading"` to loading.tsx
6. [ ] Add ESC key dismissal, focus trap, and `aria-controls` to mobile menu
7. [ ] Ensure all form inputs have associated `<label>` elements
8. [ ] Verify color contrast ratios across light and dark themes

---

## 8. Testing — 1.0 / 10

### Current State
**Zero test files across the entire 161-file codebase.** No `*.test.ts`, `*.spec.ts`, no test runner (Jest, Vitest, Playwright), no test dependencies in `package.json`.

### Improvement Plan
1. [ ] Install and configure Vitest + React Testing Library
2. [ ] Write unit tests for all service modules (mock Supabase client)
3. [ ] Write unit tests for utility functions (text.ts, cache.ts, aseanGeo.ts)
4. [ ] Write integration tests for auth flow (login → redirect → protected page)
5. [ ] Write integration tests for cron sync pipeline (mock WordPress API + Gemini)
6. [ ] Write component tests for critical UI (BenchmarkHeatmap, AseanMap, RichTextEditor)
7. [ ] Add Playwright for E2E smoke tests (homepage renders, admin auth flow)
8. [ ] Add CI step to run tests on PR
9. [ ] Achieve 80%+ code coverage on services and utilities
10. [ ] Add accessibility tests (axe-core or @axe-core/react)

---

## 9. Documentation — 8.0 / 10

### Strengths
- Comprehensive README with architecture overview, setup guide, and feature list
- 16 markdown documents across `docs/analysis/`, `docs/brainstorm/`, `docs/implementation/`
- `AGENT_GUARDRAILS.md` defines 16 mandatory branding rules for AI coding agents
- Well-commented CSS animations and dark mode logic
- `.env.example` documents all required variables
- TypeScript types serve as inline API documentation

### Weaknesses
- No inline JSDoc documentation for service functions (parameters, return types, errors)
- Missing component reference for the 29 client components
- `src/lib/cache.ts` has a misleading comment claiming hierarchical tag busting works (Next.js doesn't support it)

### Improvement Plan
1. [ ] Add JSDoc to all exported service functions (params, returns, throws)
2. [ ] Add JSDoc to all shared utility functions in `src/lib/`
3. [ ] Fix misleading cache tag comment in `cache.ts`
4. [ ] Create `docs/COMPONENTS.md` with component inventory and usage guidelines
5. [ ] Add inline comments explaining non-obvious business logic
6. [ ] Ensure README includes all setup steps (verified from scratch)
7. [ ] Add architecture diagram to README or docs/
8. [ ] Document all API routes (endpoint, method, auth, response format)

---

## Priority Action Summary

### 🔴 Critical (Fix immediately)
1. Rename `src/proxy.ts` → `src/middleware.ts` — Admin routes have zero auth. This is a live security vulnerability.
2. Add `export const revalidate = 3600` to all data-dependent pages — they're serving stale data indefinitely.

### 🟠 High (Fix this sprint)
3. Add error boundaries to homepage — crash if Supabase is down is terrible UX.
4. Fix type erosion in `news.ts` — replace `Record<string, unknown>[]` casts with proper types.
5. Add file validation to `uploadNewsImage` — MIME-type and size checks.
6. Handle `PGRST116` in `policies.ts` and `jurisdictions.ts` — return `null` on not-found.

### 🟡 Medium (This quarter)
7. Add keyboard/screen-reader support to SVG maps — `role`, `tabIndex`, `aria-label`, `onKeyDown`.
8. Fix ARIA roles on HeroSection tabs and BenchmarkHeatmap table.
9. Remove `"use client"` from Footer.tsx.
10. Write initial tests — service-layer unit tests and auth flow tests minimum.

### 🟢 Low (Nice to have)
11. Add Zod runtime validation to types.
12. Add CSP header to `next.config.ts`.
13. Replace `as any` cast in RichTextEditor image insertion.
14. Make Footer year dynamic.
15. Add `Promise.allSettled` in admin dashboard.
