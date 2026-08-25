# Feature Specification: Digital 2 Dozen Compliance Suite

> **Route**: `/d2d/*`  
> **Source Model**: USTR 24 Digital Trade Principles (TPP/CPTPP/USMCA benchmark)  
> **Status**: Active Specification  

---

## 1. Product Vision

The Digital 2 Dozen (D2D) module evaluates all 11 ASEAN jurisdictions against 24 international digital trade and rights principles across 6 core thematic clusters.

---

## 2. Thematic Clusters & Routes

```
/d2d/
├── benchmark/           # 11 Countries x 24 Principles Compliance Heatmap (0-100 scoring)
├── tech-sovereignty/    # Source code disclosure, tech transfer mandates & radar charts
├── encryption/          # Lawful intercept, backdoor mandates, VPN bans & timeline
├── consumer-protection/ # Platform liability, dark pattern bans, algorithmic audits
├── ip-monitor/          # AI model rights, trade secrets & copyright safe harbors
└── negotiations/        # Regional trade agreements timeline (DEFA, CPTPP, DEPA, IPEF)
```

---

## 3. Visual Components & Mechanics

- **Interactive Heatmap (`BenchmarkHeatmap.tsx`)**:
  - Color-coded scoring matrix (ASEAN Emerald for high compliance, ASEAN Amber for watchlist, ASEAN Red for high risk).
  - Hover popover (`PrincipleDetailPopover.tsx`) displaying principle description, legal citations, and enforcement status.
- **Export Engine (`BenchmarkExport.tsx`)**:
  - Allows researchers to export formatted CSV and JSON compliance scorecards directly from the browser.
- **Tech Sovereignty Radar (`TechSovereigntyRadar.tsx`)**:
  - Multi-axis quantitative evaluation of tech sovereignty and forced disclosure policies.
