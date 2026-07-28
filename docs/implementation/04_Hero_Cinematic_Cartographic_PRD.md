# PRD: Cinematic Cartographic Hero — Landing Page

> **Author**: Okihita
> **Date**: July 2026
> **Status**: Approved → Implementation
> **Target**: `src/components/landing/HeroSection.tsx` (rewrite)

---

## 1. Problem Statement

The current landing hero is a competent but static two-column layout: headline on the left,
decorative ASEAN SVG map on the right. After a 0.55s staggered reveal, **nothing moves**.
The map — the product's strongest visual asset — is a dead sidebar graphic with a
`cursor-pointer` that does nothing. Benchmarking (`docs/analysis/01`) shows every
reference platform has one "alive" centerpiece (SEA Observatory's density map, GTW's
threat matrix). D.R.O.N.E.'s hero has none, and it fails to produce a wow moment for
donors (Luminate, Sida) and first-time visitors.

## 2. Decision

Per options review (scored in chat), we proceed with **Option B — "Cinematic
Cartographic"**, with Option A's **Signal Feed** absorbed as the bottom ticker layer.

- Wow factor: ★★★★★ (only option producing a visceral reaction)
- Weaponizes existing assets: `southeast-asia.json` GeoJSON + ASEAN tricolor regime tokens
- Zero new runtime dependencies (SVG + CSS keyframes + one pointer hook)

## 3. Goals / Non-Goals

### Goals
1. Full-bleed living map as the hero background — animated data-flow arcs, pulsing
   threat nodes, ambient radar sweep, slow drift.
2. Headline content in a floating **glassmorphic panel** over the map.
3. **Signal ticker** marquee at the bottom edge — mocked policy-alert feed (Option A).
4. Mouse-parallax on fine-pointer devices.
5. Full accessibility: `prefers-reduced-motion` support, AA contrast over the map.
6. Mobile-safe simplified variant (no parallax, stronger scrim).

### Non-Goals
- WebGL / three.js globe (rejected: dependency cost, perf risk, overkill).
- Real API wiring for the ticker (mocked now; shape designed for later swap).
- Interactive map filtering (that lives at `/observatory`; hero stays ambient).
- Changes to sections below the hero.

## 4. Design Concept

**"The Observatory, live."** The visitor lands inside the monitoring room: the ASEAN
map fills the viewport behind glass, data flows visibly between capitals, threat nodes
breathe, a radar sweep passes, and a ticker of intercepted signals scrolls underneath.
The dossier identity (Newsreader serif, classified badge, tricolor accents) is preserved.

### Layer stack (bottom → top)
| Layer | Content |
|-------|---------|
| 0 | `HeroMapCanvas` — full-bleed SVG map (`preserveAspectRatio="slice"`), arcs, pulses, radar sweep, drift; wrapped in parallax container |
| 1 | Scrim gradients — left-weighted dark gradient for text contrast + bottom fade into ticker |
| 2 | Content — glass panel: classified badge, serif headline (lead story or fallback), lede, CTAs, micro-stat badges |
| 3 | `SignalTicker` — marquee strip pinned to hero bottom |
| 4 | Floating legend chip (top-right, glass) |

## 5. Component Architecture

```
src/components/landing/
├── HeroSection.tsx        (rewrite — composition + copy logic, client component)
├── HeroMapCanvas.tsx      (new — map, arcs, pulses, sweep, parallax)
└── SignalTicker.tsx       (new — mocked intel marquee)
src/app/globals.css        (append hero animation keyframes/utilities)
```

### 5.1 `HeroMapCanvas.tsx`
- Renders `getRealAseanCountries()` paths exactly as today (regime fills), dimmed
  (reduced opacity fills, slate-dominant) so content stays readable.
- **Flow arcs**: fixed set of 7 country pairs (MY→VN, ID→MM, ID→TH, PH→MY,
  VN→KH, MY→ID, TH→MM). Quadratic Bézier between `centerPos` points with perpendicular
  lift; `stroke-dasharray` + animated `stroke-dashoffset` (`heroFlow` keyframes,
  staggered delays); stroke color = source-country regime color at low opacity.
- **Threat pulses**: nodes at high-activity capitals (VN, MM, ID, TH, SG, PH) —
  core dot + two expanding ripple rings (`heroPing` keyframes, staggered).
- **Radar sweep**: rotating conic-gradient div (`heroSweep` keyframes), masked to a
  radial circle centered on the map, ~5% opacity.
