# Product Requirements Document (PRD)
## EngageMedia Automated Content Ingester & Human-in-the-Loop (HITL) Staging Queue

**Document Version**: 1.0.0  
**Target Release**: Sprint 2 / Sprint 4  
**Author**: EngageMedia & DRONE Core Technical Team  
**Status**: Approved / In Development  
**Branch**: `feat/engagemedia-cron-ingester`

---

## 1. Executive Summary & Goals

### 1.1 Problem Statement
EngageMedia regularly produces high-impact articles, investigative research reports, and media monitoring datasets on digital rights, AI governance, and internet freedom across Southeast Asia. Currently, DRONE operates as an independent observatory without an automated mechanism to ingest, categorize, and cross-post EngageMedia’s primary reporting into DRONE's Verified Regulatory Ledger (`/ledger`) and Cartographic Jurisdiction Observatory (`/observatory`).

### 1.2 Solution Overview
The **EngageMedia Automated Content Ingester** is a zero-cost ($0/month), serverless ingestion and editorial review pipeline. It periodically polls EngageMedia's WordPress REST API, extracts relevant posts (tagged with AI, digital rights, cybersecurity, data privacy), automatically enriches metadata (mapping regional context to ASEAN 11 country ISO codes), and stages items in an Encrypted/Authenticated Admin Staging Queue (`/admin/ingester`). Human editors can review, score, edit, and publish approved posts directly to DRONE's live public registry with one click.

### 1.3 Key Objectives
- **Automated Discovery**: Automatically retrieve new EngageMedia content within 6–12 hours of publication.
- **Zero Infrastructure Cost ($0/mo)**: Leverage GitHub Actions (or Vercel Crons) and Google Gemini AI Studio Free Tier.
- **Human-in-the-Loop (HITL) Quality Control**: Prevent unverified or miscategorized content from reaching public feeds without editor approval.
- **ASEAN Metadata Mapping**: Auto-detect country ISO codes (ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL) and threat levels (`[High Alert]`, `[Medium Risk]`, `[Rights Verified]`).

---

## 2. Infrastructure Requirements & $0 Cost Breakdown

To achieve a **$0.00 / month operating cost**, the ingester relies on generous free-tier cloud infrastructure:

### 2.1 Required Infrastructure & API Keys
1. **Cron Runner ($0)**: 
   - **Primary**: GitHub Actions (`.github/workflows/engagemedia-sync.yml`) running on a scheduled cron (`0 */6 * * *`), utilizing free runner minutes.
   - **Secondary / Backup**: Vercel Native Cron Jobs (`vercel.json`), operating on the Vercel Hobby Free plan.
2. **Database & Vector Store ($0)**:
   - Supabase PostgreSQL (Free Tier: 500MB storage, Drizzle ORM integration).
3. **AI Classification & Enrichment ($0)**:
   - Google AI Studio API (`GEMINI_API_KEY`) using `gemini-1.5-flash` or `gemini-2.0-flash` (Free Tier limit: 15 Requests/Min, 1,500 Requests/Day — far exceeding ingestion needs).
4. **Security & Authentication ($0)**:
   - `CRON_SECRET` environment variable (Bearer token header authentication for the `/api/cron/engagemedia-sync` endpoint).

### 2.2 Environment Variables Configuration
The user/administrator only needs to provide standard environment variables:
- `CRON_SECRET`: Random 32-character secure secret string.
- `GEMINI_API_KEY`: Free Google AI Studio API key.
- `NEXT_PUBLIC_SUPABASE_URL` & `SUPABASE_SERVICE_ROLE_KEY`: Existing project credentials.

---

## 3. System Architecture & Workflows

### 3.1 Step-by-Step Data Flow
1. **Trigger Phase**:
   - Every 6 hours, GitHub Actions triggers `POST /api/cron/engagemedia-sync` with the `Authorization: Bearer <CRON_SECRET>` header.
2. **Fetch Phase**:
   - The API route queries `https://engagemedia.org/wp-json/wp/v2/posts` with tag filters (`artificial-intelligence` [ID: 381], `data-privacy`, `cybersecurity`, `digital-rights`).
   - Requests request up to 30 recent posts, excluding previously ingested WP post IDs stored in DRONE's database.
