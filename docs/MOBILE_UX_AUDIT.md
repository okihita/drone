# DRONE — Mobile UI/UX Audit & Scorecard

**Date:** 2026-07-30  
**Branch:** `mobile-ui`  
**Scope:** 66 `.tsx` files, 2 agents ran independent deep audits  
**Overall Score:** **4.8 / 10**

---

## Category Breakdown

| # | Aspect | Score | Weight | Key Issues |
|---|---|---|---|---|
| 1 | Navigation & Wayfinding | 4.0 | 15% | No scroll-lock/focus-trap on drawer; group context lost on mobile |
| 2 | Touch Targets & Interaction | 3.0 | 15% | 24px admin buttons; 23px country flags; carousel arrows touch-invisible |
| 3 | Layout & Responsiveness | 5.5 | 15% | Form grids never collapse; D2DSubNav hardcoded top; hero map too tall |
| 4 | Typography & Readability | 4.0 | 10% | 9px–10px text pervasive; SVG labels illegible; tagline unreadable |
| 5 | Content Hierarchy | 5.0 | 10% | Regime posture hidden on mobile; carousel fills 75% viewport |
| 6 | Forms & Data Entry | 6.0 | 10% | Admin forms mostly OK; input heights below 44px but iOS-zoom-safe |
| 7 | Maps & Data Visualization | 3.0 | 15% | No touch hover fallback; tiny SVG hit areas; heatmap popover mouse-only |
| 8 | Performance & Technical | 5.0 | 10% | No touch-action:manipulation; no dvh; no overscroll-behavior |

---

## 1. Navigation & Wayfinding — **4.0 / 10**

### Critical Issues

| # | File | Line | Issue |
|---|---|---|---|
| 1.1 | `Header.tsx` | 184 | **No body scroll-lock** when mobile drawer is open. Background content scrolls behind drawer |
| 1.2 | `Header.tsx` | 184 | **No focus trap** — Tab key escapes to hidden elements behind drawer |
| 1.3 | `Header.tsx` | 185 | Mobile drawer flattens `NAV_GROUPS` — D2D submenu children shown but parent "Digital 2 Dozen" label absent, losing grouping context |

### Medium Issues
| # | Issue |
|---|---|
| 1.4 | Mobile drawer has no slide/transition animation — appears instantly with conditional render |
| 1.5 | ~120px of sticky chrome (masthead + nav bar + admin bar) consumes 50%+ of small viewports |
| 1.6 | No `aria-modal` / `role="dialog"` on mobile drawer |
| 1.7 | No active-state persistence — user on `/d2d/benchmark` sees no visual context of their section |

---

## 2. Touch Targets & Interaction — **3.0 / 10**

### Critical Issues

| # | File | Line | Element | Current Size | Required |
|---|---|---|---|---|---|
| 2.1 | `admin/page.tsx` | 93,96,146,149,184,187 | Edit/View icon buttons | **24×24px** | 44×44px |
| 2.2 | `admin/page.tsx` | 91 | Edit/View button spacing | **`gap-0.5`** (2px) | ≥8px |
| 2.3 | `FeaturedCarousel.tsx` | 50,57,138,148 | Mobile prev/next arrows rely on **`group-hover:opacity-100`** — impossible on touch | — | Touch events |

### High Issues
| # | File | Line | Element | Current Size |
|---|---|---|---|---|
| 2.4 | `admin/RichTextEditor.tsx` | 40 | Toolbar buttons | 32×32px (`h-8 w-8`) |
| 2.5 | `admin/RichTextEditor.tsx` | 207 | Toolbar button spacing | `gap-0.5` (2px) |
| 2.6 | `AseanMap.tsx` | 372 | Flag dock buttons | ~20×30px |
| 2.7 | `HeroMapCanvas.tsx` | 372 | Flag dock buttons | ~20×40px |
| 2.8 | `ui/button.tsx` | 25 | `xs` variant | 24px (`h-6`) |
| 2.9 | `Header.tsx` | 89 | Hamburger | ~36px (`p-2`) |
| 2.10 | `Sidebar.tsx` | 149 | Mobile hamburger | ~32px (`p-1.5`) |
| 2.11 | `Sidebar.tsx` | 107 | Close button (X) | ~24px (`p-1`) |

---

## 3. Layout & Responsiveness — **5.5 / 10**

### Critical Issues

| # | File | Line | Issue |
|---|---|---|---|
| 3.1 | `D2DSubNav.tsx` | 13 | Hardcoded `top-[72px]` — breaks when AdminBar is present, creating overlapping navigation layers |
| 3.2 | `admin/policies/new/page.tsx` | 103 | `grid-cols-3` with NO responsive variant — 3 columns at 320px = ~95px per field, unusable |
| 3.3 | `admin/news/new/page.tsx` | 120 | `grid-cols-2` with NO responsive variant — tight on small screens |

