# Feature Specification: Interactive Cartography & Visual Engine

> **Components**: `src/components/AseanMap.tsx`, `src/components/landing/HeroMapCanvas.tsx`, `public/data/southeast-asia.json`  
> **Projection Library**: `d3-geo`  
> **Status**: Active Specification  

---

## 1. Cartographic Dataset & Projection

- **Source Dataset**: Real Natural Earth GeoJSON (`public/data/southeast-asia.json`). Hand-crafted SVG coordinates are strictly prohibited.
- **D3 Projection**: Rendered using standard Mercator/Equal Earth projections configured in `AseanMap.tsx` and `HeroMapCanvas.tsx`.

---

## 2. Interactive Behaviors & Visual Styling

1. **Ambient Radar Spotlights**:
   - Hovering over a country dynamically generates a soft radial gradient matching its regime status token (`asean-yellow`, `asean-blue`, or `asean-red`).
2. **Crosshair Exploration**:
   - Map canvas applies `cursor-crosshair` to emphasize active surveillance and data analysis.
3. **Hero Slideshow & Carousel**:
   - Hero featured story carousel maintains locked height bounds (`min-h-[500px] lg:h-[500px]`) and smooth opacity crossfades (`transition-opacity duration-700`) to guarantee Zero Cumulative Layout Shift (CLS).