3. **Enrichment & Auto-Classification Phase**:
   - For each new post, the service calls Gemini 1.5 Flash to extract structured JSON metadata:
     - Target ASEAN Jurisdiction Code (`ID`, `MY`, `SG`, `PH`, `TH`, `VN`, `KH`, `LA`, `MM`, `BN`, `TL`, or `ASEAN` for regional).
     - Category (`AI Governance`, `DEFA`, `Cross-Border Data`, `Cybersecurity`).
     - Threat Level (`High Alert`, `Medium Risk`, `Rights Verified`).
     - Executive 2-sentence policy summary.
4. **Staging Phase**:
   - The item is inserted into the `news_items` database with `status = 'pending_review'`.
5. **Review & Publication Phase**:
   - EngageMedia researchers log into DRONE's `/admin/ingester` page.
   - Editors can view pending items, adjust country tags, refine summaries, and click **Approve & Publish** (sets `status = 'published'`) or **Discard**.
6. **Public Presentation**:
   - Approved articles immediately appear on `/ledger` (Verified Regulatory Ledger) and under the specific country dossier on `/observatory`.

---

## 4. Database Schema Specifications

The existing `news_items` database schema will be extended with ingestion metadata fields.

### 4.1 Schema Extension (`src/db/schema.ts`)
- `wp_post_id`: Integer, unique index (prevents duplicate ingestion).
- `status`: Text (`'pending_review'` | `'published'` | `'archived'`).
- `jurisdiction`: Text (e.g. `'Indonesia (ID)'`, `'Regional (ASEAN)'`).
- `category`: Text (`'AI Governance'`, `'DEFA'`, `'Cross-Border Data'`, `'Cybersecurity'`).
- `threat_level`: Text (`'High Alert'`, `'Medium Risk'`, `'Rights Verified'`).
- `raw_wp_data`: JSONB (optional, stores original WP API payload for reference).

---

## 5. UI/UX Specifications: Admin Staging Queue (`/admin/ingester`)

### 5.1 Admin Staging Page (`/admin/ingester`)
- **Staging Header**: Shows total pending items, sync status, and a manual **"Run Sync Now"** button.
- **Card / Table Layout**:
  - EngageMedia article title, publication date, original URL link, thumbnail image preview.
  - Auto-suggested Jurisdiction dropdown (pre-selected by Gemini classification).
  - Auto-suggested Category & Threat Level pill badges.
  - Editable summary text box.
- **Action Buttons**:
  - `[Approve & Publish]`: Publishes item to live `/ledger`.
  - `[Reject & Archive]`: Removes from queue.
  - `[Edit Metadata]`: Inline editor for title, summary, and primary links.

---

## 6. Error Handling & Edge Cases

1. **WordPress API Unavailability / Rate Limits**:
   - Implements exponential backoff and retry mechanisms. Logs errors gracefully without breaking existing feeds.
2. **Duplicate Ingestion Prevention**:
   - DB enforces a unique constraint on `wp_post_id`. Ingested items are skipped via `ON CONFLICT (wp_post_id) DO NOTHING`.
3. **Gemini Classification Fallback**:
   - If AI classification fails or times out, the post defaults to `jurisdiction = 'Regional (ASEAN)'` and `category = 'AI Governance'`, flagging it for manual human review.
4. **Unauthorized Cron Execution**:
   - `/api/cron/engagemedia-sync` validates `CRON_SECRET`. Returns `401 Unauthorized` for invalid or missing tokens.

---

## 7. Verification & Testing Plan

### 7.1 Automated Verification
- Unit test for WP REST API parser (`tests/engagemedia-parser.test.ts`).
- Integration test for API endpoint authorization with valid/invalid `CRON_SECRET`.
- Database insertion deduplication verification.

### 7.2 Manual Verification
- Execute `curl -X POST http://localhost:3000/api/cron/engagemedia-sync` with test headers.
- Verify pending items populate in `/admin/ingester`.
- Test approving an item and confirming appearance on `/ledger` and `/observatory`.

---

## 8. Implementation Roadmap

- [x] **Branch Creation**: `feat/engagemedia-cron-ingester`
- [x] **PRD Approval**: Written & reviewed
- [ ] **Phase 1**: Database schema update (`wp_post_id`, `status` in `src/db/schema.ts`)
- [ ] **Phase 2**: Cron API route & Gemini classifier service (`src/app/api/cron/engagemedia-sync/route.ts`)
- [ ] **Phase 3**: Admin Staging Queue UI (`src/app/admin/ingester/page.tsx`)
- [ ] **Phase 4**: GitHub Actions workflow deployment (`.github/workflows/engagemedia-sync.yml`)