### High Issues
| # | Issue |
|---|---|
| 3.4 | `HeroSection.tsx:188` — Map viewport `min-h-[540px]` on mobile = ~80% of iPhone SE viewport |
| 3.5 | `FeaturedCarousel.tsx:63` — Card `min-h-[500px]` = ~75% of mobile screen. Combined with hero above, user scrolls ~1200px before seeing any other content |
| 3.6 | `D2DSubNav.tsx:15` — `overflow-hidden` on sticky container conflicts with `overflow-x-auto` on inner div |

### Medium Issues
| # | Issue |
|---|---|
| 3.7 | Sidebar overlays content on mobile — correct pattern, but no body scroll-lock (see 1.1) |
| 3.8 | Breakpoints skip `md:` in several components (Header title, HeroSection padding) |
| 3.9 | `AseanMap.tsx:82-91` — Filter buttons may overflow container on <360px screens, no `flex-wrap` |

---

## 4. Typography & Readability — **4.0 / 10**

### Critical Issues

| # | File | Line | Text Size | Actual pt | WCAG Min |
|---|---|---|---|---|---|
| 4.1 | `HeroMapCanvas.tsx` | 172 | `text-[10px]` SVG labels | ~6–7 CSS px on phone | ≥12px |
| 4.2 | `AseanMap.tsx` | 246 | `fontSize="9"` SVG labels | ~6 CSS px on phone | ≥12px |
| 4.3 | `ViolationTimeline.tsx` | 68 | `text-[9px]` country names | 6.75pt | ≥9pt |

### High Issues
| # | File | Issue |
|---|---|---|
| 4.4 | `Header.tsx:79` | Site tagline "Digital Rights Oversight & Network Evaluator" at `text-[10px] uppercase tracking-wider` — illegible on mobile |
| 4.5 | `admin/page.tsx:85,86,141,178` | Dashboard badges at `text-[10px] px-1.5 py-0` — zero vertical padding, text touches border |
| 4.6 | `BenchmarkHeroMap.tsx` | `text-[9px]` used for tooltip text |

### Medium Issues
| # | Issue |
|---|---|
| 4.7 | 30+ locations use `text-[10px]` across the codebase |
| 4.8 | 20+ locations use `text-[11px]` for interactive elements |
| 4.9 | `admin/page.tsx:82,138` — Truncated titles have no `title` attribute for tooltip fallback |
| 4.10 | `PolicyLedgerTable.tsx:119` — `max-w-md` on summary cell without `break-words` |

---

## 5. Content Hierarchy — **5.0 / 10**

### High Issues

| # | File | Line | Issue |
|---|---|---|---|
| 5.1 | `HeroMapCanvas.tsx` | 267 | **Regime posture card `hidden sm:flex`** — ASEAN Regime Posture summary completely absent on phone screens |
| 5.2 | `FeaturedCarousel.tsx` | 63 | **Carousel card `min-h-[500px]`** — single card fills 75% of mobile viewport. User must scroll 2 full screens before reaching other content |

### Medium Issues
| # | Issue |
|---|---|
| 5.3 | `DefaChapterTracker.tsx:221` — Status labels `hidden xl:inline`, only icon badges show on smaller screens |
| 5.4 | `HeroMapCanvas.tsx:394-400` — Bottom-left map status (LAT/LON) is decorative but could be collapsed on mobile |
| 5.5 | `AseanMap.tsx:84` — Filter label "Filter Regime:" hidden on mobile, users see unlabeled buttons |

### Good Patterns
- `HeroSection.tsx` — Content card stacks ABOVE map on mobile (single column) ✓
- `Footer.tsx` — `grid-cols-1 md:grid-cols-4` collapses correctly ✓
- `admin/page.tsx` — `grid-cols-1 lg:grid-cols-2` single-column dashboard on mobile ✓

---

## 6. Forms & Data Entry — **6.0 / 10**

### Issues

| # | Issue | Severity |
|---|---|---|
| 6.1 | `admin/policies/new:103` — `grid-cols-3` no responsive collapse (see 3.2) | Critical |
| 6.2 | `admin/news/new:120` — `grid-cols-2` no responsive collapse (see 3.3) | High |
| 6.3 | `ui/input.tsx:12` — `h-8` (32px) input height, below 44px touch target | Low |
| 6.4 | `admin/news/page.tsx:102` — Truncated table titles have no tooltip | Medium |
| 6.5 | `admin/news/page.tsx:118,125` — Row action buttons `h-8 w-8` tight but workable | Medium |

### Strengths
- Inputs use `text-base` (16px) on mobile to prevent iOS auto-zoom ✓
- Admin forms have `max-w-2xl` / `max-w-3xl` constraints ✓
- Tables use `overflow-x-auto` for horizontal scroll ✓
- Rich text editor has `flex-wrap` toolbar ✓