- **Ambient drift**: slow scale/translate alternate cycle (30s) on the SVG wrapper.
- **Parallax**: `pointermove` on the section (attached by parent via ref callback or
  self-attached on window with bounds check), `requestAnimationFrame`-lerped translate
  of ±10px via ref (no React state re-render). Gated by
  `matchMedia('(pointer: fine)')` **and** `prefers-reduced-motion: no-preference`.

### 5.2 `SignalTicker.tsx`
- Mocked array `MOCK_SIGNALS: { code, severity: ThreatLevel, text, time }[]` (~10 items)
  shaped to accept real alert data later.
- Marquee: `w-max flex` track, content duplicated 2×, `heroMarquee` keyframes
  translating -50%, ~45s loop, `hover:[animation-play-state:paused]`.
- Severity dot uses `THREAT_ACCENT_COLORS` / regime tricolor. Mono-spaced timestamps.
- Left label block: pulsing red dot + "LIVE SIGNAL FEED" micro-label.

### 5.3 `HeroSection.tsx`
- Keeps existing props (`leadStory?: NewsCardItem | null`) — **no page.tsx change**.
- Glass panel: `bg-slate-950/55 backdrop-blur-md border border-white/10 rounded-2xl
  shadow-2xl` containing badge → headline → meta/lede → CTAs → micro-stats
  (same copy and fallback logic as today; existing `animate-reveal` choreography kept).
- Scrim: `bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent` +
  bottom `from-slate-950` fade.
- Legend chip retained, restyled as glass, positioned top-right.

### 5.4 `globals.css` additions
- `@keyframes heroFlow` (dashoffset flow), `heroPing` (ripple), `heroSweep` (rotate),
  `heroMarquee` (translateX -50%), `heroDrift` (slow scale).
- Utility classes: `.animate-hero-flow`, `.animate-hero-ping`, `.animate-hero-sweep`,
  `.animate-hero-marquee`, `.animate-hero-drift`.
- `@media (prefers-reduced-motion: reduce)` — disable all of the above
  (marquee collapses to static, overflow-x scrollable row).

## 6. Accessibility & Performance

| Concern | Mitigation |
|---------|-----------|
| `prefers-reduced-motion` | All keyframes disabled; parallax gated in JS; ticker becomes scrollable static row |
| Text contrast over map | Left-weighted scrim gradient + map fills dimmed to ≤35% opacity; headline white on ≥ 0.7 alpha slate |
| Mobile | Parallax off (pointer gate); arcs/pulses kept (cheap SVG); min-height `85vh`; panel full-width |
| Render cost | No JS animation loop except parallax rAF; arcs/pulses/sweep are pure CSS; map rendered once via `useMemo` |
| Screen readers | Map SVG `aria-hidden="true"`; ticker items are plain text; no content conveyed by motion alone |

## 7. Acceptance Criteria

1. Hero fills viewport (`min-h-[85vh]`) with the map visible edge-to-edge behind content.
2. ≥ 6 flow arcs visibly animating; ≥ 5 pulsing nodes; radar sweep visible on dark bg.
3. Ticker scrolls continuously, pauses on hover, shows ≥ 8 mocked signals.
4. Moving the mouse on desktop shifts the map ≤ 10px with easing; no shift on touch.
5. With "Reduce Motion" enabled: no arcs/pulses/sweep/drift/parallax/marquee motion.
6. Lighthouse: no layout shift (CLS 0) from hero; no new dependencies in `package.json`.
7. `npm run lint` and `tsc --noEmit` clean; existing `leadStory` behavior unchanged.

## 8. Discovered Pre-Existing Data Bug (fixed in passing)

`southeast-asia.json` names Laos `"Laos (Lao People’s Democratic Republic)"` and
Timor-Leste `"Timor-Leste"`, but `COUNTRY_METADATA` keyed them `"Lao PDR"` / `"East
Timor"` — so `getRealAseanCountries()` silently dropped both. The old hero (and
`/observatory`) rendered **8 of 11** countries despite the "11 Member States" badge.
Fixed by correcting the metadata keys in `src/lib/aseanGeo.ts` (now 10 render).
**Singapore has no geometry in the dataset at all** — follow-up: source or author an
SG polygon so `/observatory` reaches the full 11.

## 9. Rollback

Single-file revert of `HeroSection.tsx` + deletion of the two new components and the
globals.css block. No schema, API, or routing changes involved.
