# Comprehensive Product Requirements Document (PRD): ASEAN DEFA Telemetry & Observatory Suite

> **Project**: D.R.O.N.E. — ASEAN Digital Rights Oversight & Network Evaluator  
> **Target Module**: DEFA Observatory (`/defa`)  
> **Reference Model**: Digital 2 Dozen (D2D) Design System & Analytics Architecture (`/d2d/*`)  
> **Context**: July 2026 — Post-Manila 57th SEOM Conclusion & Legal Scrubbing Phase  
> **Maintainer**: EngageMedia Research & Engineering Team  
> **Status**: APPROVED STRATEGIC PRD FOR IMPLEMENTATION  

---

## 🎯 Executive Summary & Context (July 2026)

### The Strategic Reality of DEFA
The **ASEAN Digital Economy Framework Agreement (DEFA)** is the world’s first region-wide, legally binding agreement dedicated exclusively to digital economy governance. Spanning 11 Southeast Asian nations (Brunei, Cambodia, Indonesia, Laos, Malaysia, Myanmar, Philippines, Singapore, Thailand, Vietnam, and Timor-Leste), DEFA is projected to double the region's digital economy from **~$300 Billion USD in 2023** to **US$2.0 Trillion by 2030**.

As of **July 2026**:
1. **Negotiations Concluded**: Official text negotiations were formally concluded at the 57th Senior Economic Officials Meeting (SEOM) in Manila, Philippines (May 27–29, 2026).
2. **Current Phase**: The treaty is actively undergoing **Legal Scrubbing (Legal Review)** and **Domestic Consultations** across member states.
3. **Target Signing**: Formal treaty execution will occur at the **49th ASEAN Summit in November 2026**.

### The Architectural Goal
While the **Digital 2 Dozen (D2D)** module features a multi-route analytics suite (`/d2d/benchmark`, `/d2d/consumer-protection`, `/d2d/encryption`, `/d2d/ip-monitor`, `/d2d/negotiations`, `/d2d/tech-sovereignty`) with a sticky sub-navigation bar (`D2DSubNav.tsx`), the DEFA page currently exists as a single static overview.

This PRD establishes a 5-module telemetry and oversight suite under `/defa/` that mirrors the D2D design system, narrative density, interactive visualizers, and civil society advocacy focus.

---

## 📐 Comparative Analysis: D2D vs. DEFA Suite

| Dimension | Digital 2 Dozen (D2D) Model | DEFA Telemetry & Observatory Suite |
| :--- | :--- | :--- |
| **Route Hierarchy** | Sub-routes under `/d2d/*` | Sub-routes under `/defa/*` |
| **Navigation** | Sticky `D2DSubNav.tsx` with active icons | Sticky `DEFASubNav.tsx` matching D2D sub-nav |
| **Domain Scope** | 24 USTR Digital Trade Principles | 9 Official DEFA Chapters + 5 Core Pillars |
| **Primary Visualizer** | 11-country SVG Heatmap + Tech Radar | Ratification Telemetry Matrix + DEFA Inclusivity Radar |
| **Data Granularity** | Scorecard (0–100) per principle x 11 nations | Legal Scrubbing Status + Data Friction + Civil Society Risk |
| **Exportability** | Instant CSV & JSON Dataset Export | Exportable DEFA Dataset (CSV & JSON) |
| **Narrative Vibe** | Swiss Atelier (*Newsreader* serif + *Inter*) | Identical Swiss Atelier Editorial Journalism aesthetic |

---

## 🌐 Proposed DEFA Route Architecture (`/defa/*`)

```
src/app/defa/
├── layout.tsx                     # Shared Layout with Header + DEFASubNav
├── page.tsx                       # Overview Portal (Redirects to /defa/chapters)
├── chapters/page.tsx             # Module 1: DEFA 9-Chapter Telemetry & Ratification Matrix
├── data-governance/page.tsx      # Module 2: Data Free Flow with Trust (DFFT) & Localization
├── ai-ethics/page.tsx            # Module 3: ASEAN AI Governance & Ethics Alignment
├── payments-cyber/page.tsx       # Module 4: Regional Payment Connectivity & Cyber Defense
└── civil-society/page.tsx        # Module 5: Civil Society Threat Matrix & Readiness Radar
```

---

## 🛠️ Detailed Module Specifications & Requirements

### 1. Shared Layout & Sticky Sub-Navigation (`DEFASubNav.tsx`)
- **File**: `src/app/defa/layout.tsx` & `src/components/defa/DEFASubNav.tsx`
- **UX Specs**:
  - Sticky position under header (`top-[var(--drone-admin-bar-h,72px)]`).
  - 5 Navigation Tabs with custom Lucide icons and ASEAN color highlights:
    1. 📊 **Chapter Matrix** (`/defa/chapters`) — `FileText` (`text-asean-yellow`)
    2. 🌐 **Data Governance** (`/defa/data-governance`) — `Globe` (`text-asean-blue`)
    3. 🤖 **AI Ethics** (`/defa/ai-ethics`) — `Cpu` (`text-asean-emerald`)
    4. 💳 **Payments & Cyber** (`/defa/payments-cyber`) — `CreditCard` (`text-asean-amber`)
    5. 🛡️ **Civil Society Matrix** (`/defa/civil-society`) — `Shield` (`text-asean-red`)

---

