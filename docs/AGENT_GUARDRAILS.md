# D.R.O.N.E. Repository Guardrails & Branding Standards

> **Status**: MANDATORY & LOCKED GUARDRAILS  
> **Target Audience**: AI Agents (Antigravity, Cursor, Copilot), Developers, Maintainers  
> **Project**: D.R.O.N.E. (Digital Rights Oversight & Network Evaluator) — EngageMedia  

---

## 🔒 Mandatory Project Rules & Design Guardrails

### 1. ASEAN Logo Color Branding Rule & Lint Command
* **AUTHORITATIVE PALETTE REFERENCE**: All branding colors must strictly reference `src/lib/colors.ts` and the official ASEAN logo palette:
  * **ASEAN Blue**: `#003399` (Peace & Stability)
  * **ASEAN Red**: `#CC0000` (Courage & Dynamism)
  * **ASEAN Yellow / Gold**: `#FFCC00` (Prosperity & Padi Emblem)
  * **ASEAN White**: `#FFFFFF` (Purity)
* **FORBIDDEN**: Do NOT use ad-hoc hardcoded hex strings (`#0b0f17`, `#0e1420`, `#faf9f6`, `#10b981`, etc.) inside `.tsx` / `.ts` component files.
* **COLOR LINT RULE**: Enforce zero hardcoded hex colors via `npm run lint:colors` (`node scripts/check-colors.js`).

---

### 2. Language Restriction Rule: English & Bahasa Indonesia Only
* **STRICT LANGUAGES**: The application UI only supports 2 languages:
  1. 🌐 **English (`en`)**
  2. 🇮🇩 **Bahasa Indonesia (`id`)**
* **FORBIDDEN**: Do NOT add any other language dropdown items to `LanguageSwitcher.tsx`.

---

### 3. Geographic SVG Data Rule: Real Natural Earth GeoJSON Only
* **FORBIDDEN**: Never hand-craft or estimate vector SVG path coordinates for maps.
* **REQUIRED SVG DATA**: All vector map paths (`AseanMap.tsx` and `AseanBlindMap.tsx`) MUST be rendered dynamically via `d3-geo` projection using the real Natural Earth GeoJSON dataset stored in `public/data/southeast-asia.json`.

---

### 4. Hero Layout & Compact Map Height Rule
* **COMPACT HERO HEIGHT**: The hero section uses a sleek, compact height (`py-10 sm:py-12`) with a subtle 15-25% opacity `AseanBlindMap` background.
* **FORBIDDEN HERO ELEMENTS**:
  * Do NOT render `ENGAGEMEDIA OBSERVATORY` badges in the hero.
  * Do NOT render `All free: open access and human rights licensed under CC BY 4.0` micro-captions in the hero.

---

### 5. Header Layout & Breathing Room Rule
* **NO TOP MICRO-BAR**: Do NOT render top micro-bars above the main header masthead.
* **SPACIOUS MASTHEAD**: Main title & acronym `D.R.O.N.E.` must have generous vertical padding (`py-8 sm:py-10`) for clean editorial breathing room.

---

### 6. Footer Tech Usage Rule: NO Tech Stack Footers
* **FORBIDDEN**: Do NOT display `Published with Next.js 16, React 19 & Tailwind CSS v4` or framework badges in the footer.

---

### 7. Typography Rule: NO Monospace Fonts Across UI
* **FORBIDDEN**: Do NOT use monospace fonts (`JetBrains Mono`, `font-mono`, `font-mono-data`) anywhere in the UI.
* **ALLOWED FONTS**: `Newsreader` serif for headlines & `Inter` sans-serif for body/metadata.

---

### 8. Branding & Attribution Rule: NO "Okihita" Author References
* **REQUIRED ATTRIBUTION**: All author references in the UI and documentation must strictly read:
  * `EngageMedia` or `EngageMedia Research Team`.

---

### 9. Multi-Page Architecture Rule
The application MUST maintain the 5 dedicated sub-page routes:
1. `src/app/page.tsx` — Our World in Data style hero + Editorial Atelier homepage.
2. `src/app/investigations/page.tsx` — Editorial long-reads & field reports index.
3. `src/app/observatory/page.tsx` — Cartographic Jurisdiction Observatory with real GeoJSON SVG map.
4. `src/app/ledger/page.tsx` — Searchable Verified Regulatory Ledger database table.
5. `src/app/threats/page.tsx` — Civil Society Digital Rights Threat Matrix.
6. `src/app/intake/page.tsx` — Encrypted Defender Dossier Intake portal (`/submit-dossier`).
