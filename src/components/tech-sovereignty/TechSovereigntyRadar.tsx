"use client";

import { useState } from "react";
import type { BenchmarkCountrySummary } from "@/types/benchmark";
import { ASEAN_COLORS } from "@/lib/colors";
import { ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL } from "country-flag-icons/react/3x2";

const FLAG_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  ID, MY, SG, PH, TH, VN, KH, LA, MM, BN, TL,
};

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: number[];
}

const AXIS_LABELS: Record<number, string> = {
  6: "No Forced Tech Transfer",
  7: "Source Code Protection",
  8: "Technology Choice",
  9: "Authentication Methods",
  12: "Encryption Products",
};

const COUNTRY_COLORS = [
  ASEAN_COLORS.blue, ASEAN_COLORS.red, ASEAN_COLORS.yellow, ASEAN_COLORS.emerald, ASEAN_COLORS.amber,
  ASEAN_COLORS.sky, ASEAN_COLORS.blueLight, ASEAN_COLORS.redLight, ASEAN_COLORS.yellowLight, ASEAN_COLORS.emeraldLight, ASEAN_COLORS.amberLight,
];

export default function TechSovereigntyRadar({ summaries, principles }: Props) {
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(
    new Set(["SG", "MY", "VN", "MM"]),
  );

  const toggleCountry = (code: string) => {
    const next = new Set(selectedCountries);
    if (next.has(code)) {
      if (next.size > 1) next.delete(code);
    } else {
      if (next.size < 4) next.add(code);
    }
    setSelectedCountries(next);
  };

  // SVG constants
  const cx = 280;
  const cy = 240;
  const radius = 200;
  const levels = 5; // 5 concentric rings (20/40/60/80/100)
  const sides = principles.length;
  const angleSlice = (Math.PI * 2) / sides;

  function getPoint(value: number, idx: number): { x: number; y: number } {
    const r = (value / 100) * radius;
    const angle = angleSlice * idx - Math.PI / 2; // start from top
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  function getPoints(values: number[]): string {
    return values
      .map((v, i) => {
        const p = getPoint(v, i);
        return `${p.x},${p.y}`;
      })
      .join(" ");
  }

  const selectedSummaries = summaries.filter((s) => selectedCountries.has(s.countryCode));

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Radar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4">
          <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white mb-4">
            Technology Sovereignty Comparison
          </h2>
          <div className="flex justify-center">
            <svg viewBox="0 0 560 480" className="w-full max-w-[560px] h-auto" role="img" aria-label="Technology Sovereignty radar chart">
              {/* Concentric rings */}
              {Array.from({ length: levels }, (_, i) => {
                const r = ((i + 1) / levels) * radius;
                const ringPoints = Array.from({ length: sides }, (_, j) => {
                  const a = angleSlice * j - Math.PI / 2;
                  return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
                }).join(" ");
                return (
                  <g key={`ring-${i}`}>
                    <polygon
                      points={ringPoints}
                      fill="none"
                      stroke={i === levels - 1 ? ASEAN_COLORS.textMutedDark : ASEAN_COLORS.borderDark}
                      strokeWidth={i === levels - 1 ? 1.5 : 0.5}
                      className="dark:stroke-slate-400"
                    />
                    {i < levels - 1 && (
                      <text
                        x={cx + 8}
                        y={cy - ((i + 1) / levels) * radius + 3}
                        className="fill-slate-400 dark:fill-slate-500 text-[8px] font-sans"
                      >
                        {(i + 1) * 20}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Axis lines */}
              {principles.map((_, i) => {
                const end = getPoint(100, i);
                return (
                  <line
                    key={`axis-${i}`}
                    x1={cx} y1={cy} x2={end.x} y2={end.y}
                    stroke={ASEAN_COLORS.borderDark}
                    strokeWidth="0.5"
                    className="dark:stroke-slate-600"
                  />
                );
              })}

              {/* Axis labels */}
              {principles.map((pid, i) => {
                const labelPoint = getPoint(112, i);
                const label = AXIS_LABELS[pid] ?? `Principle ${pid}`;
                const words = label.split(" ");
                const fontSize = "8px";
                return (
                  <text
                    key={`label-${i}`}
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-700 dark:fill-slate-300 font-sans"
                    style={{ fontSize }}
                  >
                    {words.length > 3
                      ? words.map((w, wi) => (
                          <tspan key={wi} x={labelPoint.x} dy={wi === 0 ? 0 : 9}>
                            {w}
                          </tspan>
                        ))
                      : label}
                  </text>
                );
              })}

              {/* Country polygons */}
              {selectedSummaries.map((summary, si) => {
                const values = principles.map(
                  (pid) => summary.scores.find((sc) => sc.principleId === pid)?.score ?? 0,
                );
                const points = getPoints(values);
                const color = COUNTRY_COLORS[si % COUNTRY_COLORS.length];
                return (
                  <g key={`country-${summary.countryCode}`}>
                    <polygon
                      points={points}
                      fill={color}
                      fillOpacity="0.15"
                      stroke={color}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {values.map((v, i) => {
                      const p = getPoint(v, i);
                      return (
                        <circle
                          key={`dot-${i}`}
                          cx={p.x} cy={p.y} r="3"
                          fill={color}
                        />
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-3">
            {selectedSummaries.map((s, i) => {
              const FlagIcon = FLAG_COMPONENTS[s.countryCode];
              return (
                <div key={s.countryCode} className="flex items-center gap-1.5 text-[11px] font-sans">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COUNTRY_COLORS[i % COUNTRY_COLORS.length] }}
                  />
                  {FlagIcon && <FlagIcon className="w-3.5 h-2.5 rounded-xs shrink-0 inline-block shadow-xs" />}
                  <span className="font-bold text-slate-700 dark:text-slate-300">{s.countryCode}</span>
                  <span className="text-slate-500 dark:text-slate-400">{s.countryName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Country Selector + Scorecards */}
        <div className="space-y-4">
          <h2 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
            Select Countries (up to 4)
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {summaries.map((s) => {
              const selected = selectedCountries.has(s.countryCode);
              const techScores = s.scores.filter((sc) => principles.includes(sc.principleId));
              const avgTech = Math.round(techScores.reduce((sum, sc) => sum + sc.score, 0) / techScores.length);
              const FlagIcon = FLAG_COMPONENTS[s.countryCode];
              return (
                <button
                  key={s.countryCode}
                  onClick={() => toggleCountry(s.countryCode)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-bold transition-all border flex items-center gap-1 ${
                    selected
                      ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-white"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                  }`}
                >
                  {FlagIcon && <FlagIcon className="w-3.5 h-2.5 rounded-xs shrink-0 shadow-xs" />}
                  {s.countryCode}
                  <span className={`text-[10px] ${
                    avgTech >= 60 ? "text-asean-emerald"
                    : avgTech >= 35 ? "text-asean-amber"
                    : "text-asean-red"
                  }`}>
                    ({avgTech})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Per-Principle Scorecards for selected countries */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {selectedSummaries.map((s) => {
              const techScores = s.scores.filter((sc) => principles.includes(sc.principleId));
              const avgTech = Math.round(techScores.reduce((sum, sc) => sum + sc.score, 0) / techScores.length);
              const FlagIcon = FLAG_COMPONENTS[s.countryCode];
              return (
                <div key={s.countryCode} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
                  <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {FlagIcon && <FlagIcon className="w-4 h-3 rounded-xs shrink-0 shadow-xs" />}
                      <span className="font-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{s.countryCode}</span>
                      {s.countryName}
                    </span>
                    <span className={`text-xs font-sans font-extrabold ${
                      avgTech >= 60 ? "text-asean-emerald"
                      : avgTech >= 35 ? "text-asean-amber"
                      : "text-asean-red"
                    }`}>
                      Avg {avgTech}/100
                    </span>
                  </div>
                  <div className="space-y-1">
                    {techScores.sort((a, b) => a.principleId - b.principleId).map((sc) => (
                      <div key={sc.principleId} className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="text-slate-600 dark:text-slate-400 font-sans truncate">{AXIS_LABELS[sc.principleId] ?? `#${sc.principleId}`}</span>
                        <span className={`font-sans font-bold shrink-0 text-[11px] ${
                          sc.score >= 70 ? "text-asean-emerald" : sc.score >= 40 ? "text-asean-amber" : "text-asean-red"
                        }`}>{sc.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
