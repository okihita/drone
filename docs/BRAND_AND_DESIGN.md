# DRONE — Brand Identity, Editorial Voice & Design System

> **Project**: DRONE (Digital Rights Oversight & Network Evaluator)  
> **Organization**: EngageMedia  
> **Status**: Living Design Blueprint  

---

## 1. Brand Identity & Editorial Mission

### 1.1 The DRONE Acronym & Spelling
- **Official Brand**: **`DRONE`** (Strictly written without periods; forbidden: `D.R.O.N.E.`).
- **Full Name**: **Digital Rights Oversight & Network Evaluator**
- **Tagline**: *Active Evaluation & High-Altitude Intelligence on ASEAN Tech Policy*

### 1.2 EngageMedia's Strategic Positioning
EngageMedia operates in a dual capacity:
1. **Science Communicator**: Translates dense digital trade legalese (e.g., ASEAN DEFA, bilateral DEAs, cross-border data transfer decrees) and technical AI governance jargon into accessible, human-centric visual stories and executive summaries.
2. **Campaign Strategist**: Equips regional activists, human rights defenders, independent journalists, and civil society grantees with actionable threat matrices, regulatory scorecards, and campaign kits.

---

## 2. ASEAN Color Palette & Design Tokens

All branding colors strictly derive from `src/lib/colors.ts` and the official ASEAN logo palette:

```
ASEAN Blue:    #003399  (--color-asean-blue)
ASEAN Red:     #CC0000  (--color-asean-red)
ASEAN Yellow:  #FFCC00  (--color-asean-yellow)
ASEAN White:   #FFFFFF  (--color-asean-white)

Extended Semantic Status Tokens:
ASEAN Emerald: #10B981  (--color-asean-emerald)  -> Positive / Rights-Preserving
ASEAN Amber:   #F59E0B  (--color-asean-amber)    -> Caution / Watchlist / Ambiguous
ASEAN Sky:     #0EA5E9  (--color-asean-sky)      -> Informational / Telemetry
```

### Color Guardrails
- **Automated Linting**: Run `pnpm run lint:colors` before any commit to ensure zero hardcoded hex values or generic Tailwind color tokens (e.g. `amber-700`, `green-500`, `cyan-400`).
- **Dark Mode Support**: Use Tailwind's `dark:` modifier with official semantic tokens (e.g., `text-asean-amber dark:text-asean-yellow`).

---

## 3. Typography & Visual Language

- **Headlines & Editorial Accents**: **`Newsreader`** serif (`font-serif-editorial`).
  - Used for editorial titles, drop-caps, and report summaries.
- **UI, Metadata & Body**: **`Inter` / `Geist Sans`** (`font-sans`).
  - Clean, legible sans-serif for dense data tables, matrices, and metadata badges.
- **Monospace Policy**: Monospace fonts (`font-mono`) are **strictly prohibited** across the UI to preserve editorial polish.

---

## 4. UI Texture & Visual Polish

1. **Tactile Dossier Texture**:
   - Dark mode backgrounds incorporate a subtle 3% opacity fractal noise overlay (`bg-dossier-noise`) in `globals.css` to emulate printed intelligence dossiers.
2. **Ambient Radar Spotlights**:
   - Interactive maps (`AseanMap.tsx`, `HeroMapCanvas.tsx`) project a soft radial spotlight glow matching the active country's regime posture color.
   - Map canvas incorporates `cursor-crosshair` styling.
3. **Icons & Badges**:
   - Use Lucide icons with neutral text styling (`text-slate-400`).
   - **Zero Emojis**: Do not use raw Unicode emojis (`🌐`, `📊`, `🛡️`) in UI badges or stats counters.
