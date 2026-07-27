# D.R.O.N.E. Repository Guardrails & Branding Standards

> **Status**: MANDATORY & LOCKED GUARDRAILS  
> **Target Audience**: AI Agents (Antigravity, Cursor, Copilot), Developers, Maintainers  
> **Project**: D.R.O.N.E. (Digital Rights Oversight & Network Evaluator) — EngageMedia  

---

## 🔒 Mandatory Project Rules & Design Guardrails

### 1. Typography Rule: NO Monospace Fonts Across UI
* **FORBIDDEN**: Do NOT use monospace fonts (`JetBrains Mono`, `font-mono`, `font-mono-data`, `Courier`, `monospace`) anywhere in the user interface or component layers.
* **ALLOWED FONTS**:
  * **Headlines & Editorial Titles**: `Newsreader` serif (`font-serif-editorial`).
  * **Body, Subtitles, Buttons, Data Tables & Metadata**: `Inter` sans-serif (`font-sans`).
* **Rationale**: D.R.O.N.E. is an authoritative journalism & policy research portal. Monospace fonts create a "developer/AI scratchpad" look that contradicts our editorial journalism aesthetic.

---

### 2. Branding & Attribution Rule: NO "Okihita" Author References
* **FORBIDDEN**: Never attribute articles, documentation headers, metadata, or UI components to "Okihita".
* **REQUIRED ATTRIBUTION**: All author references in the UI, metadata, RSS feeds, and documentation must strictly read:
  * `EngageMedia` or `EngageMedia Research Team`.
* **Rationale**: The platform is an institutional initiative of EngageMedia supported by donors Luminate Group & Sida.

---

### 3. Header Masthead Rule: NO "Issue" Edition Badges
* **FORBIDDEN**: Do NOT render `Issue: July 2026 Edition` or generic issue badges in the top masthead header.
* **REQUIRED HEADER LAYOUT**: Top bar must only display:
  * Left: `EngageMedia Observatory • Southeast Asia Digital Rights & Policy Intelligence`
  * Right: `Donors: Luminate Group & Sida` + `ThemeToggle` + `LanguageSwitcher` (13 regional languages).

---

### 4. Color & Theme Rule: Light Mode by Default with System Preference & Dark Toggle
* **DEFAULT MODE**: Light Mode (`#f8fafc` background, `#ffffff` card containers, `#0f172a` text).
* **THEME TOGGLE**: Must support a 3-way toggle button (`Light` / `Dark` / `System`) using `.dark` class overrides on `<html>`.
* **FORBIDDEN STYLES**: Zero sci-fi neon radial cyan/purple glows, floating glow badges, or generic dark-mode-only landing pages.

---

### 5. Multi-Page Architecture Rule
The application MUST maintain the 5 dedicated sub-page routes:
1. `src/app/page.tsx` — Story-focused investigative media homepage with real photo cover images.
2. `src/app/investigations/page.tsx` — Editorial long-reads & field reports index.
3. `src/app/observatory/page.tsx` — Cartographic Jurisdiction Observatory with the 11-country SVG ASEAN map.
4. `src/app/ledger/page.tsx` — Searchable Verified Regulatory Ledger database table.
5. `src/app/threats/page.tsx` — Civil Society Digital Rights Threat Matrix.
6. `src/app/intake/page.tsx` — Encrypted Defender Dossier Intake portal (`/submit-dossier`).
