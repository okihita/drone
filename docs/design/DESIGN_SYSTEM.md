# DRONE Design System & Contrast Standards

> **Status**: AUTHORITATIVE DESIGN SYSTEM SPECIFICATION  
> **Target Audience**: Developers, Designers, AI Agents  
> **Brand**: DRONE (Digital Rights Oversight & Network Evaluator) — EngageMedia  

---

## 🎨 1. Official ASEAN Color Palette & Tokens

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

## 🌓 2. Light Mode vs. Dark Mode Contrast Rules

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
* **Body / Subtitles**: `text-slate-600 dark:text-slate-300` (`font-sans` / Inter)
* **Muted Captions / Micro-stats**: `text-slate-500 dark:text-slate-400`

---

## 🔍 3. Automated Linter Guardrails

Every pull request and build enforces color tokens via:
```bash
pnpm run lint:colors
```
* **Rule 1**: Zero hardcoded hex colors outside `colors.ts` and `globals.css` (`pnpm run lint:colors`).
* **Rule 2**: Zero generic Tailwind colors (`amber-*`, `emerald-*`, `green-*`, `indigo-*`, `cyan-*`).
* **Rule 3**: Zero monospace fonts (`font-mono`) in the user interface.
* **Rule 4**: **Minimum Typography Size**: `text-xs` (12px) and sub-13px font sizes (`text-[9px]`, `text-[10px]`, `text-[11px]`) are strictly forbidden across the website. Minimum allowed font size is `text-sm` (14px) for optimal readability and accessibility (`pnpm run lint:typography`).
