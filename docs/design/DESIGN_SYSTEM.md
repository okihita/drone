# DRONE Design System & Brand Standards

> **Status**: AUTHORITATIVE DESIGN SYSTEM SPECIFICATION  
> **Target Audience**: Developers, Designers, Maintainers, AI Agents  
> **Brand**: DRONE (Digital Rights Oversight & Network Evaluator) — EngageMedia  

---

## 🏛️ 1. Brand Identity & Editorial Mission

### 1.1 The DRONE Acronym & Spelling
- **Official Brand**: **`DRONE`** (Strictly written without periods; forbidden: `D.R.O.N.E.`).
- **Full Name**: **Digital Rights Oversight & Network Evaluator**
- **Tagline**: *Active Evaluation & High-Altitude Intelligence on ASEAN Tech Policy*

### 1.2 EngageMedia's Strategic Positioning
EngageMedia operates in a dual capacity:
1. **Science Communicator**: Translates dense digital trade legalese (e.g., ASEAN DEFA, bilateral DEAs, cross-border data transfer decrees) and technical AI governance jargon into accessible, human-centric visual stories and executive summaries.
2. **Campaign Strategist**: Equips regional activists, human rights defenders, independent journalists, and civil society grantees with actionable threat matrices, regulatory scorecards, and campaign kits.

---

## 🎨 2. Official ASEAN Color Palette & Tokens

All colors across DRONE are derived from the official ASEAN emblem palette and defined in `src/lib/colors.ts` and `src/app/globals.css`.

| Token Name | Hex | Light Mode Role | Dark Mode Role |
| :--- | :--- | :--- | :--- |
| `asean-blue` | `#003399` | Primary Brand, Links, Badges, Observatory fills | Primary Brand, Accents |
| `asean-red` | `#CC0000` | Critical Threats ($\ge 4/5$), Strict Localization, Primary Alerts | Critical Threats, Sonar pulses |
| `asean-yellow` | `#FFCC00` | Primary Gold Accent, Map Active Stroke, Dark Mode Badges | Primary High-Contrast Accent |
| `asean-yellow-dark` | `#b38600` | **High-Contrast Text on Light Mode Backgrounds** | *(Use `asean-yellow` for Dark Mode)* |
| `asean-emerald` | `#10B981` | Positive Compliance, 100% Verification | Positive Compliance |
| `asean-amber` | `#F59E0B` | Medium Risk / Watchlist Alerts | Medium Risk / Watchlist Alerts |
| `asean-sky` | `#0EA5E9` | Data Corridors & Global Treaty Flows | Data Corridors & Global Treaty Flows |

---

## 🌓 3. Light Mode vs. Dark Mode Contrast Rules

To guarantee WCAG AA+ legibility on both light and dark backgrounds:

### A. Yellow Accent Text on Light Mode
* ❌ **FORBIDDEN on Light**: `text-asean-yellow` directly on white or light slate backgrounds (low contrast ratio < 2.5:1).
* ✅ **REQUIRED**: Use responsive contrast pairing:
  ```html
  <span className="text-asean-yellow-dark dark:text-asean-yellow">
    Live Observatory Tag
  </span>
  ```

### B. Badge & Pill Backgrounds
* **Light Mode**: `bg-asean-yellow/15 text-asean-yellow-dark border-asean-yellow/50`
* **Dark Mode**: `dark:bg-asean-yellow/15 dark:text-asean-yellow dark:border-asean-yellow/40`

### C. Body & Editorial Typography
* **Headlines**: `text-slate-900 dark:text-white` (`font-serif-editorial` / Newsreader)
* **Body / Subtitles**: `text-slate-600 dark:text-slate-300` (`font-sans` / Inter / Geist)
* **Muted Captions / Micro-stats**: `text-slate-500 dark:text-slate-400`

---

## 📐 4. UI Texture & Tactile Polish

1. **Tactile Dossier Texture**:
   * Dark mode backgrounds incorporate a subtle 3% opacity fractal noise overlay (`bg-dossier-noise`) in `globals.css` to emulate printed intelligence dossiers.
2. **Ambient Radar Spotlights**:
   * Interactive maps (`AseanMap.tsx`, `HeroMapCanvas.tsx`) project a soft radial spotlight glow matching the active country's regime posture color.
   * Map canvas incorporates `cursor-crosshair` styling.
3. **Icons & Badges**:
   * Use Lucide icons with neutral text styling (`text-slate-400`).
   * **Zero Emojis**: Do not use raw Unicode emojis (`🌐`, `📊`, `🛡️`) in UI badges or stats counters.

---

## 🔍 5. Automated Linter Guardrails

Every pull request and build enforces design tokens via:
```bash
pnpm run lint
```
* **Rule 1**: Zero hardcoded hex colors outside `colors.ts` and `globals.css` (`pnpm run lint:colors`).
* **Rule 2**: Zero generic Tailwind colors (`amber-*`, `emerald-*`, `green-*`, `indigo-*`, `cyan-*`).
* **Rule 3**: Zero monospace fonts (`font-mono`) in the user interface.
* **Rule 4**: **Minimum Typography Size**: `text-xs` (12px) and sub-13px font sizes are strictly forbidden across the website. Minimum allowed font size is `text-sm` (14px) for optimal readability and accessibility (`pnpm run lint:typography`).
* **Rule 5**: All curated resources must have verified OpenGraph images or explicit PDF flags (`pnpm run lint:links`).
