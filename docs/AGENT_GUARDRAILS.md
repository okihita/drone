# D.R.O.N.E. Repository Guardrails & Branding Standards

> **Status**: MANDATORY & LOCKED GUARDRAILS  
> **Target Audience**: AI Agents (Antigravity, Cursor, Copilot), Developers, Maintainers  
> **Project**: D.R.O.N.E. (Digital Rights Oversight & Network Evaluator) — EngageMedia  

---

## 🔒 Mandatory Project Rules & Design Guardrails

### 1. Header Layout & Breathing Room Rule
* **NO TOP MICRO-BAR**: Do NOT render top micro-bars (`EngageMedia Observatory`, `Issue: July 2026 Edition`, or donor list) above the main header masthead.
* **SPACIOUS MASTHEAD**: The main title & acronym `D.R.O.N.E.` must have generous vertical padding (`py-8 sm:py-10`) for clean, high-end editorial breathing room.

---

### 2. Footer Tech Usage Rule: NO Tech Stack Footers
* **FORBIDDEN**: Do NOT display `Published with Next.js 16, React 19 & Tailwind CSS v4` or any framework usage badges in the bottom right of the footer.
* **ALLOWED FOOTER CONTENT**: Copyright, CC BY 4.0 license notice, institutional overview, research module links, and donor partner cards only.

---

### 3. Typography Rule: NO Monospace Fonts Across UI
* **FORBIDDEN**: Do NOT use monospace fonts (`JetBrains Mono`, `font-mono`, `font-mono-data`, `Courier`, `monospace`) anywhere in the user interface or component layers.
* **ALLOWED FONTS**:
  * **Headlines & Editorial Titles**: `Newsreader` serif (`font-serif-editorial`).
  * **Body, Subtitles, Buttons, Data Tables & Metadata**: `Inter` sans-serif (`font-sans`).

---

### 4. Branding & Attribution Rule: NO "Okihita" Author References
* **FORBIDDEN**: Never attribute articles, documentation headers, metadata, or UI components to "Okihita".
* **REQUIRED ATTRIBUTION**: All author references in the UI, metadata, RSS feeds, and documentation must strictly read:
  * `EngageMedia` or `EngageMedia Research Team`.

---

### 5. Color & Theme Rule: Light Mode by Default with System Preference & Dark Toggle
* **DEFAULT MODE**: Light Mode (`#faf9f6` canvas, `#ffffff` card containers, `#0f172a` text).
* **THEME TOGGLE**: Must support a 3-way toggle button (`Light` / `Dark` / `System`) using `.dark` class overrides on `<html>`.

---

### 6. Multi-Page Architecture Rule
The application MUST maintain the 5 dedicated sub-page routes:
1. `src/app/page.tsx` — Option 3 Editorial Atelier Swiss magazine cover homepage.
2. `src/app/investigations/page.tsx` — Editorial long-reads & field reports index.
3. `src/app/observatory/page.tsx` — Cartographic Jurisdiction Observatory with the 11-country SVG ASEAN map.
4. `src/app/ledger/page.tsx` — Searchable Verified Regulatory Ledger database table.
5. `src/app/threats/page.tsx` — Civil Society Digital Rights Threat Matrix.
6. `src/app/intake/page.tsx` — Encrypted Defender Dossier Intake portal (`/submit-dossier`).
