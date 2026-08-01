# Component Inventory

## Layout Components

| Component | Path | Client/Server | Description |
|---|---|---|---|
| Header | `src/components/Header.tsx` | Client | Site masthead with desktop dropdown nav and mobile drawer |
| Footer | `src/components/Footer.tsx` | Server | Global footer with EngageMedia link, research modules, and network links |
| AdminBar | `src/components/AdminBar.tsx` | Client | Floating admin toolbar shown to authenticated users |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Client | Light/dark/system theme switcher |
| LanguageSwitcher | `src/components/LanguageSwitcher.tsx` | Client | EN/ID language toggle |

## Landing Page Sections

| Component | Path | Client/Server | Description |
|---|---|---|---|
| HeroSection | `src/components/landing/HeroSection.tsx` | Client | Hero with tabbed lead story / jurisdiction dossier + interactive map |
| HeroMapCanvas | `src/components/landing/HeroMapCanvas.tsx` | Client | Interactive SVG ASEAN map with arc/threat/regime layers |
| HeroCountryDossier | `src/components/landing/HeroCountryDossier.tsx` | Client | Country detail card in hero section |
| FeaturedCarousel | `src/components/landing/FeaturedCarousel.tsx` | Client | Featured story carousel with pagination |
| EditorialGrid | `src/components/landing/EditorialGrid.tsx` | Server | Editorial insights grid with executive analysis and policy radar |
| BenchmarkPreview | `src/components/landing/BenchmarkPreview.tsx` | Server | D2D benchmark snapshot preview |
| InvestigationsList | `src/components/landing/InvestigationsList.tsx` | Client | Investigation articles listing |
| HomeSections | `src/components/landing/HomeSections.tsx` | Server | Streams hero/carousel/editorial sections with Suspense skeletons |

## Map & Observatory

| Component | Path | Client/Server | Description |
|---|---|---|---|
| AseanMap | `src/components/AseanMap.tsx` | Client | Full ASEAN jurisdiction map with modal dossiers and filter controls |
| PolicyLedgerTable | `src/components/PolicyLedgerTable.tsx` | Client | Filterable regulatory policy ledger table |

## Digital 2 Dozen Suite

| Component | Path | Client/Server | Description |
|---|---|---|---|
| D2DSubNav | `src/components/benchmark/D2DSubNav.tsx` | Client | Sub-navigation for D2D analysis pages |
| BenchmarkClientShell | `src/components/benchmark/BenchmarkClientShell.tsx` | Client | Interactive benchmark wrapper (tabs, filters) |
| BenchmarkHeatmap | `src/components/benchmark/BenchmarkHeatmap.tsx` | Client | Principle-by-principle compliance score heatmap |
| BenchmarkHeroMap | `src/components/benchmark/BenchmarkHeroMap.tsx` | Client | Benchmark-specific map visualization |
| BenchmarkExport | `src/components/benchmark/BenchmarkExport.tsx` | Client | CSV/JSON export buttons for benchmark data |
| PrincipleDetailPopover | `src/components/benchmark/PrincipleDetailPopover.tsx` | Client | Hover popover with principle details |

## Encryption Observatory

| Component | Path | Client/Server | Description |
|---|---|---|---|
| EncryptionSummaryStats | `src/components/encryption/EncryptionSummaryStats.tsx` | Client | Per-country encryption risk summary cards |
| EncryptionEventList | `src/components/encryption/EncryptionEventList.tsx` | Client | Timeline of encryption regulatory events |

## Tech Sovereignty

| Component | Path | Client/Server | Description |
|---|---|---|---|
| TechSovereigntyRadar | `src/components/tech-sovereignty/TechSovereigntyRadar.tsx` | Client | Radar chart visualization of tech sovereignty metrics |
| ViolationTimeline | `src/components/tech-sovereignty/ViolationTimeline.tsx` | Client | Timeline of digital rights violations |

## Admin

| Component | Path | Client/Server | Description |
|---|---|---|---|
| Sidebar | `src/components/admin/Sidebar.tsx` | Client | Admin dashboard sidebar navigation |
| RichTextEditor | `src/components/admin/RichTextEditor.tsx` | Client | Tiptap-based WYSIWYG editor with image upload and preview |

## UI Primitives (shadcn/ui)

| Component | Path | Description |
|---|---|---|
| Badge | `src/components/ui/badge.tsx` | Status/category badges |
| Button | `src/components/ui/button.tsx` | Base button with variants (default, outline, ghost, etc.) |
| Card | `src/components/ui/card.tsx` | Card container with header, content, footer |
| Input | `src/components/ui/input.tsx` | Text input field |
| Select | `src/components/ui/select.tsx` | Dropdown select |
| Separator | `src/components/ui/separator.tsx` | Visual divider |
| Skeleton | `src/components/ui/skeleton.tsx` | Loading skeleton placeholder |
| Table | `src/components/ui/table.tsx` | Data table with header, body, footer |
| Textarea | `src/components/ui/textarea.tsx` | Multi-line text input |

## Component Patterns

- **Server Components by default**: Components without `"use client"` are server-rendered
- **Client isolation**: Interactivity (hooks, event handlers, browser APIs) isolated in `"use client"` wrappers
- **cva variants**: Button, badge, and select use `class-variance-authority` for consistent variant/size APIs
- **As const types**: Navigation links, categories, and threat levels use `as const` arrays with derived union types
- **Dynamic imports**: Supabase-dependent services are dynamically imported to support builds without DB env vars