### 2. Module 1: DEFA 9-Chapter Telemetry & Ratification Matrix (`/defa/chapters`)
- **Route**: `src/app/defa/chapters/page.tsx`
- **Focus**: Real-time status tracking of the 9 official DEFA chapters across all 11 member states:
  * *Chapter 1: Digital Trade Facilitation & Paperless Customs*
  * *Chapter 2: Data Governance & Cross-Border Data Flows (DFFT)*
  * *Chapter 3: Cybersecurity & Critical Information Infrastructure*
  * *Chapter 4: Digital Payments & E-Invoicing Interoperability*
  * *Chapter 5: Artificial Intelligence & Emerging Technologies*
  * *Chapter 6: Digital Competition & Consumer Safeguards*
  * *Chapter 7: Digital ID & Trust Services*
  * *Chapter 8: Digital Talent & Human Capital Mobility*
  * *Chapter 9: MSME Digital Inclusion & Equity*
- **Key Visual Components**:
  - **Manila SEOM Status Banner**: Real-time progress bar showing Legal Scrubbing (May–Nov 2026) -> Summit Signing (Nov 2026).
  - **11-Nation × 9-Chapter Telemetry Heatmap**: Matrix displaying status badges (`CONCLUDED`, `LEGAL_SCRUBBING`, `PROVISIONAL_RESERVATION`, `PENDING_CONSULTATION`).
  - **Chapter Popover Briefs**: Click cell to view TPP vs DEFA draft text comparisons and gazette links.

---

### 3. Module 2: Data Free Flow with Trust (DFFT) & Localization (`/defa/data-governance`)
- **Route**: `src/app/defa/data-governance/page.tsx`
- **Focus**: Chapter 2 deep-dive evaluating data sovereignty vs open digital trade.
- **Three-Tier Regulatory Spectrum**:
  1. *Open Transfer Regimes* (SG, PH, MY): Cross-border flows allowed by default.
  2. *Hybrid / Conditional Regimes* (ID, TH): Public sector data localization + private sector safeguards.
  3. *Strict Localization Regimes* (VN, MM, KH, LA, BN, TL): Mandatory local server & state access mandates.
- **Key Components**:
  - **Interactive Data Regime Vector Map**: Color-coded map matching `AseanMap.tsx`.
  - **ASEAN Model Contractual Clauses (MCCs) Adoption Tracker**.
  - **Legal Data Friction Scorecard**: Quantifying restrictions for journalists, NGOs, and cloud services.

---

### 4. Module 3: ASEAN AI Governance & Ethics Alignment (`/defa/ai-ethics`)
- **Route**: `src/app/defa/ai-ethics/page.tsx`
- **Focus**: Chapter 5 deep-dive evaluating alignment with the *ASEAN Guide on AI Ethics and Governance (2024)*.
- **Key Components**:
  - **AI Governance Scorecards**: Rating member states on Copyright for AI Training, Algorithmic Risk Classification, Automated Decision Audit Rights, and Watermarking Mandates.
  - **MMAI Harm Incident Linkage**: Real-time counter connecting reported algorithmic harm incidents from D.R.O.N.E.'s AI Media Monitoring engine.

---

### 5. Module 4: Regional Payment Connectivity & Cyber Defense (`/defa/payments-cyber`)
- **Route**: `src/app/defa/payments-cyber/page.tsx`
- **Focus**: Chapters 3 & 4 tracking cross-border QR payments and cybersecurity reporting laws.
- **Key Components**:
  - **Payment Corridor Network Matrix**: Visualizing active vs pending QR code linkages (QRIS ID, DuitNow MY, PayNow SG, PromptPay TH, Netcode VN).
  - **Incident Reporting Disclosure Window Comparison**: SG 72h vs MY 24h vs VN state notification window.
  - **Financial Data Privacy Score**: Evaluating transaction tracking vs surveillance risks.

---

### 6. Module 5: Civil Society Threat Matrix & Readiness Radar (`/defa/civil-society`)
- **Route**: `src/app/defa/civil-society/page.tsx`
- **Focus**: Civil society advocacy, democratic transparency, Big Tech lobbying risk, and readiness.
- **Key Components**:
  - **Democracy & Transparency Scorecard**: Closed-door SEOM negotiation evaluation and civil society inclusion index.
  - **Big Tech Deregulatory Pressure Warning**: Highlighting provisions banning source code audits or digital taxation.
  - **DEFA Inclusivity Radar Chart (`DEFARadarChart.tsx`)**: Dynamic SVG radar comparing digital infrastructure, legal readiness, MSME support, and digital rights.
  - **Export Telemetry Suite**: One-click CSV & JSON dataset export matching `BenchmarkExport.tsx`.

---

## 🎨 UI/UX Vibe & Design System Guidelines

1. **Typography**:
   * Headline Serif: *Newsreader* (`font-serif-editorial font-extrabold`).
   * Body & Metadata Sans: *Inter* (`font-sans`). Zero monospace fonts in UI text.
2. **Branding & Colors**:
   * Strictly reference `ASEAN_COLORS` (`asean-blue`, `asean-red`, `asean-yellow`, `asean-emerald`, `asean-amber`, `asean-sky`). Zero generic Tailwind color classes.
3. **Micro-Stats & Flags**:
   * High-density stats cards with neutral icons (`text-slate-400`) and real SVG country flags (`country-flag-icons/react/3x2`).

---

## 🚀 Implementation Roadmap

| Phase | Task | Key Deliverables |
| :--- | :--- | :--- |
| **Phase 1** | Scaffolding & Navigation | Create `DEFASubNav.tsx` & `src/app/defa/layout.tsx` |
| **Phase 2** | DEFA Data Models & Services | Create `src/types/defa.ts` & `src/services/defa.ts` |
| **Phase 3** | Chapter Matrix & Data Governance | Implement `/defa/chapters` & `/defa/data-governance` |
| **Phase 4** | AI, Payments & Civil Society | Implement `/defa/ai-ethics`, `/defa/payments-cyber`, `/defa/civil-society` |
| **Phase 5** | Verification & Linter | Verify with `node scripts/check-colors.js`, `npx vitest run`, `npx next build` |