---

## 7. Maps & Data Visualization — **3.0 / 10**

### Critical Issues

| # | File | Line | Issue |
|---|---|---|---|
| 7.1 | `AseanMap.tsx` | 225-227 | **`onMouseEnter`/`onMouseLeave`** for hover effects — no touch equivalent. Mobile users don't see hover feedback when tapping countries |
| 7.2 | `BenchmarkHeatmap.tsx` | 119-124 | **Principle popover activates only via `onMouseEnter`** — touch devices cannot view TPP provision text, the primary affordance |

### High Issues
| # | Issue |
|---|---|
| 7.3 | `FeaturedCarousel.tsx` | Auto-advance `setInterval(6000)` has no pause on user interaction. `isPaused` is hardcoded `false` |
| 7.4 | `HeroMapCanvas.tsx:368` — Bottom flag dock `overflow-x-auto` — 11 flags need ~500px. No scroll indicators (shadows/arrows) to suggest horizontal scrollability |
| 7.5 | `AseanMap.tsx:246` — Country code labels `fontSize="9"` — illegible (see 4.2) |

### Medium Issues
| # | Issue |
|---|---|
| 7.6 | SVG path hit areas for small countries (SG, BN) scale proportionally — no larger invisible overlay |
| 7.7 | Map cursor uses `cursor-crosshair` — implies precision unavailable on touch |
| 7.8 | `BenchmarkHeatmap.tsx:41` — `sticky` table headers lag on iOS during horizontal scroll |

---

## 8. Performance & Technical — **5.0 / 10**

### Issues

| # | Issue | Severity |
|---|---|---|
| 8.1 | No `touch-action: manipulation` on interactive elements — mobile browsers apply 300ms tap delay | Medium |
| 8.2 | No `dvh`/`svh` viewport height units — `calc(100vh - ...)` layouts break when mobile address bar collapses | Medium |
| 8.3 | No `overscroll-behavior: contain` on modals/drawers — iOS may trigger pull-to-refresh or bounce | Low |
| 8.4 | `.no-scrollbar` utility exists (`globals.css:348`) but not applied to body for scroll-lock | Low |
| 8.5 | `D2DSubNav.tsx:13` — `top-[72px]` hardcoded, should use `var(--drone-admin-bar-h)` variable | Critical |

### Strengths
- Dynamic imports used for Supabase services (avoids heavy JS on initial load) ✓
- `loading.tsx` skeleton screens for perceived performance ✓
- Images use `sizes` and `loading="lazy"` attributes ✓
- SVG `viewBox` with `preserveAspectRatio` for responsive maps ✓

---

## Priority Action Plan

### P0 — Critical (Ship before mobile launch)
1. **Carousel mobile controls** — Add swipe + visible arrows for `FeaturedCarousel` touch navigation
2. **Admin touch targets** — Bump icon buttons from 24×24px to `min-h-10 min-w-10` with `gap-2`
3. **Form grid collapse** — Add `grid-cols-1 sm:grid-cols-2/3` to policy/news creation forms
4. **D2DSubNav top offset** — Change `top-[72px]` to `top-[var(--drone-admin-bar-h,72px)]`
5. **Map touch fallback** — Add `onClick` handlers to heatmap popover + map hover effects

### P1 — High (This sprint)
6. **Mobile nav scroll-lock + focus trap** — `document.body.style.overflow = "hidden"` in drawer
7. **SVG text labels** — Increase from 9px–10px to minimum 12px (or add viewport-responsive scaling)
8. **Regime posture card** — Show collapsed version on mobile (icon-only or collapsible)  
9. **Carousel auto-pause** — Pause timer on dot click; allow user to control pace
10. **Touch targets pass** — Audit all `h-6 w-6`, `h-8 w-8`, `px-2 py-1` for 44px minimum

### P2 — Medium (Next sprint)
11. **Typography pass** — Migrate `text-[9px]`→`text-[11px]`, `text-[10px]`→`text-xs`
12. **Sidebar scroll-lock + ESC** — Mirror Header drawer behavior in admin sidebar overlay
13. **Flag dock indicators** — Add gradient fade on `overflow-x-auto` edges
14. **Form input heights** — Consider `h-10 sm:h-8` for mobile touch targets
15. **Intermediate breakpoints** — Add `md:` steps for typography and padding scale

### P3 — Low (Backlog)
16. **CSS performance** — Add `touch-action: manipulation`, `overscroll-behavior`, `dvh` utilities
17. **Truncation tooltips** — Add `title` attributes on `truncate` elements
18. **Drawer transition** — Add slide animation to mobile nav drawer
19. **Map cursor** — Change `cursor-crosshair` to `cursor-pointer` for touch contexts
