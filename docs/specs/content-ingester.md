# Feature Specification: EngageMedia Automated Content Ingester

> **Components**: `.github/workflows/engagemedia-sync.yml`, `/api/cron/engagemedia-sync`, `/admin/ingester`  
> **Cost Model**: $0/month serverless architecture  
> **Status**: Active Specification  

---

## 1. Overview & Workflow

The automated content ingester periodically polls EngageMedia's public WordPress REST API, extracts relevant policy articles, automatically enriches post metadata with ASEAN country ISO codes and threat levels, and stages items in an authenticated Admin Review Queue (`/admin/ingester`).

```mermaid
flowchart LR
    A[GitHub Actions Cron / Trigger] -->|POST + Bearer Token| B[/api/cron/engagemedia-sync]
    B -->|Fetch Posts| C[EngageMedia WordPress API]
    C -->|Parse & Map Metadata| B
    B -->|Upsert Raw Posts| D[Supabase Ingester Staging Table]
    D -->|Triage & Approve| E[/admin/ingester UI]
    E -->|Publish| F[Public Ledger & News Feeds]
```

---

## 2. Ingestion Rules & Metadata Detection

- **ISO Country Tagging**: Automatically detects ASEAN 11 country mentions (ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL) in titles and excerpts.
- **Threat Level Scoring**:
  - `[High Alert]` / `[Medium Risk]` / `[Rights Verified]`
- **Human-in-the-Loop (HITL)**: Unverified items remain in `/admin/ingester` until an authenticated administrator reviews, edits, and publishes them with one click.
