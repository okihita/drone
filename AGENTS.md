<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DRONE Repository Guardrails & Branding Standards

> **Status**: MANDATORY & LOCKED GUARDRAILS  
> **Target Audience**: AI Agents (Antigravity, Claude, Cursor, Copilot), Developers, Maintainers  
> **Project**: DRONE (Digital Rights Oversight & Network Evaluator) — EngageMedia  

---

## 🔒 Mandatory Project Rules & Design Guardrails

### 1. Hero Story Carousel & Crossfade Slideshow
* **SMOOTH IMAGE CROSSFADE**: Slideshow images use absolute positioning and opacity transitions (`transition-opacity duration-700 ease-in-out`) to crossfade smoothly without jump cuts or layout shifts.
* **STATIC MICRO-STATS**: Hero micro-statistics (**11** Member States, **14** Ingested Decrees, **100%** Verified) display as static, immediate text. Do NOT use counting loop animations.
* **4-LINE TITLE & SUBTITLE BOUNDS**: The carousel title and summary elements allow **up to 4 lines of text** (`line-clamp-4`) with minimum height bounds (`min-h-[5.5rem]`).
* **LOCKED CAROUSEL HEIGHT**: The hero story carousel container maintains a locked height (`min-h-[500px] lg:h-[500px]`) so switching slides causes **ZERO Cumulative Layout Shift (CLS)**.

---

### 2. Ambient Radar Map Glows (`AseanMap.tsx`, `HeroMapCanvas.tsx`)
* **RADAR AMBIENT LIGHTING**: Hovering over any country on `AseanMap.tsx` projects a soft, blurred radial spotlight background matching the country's regime classification color (ASEAN Gold `#FFCC00`, ASEAN Blue `#003399`, or ASEAN Red `#CC0000`).
* **CROSSHAIR CURSOR CUES**: The observatory map canvas uses `cursor-crosshair` styling to emphasize the cartographic evaluation theme.

---

### 3. Neutral Uncolored Lucide Icons (NO Emojis & NO Colored Icons in Hero Badges)
* **UNCOLORED NEUTRAL ICONS**: Lucide icons inside hero micro-stats badges MUST use neutral text colors (`text-slate-400`). Do NOT color micro-stats icons with custom brand tokens (FORBIDDEN: `text-asean-yellow`, `text-asean-blue`).
* **FORBIDDEN**: Do NOT use raw emojis (`🌐`, `📊`, `🛡️`, `🗣️`) anywhere in UI badges, hero cards, or stats counters.

---

### 4. Tactile Dossier Film-Grain Noise Texture (`globals.css`)
* **PRINTED DOSSIER TEXTURE**: Dark mode backgrounds use a 3% opacity SVG fractal noise overlay (`bg-dossier-noise`) for an authentic printed intelligence dossier feel.

---

### 5. Editorial Serif Drop-Cap (`page.tsx`)
* **MAGAZINE DROP-CAP**: The opening paragraph of the Swiss Atelier Executive Insights section uses an oversized, bold *Newsreader* serif drop-cap (`float-left text-4xl sm:text-5xl font-serif-editorial font-extrabold pr-2.5 pt-0.5 text-asean-yellow leading-none`).

---

### 6. Search Placeholder Rules (Exactly 3 Examples)
* **SEARCH PLACEHOLDER**: `HeroSearch.tsx` search input placeholder MUST use exactly 3 examples ending with Indonesia's PDP Law:
  * `Try "DEFA Chapter 5", "Vietnam Decree 53", "Indonesia PDP Law"`

---

### 7. Header & Title Branding Rule (DRONE Spelling & Alignment)
* **TITLE SPELLING**: The brand title MUST be written as **`DRONE`** without dots (FORBIDDEN: `D.R.O.N.E.`).
* **ZERO FONT PADDING & VERTICAL CENTER ALIGNMENT**: `DRONE` and the 2-line subtitle MUST be vertically centered/aligned (`flex items-center`) with `leading-none` and zero line-height padding.
* **EXACT 2-LINE SUBTITLE**: The subtitle text MUST be split into exactly 2 stacked lines with the ampersand `&` on line 2:
  * Line 1: `Digital Rights Oversight`
  * Line 2: `& Network Evaluator`
* **LEFT ENGAGEMEDIA EMBLEM LOGO**: Header masthead left column renders the EngageMedia emblem SVG (`/images/logo-engagemedia-emblem-clarifying-white.svg`) using standard SVG `<img />` tag.

---

