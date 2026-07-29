"use client";

import { useState } from "react";
import type { BenchmarkCountrySummary } from "@/types/benchmark";
import { DIGITAL_2_DOZEN_PRINCIPLES } from "@/lib/digital2dozen";

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
  "#003399", "#CC0000", "#FFCC00", "#008855", "#CC6600",
  "#0066CC", "#990066", "#339900", "#CC8800", "#005566", "#666666",
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
                      stroke={i === levels - 1 ? "#94a3b8" : "#cbd5e1"}
                      strokeWidth={i === levels - 1 ? 1.5 : 0.5}
                      className="dark:stroke-slate-600 dark:[&:nth-last-child]:stroke-slate-400"
                    />
                    {i < levels - 1 && (
                      <text
                        x={cx + 8}
                        y={cy - ((i + 1) / levels) * radius + 3}
                        className="fill-slate-400 dark:fill-slate-500 text-[8px] font-mono"
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
                    stroke="#cbd5e1"
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
            {selectedSummaries.map((s, i) => (
              <div key={s.countryCode} className="flex items-center gap-1.5 text-[11px] font-sans">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COUNTRY_COLORS[i % COUNTRY_COLORS.length] }}
                />
                <span className="font-bold text-slate-700 dark:text-slate-300">{s.countryCode}</span>
                <span className="text-slate-500 dark:text-slate-400">{s.countryName}</span>
              </div>
            ))}
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
              return (
                <button
                  key={s.countryCode}
                  onClick={() => toggleCountry(s.countryCode)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-sans font-bold transition-all border ${
                    selected
                      ? "bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-white"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                  }`}
                >
                  {s.countryCode}
                  <span className={`ml-1 text-[10px] ${
                    avgTech >= 60 ? "text-emerald-500"
                    : avgTech >= 35 ? "text-amber-500"
                    : "text-red-500"
                  }`}>
                    ({avgTech})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Per-Principle Scorecards for selected countries */}
          {selectedSummaries.map((s) => {
            const techScores = s.scores.filter((sc) => principles.includes(sc.principleId));
            const avgTech = Math.round(techScores.reduce((sum, sc) => sum + sc.score, 0) / techScores.length);
            return (
              <div key={s.countryCode} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{s.countryName}</span>
                  <span className={`text-xs font-mono font-bold ${
                    avgTech >= 60 ? "text-emerald-600"
                    : avgTech >= 35 ? "text-amber-600"
                    : "text-red-600"
                  }`}>
                    Avg: {avgTech}/100
                  </span>
                </div>
                {techScores.sort((a, b) => a.principleId - b.principleId).map((sc) => (
                  <div key={sc.principleId} className="flex items-center justify-between py-0.5 text-[10px]">
                    <span className="text-slate-600 dark:text-slate-400">{AXIS_LABELS[sc.principleId] ?? `#${sc.principleId}`}</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{sc.score}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
