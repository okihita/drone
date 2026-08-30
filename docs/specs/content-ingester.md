# Feature Specification: EngageMedia Automated Content Ingester

> **Components**: `.github/workflows/engagemedia-sync.yml`, `/api/cron/engagemedia-sync`  
> **Cost Model**: $0/month serverless architecture  
> **Status**: Active Specification  

---

## 1. Overview & Workflow

The automated content ingester periodically polls EngageMedia's public WordPress REST API, extracts relevant policy articles, automatically enriches post metadata with ASEAN country ISO codes and threat levels via Gemini Flash, and publishes directly to Airtable's `News` table.

```mermaid
flowchart LR
    A[Vercel Cron / GitHub Actions] -->|POST + Bearer Token| B[/api/cron/engagemedia-sync]
    B -->|Fetch Posts| C[EngageMedia WordPress API]
    C -->|Parse & Map Metadata| B
    B -->|Gemini Flash Classification| D[Airtable News Table]
    D -->|60s Edge ISR| E[Public News & Investigations]
```

---

## 2. Ingestion Rules & Metadata Detection

- **ISO Country Tagging**: Automatically detects ASEAN 11 country mentions (ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL) in titles and excerpts.
- **Threat Level Scoring**:
  - `[High Alert]` / `[Medium Risk]` / `[Rights Verified]`
- **Human-in-the-Loop (HITL)**: Items are classified automatically by Gemini Flash and published directly to Airtable's `News` table, surfaced via 60s Edge ISR.