### 8. Inline Flag Language Switcher Rule (No Dropdown)
* **NO DROPDOWN OVERLAY**: `LanguageSwitcher.tsx` must render simple inline toggle buttons showing flags: `🌐 EN` | `🇮🇩 ID`.

---

### 9. ASEAN Logo Color Branding Rule & Lint Command
* **AUTHORITATIVE PALETTE REFERENCE**: All branding colors must strictly reference `src/lib/colors.ts` and the official ASEAN logo palette:
  * **ASEAN Blue**: `#003399` (`asean-blue`)
  * **ASEAN Red**: `#CC0000` (`asean-red`)
  * **ASEAN Yellow / Gold**: `#FFCC00` (`asean-yellow`)
  * **ASEAN White**: `#FFFFFF`
* **FORBIDDEN**: Do NOT use ad-hoc hardcoded hex strings (`#...`) or generic Tailwind color classes (`amber-*`, `emerald-*`, `cyan-*`, etc.).
* **COLOR LINT RULE**: Enforce zero hardcoded hex colors or non-ASEAN Tailwind utilities via `pnpm run lint:colors`.

---

### 10. Language Restriction Rule: English & Bahasa Indonesia Only
* **STRICT LANGUAGES**: The application UI only supports 2 languages:
  1. 🌐 **English (`en`)**
  2. 🇮🇩 **Bahasa Indonesia (`id`)**

---

### 11. Geographic SVG Data Rule: Real Natural Earth GeoJSON Only
* **FORBIDDEN**: Never hand-craft vector SVG path coordinates for maps.
* **REQUIRED SVG DATA**: All vector map paths (`AseanMap.tsx` and `AseanBlindMap.tsx`) MUST be rendered dynamically via `d3-geo` projection using the real Natural Earth GeoJSON dataset stored in `public/data/southeast-asia.json`.

---

### 12. Hero Layout & Compact Map Height Rule
* **COMPACT HERO HEIGHT**: The hero section uses a sleek, compact height (`py-10 sm:py-12`) with a subtle 15-25% opacity `AseanBlindMap` background.

---

### 13. Footer Tech Usage Rule: NO Tech Stack Footers
* **FORBIDDEN**: Do NOT display `Published with Next.js 16, React 19 & Tailwind CSS v4` or framework badges in the footer.

---

### 14. Typography Rule: NO Monospace Fonts Across UI
* **FORBIDDEN**: Do NOT use monospace fonts (`JetBrains Mono`, `font-mono`, `font-mono-data`) anywhere in the UI.
* **ALLOWED FONTS**: `Newsreader` serif for headlines & `Inter` sans-serif for body/metadata.

---

### 15. Branding & Attribution Rule: NO Non-Organization Author References
* **REQUIRED ATTRIBUTION**: All author references in the UI and documentation must strictly read:
  * `EngageMedia` or `EngageMedia Research Team`.

---

### 16. Multi-Page Architecture Rule
The application maintains the following dedicated public route groups:
1. `src/app/(home)/page.tsx` — Our World in Data style hero + Editorial Atelier homepage.
2. `src/app/investigations/` — Editorial long-reads & field reports index and slug pages.
3. `src/app/(observatory)/observatory/page.tsx` — Cartographic Jurisdiction Observatory with real GeoJSON SVG map.
4. `src/app/(observatory)/ledger/page.tsx` — Searchable Verified Regulatory Ledger database table.
5. `src/app/(observatory)/intake/page.tsx` — Encrypted Defender Dossier Intake portal (`/submit-dossier`).
6. `src/app/links/` — Curated Digital Trade & Policy Links directory.
7. `src/app/defa/` — 5-module ASEAN DEFA Telemetry & Observatory Suite.
8. `src/app/d2d/` — Digital 2 Dozen Benchmark & compliance visualization suite.

All content management (News, Policies, Jurisdictions, Curated Links) is managed via the **Airtable Headless CMS** with 60-second ISR edge caching. There is no internal `/admin` dashboard.

---

### 17. Deployment Guardrail: NO Direct Vercel CLI Deployments
* **STRICTLY FORBIDDEN**: Never execute `vercel`, `vercel --prod`, `npx vercel`, or any Vercel CLI deployment commands from the terminal.
* **REQUIRED DEPLOYMENT WORKFLOW**: Deployments must happen exclusively via standard Git pushes to GitHub (`git push origin main`), which triggers Vercel's automated GitHub deployment pipeline. Direct CLI deployments from the local terminal are strictly prohibited.


