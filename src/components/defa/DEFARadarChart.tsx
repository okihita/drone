"use client";

import React, { useState } from "react";
import { getDefaCivilSocietyStates } from "@/services/defa";
import { ASEAN_MEMBER_STATES, ASEANCountryCode } from "@/lib/countries";
import { ASEAN_COLORS } from "@/lib/colors";
import { FLAG_COMPONENTS } from "@/lib/flags";

export default function DEFARadarChart() {
  const csStates = getDefaCivilSocietyStates();
  const [selectedCountry, setSelectedCountry] = useState<ASEANCountryCode>("SG");

  const activeState = csStates.find((s) => s.countryCode === selectedCountry) || csStates[0];
  const activeCountry = ASEAN_MEMBER_STATES.find((m) => m.code === selectedCountry);

  // SVG Radar Dimensions
  const size = 300;
  const center = size / 2;
  const radius = 100;
  const axes = [
    { label: "SEOM Transparency", value: activeState.seomTransparencyIndex },
    { label: "Big Tech Independence", value: 100 - activeState.bigTechPressureScore },
    { label: "Digital Divide Parity", value: 100 - activeState.digitalDivideGapScore },
    { label: "Overall Readiness", value: activeState.overallReadinessIndex },
  ];

  // Calculate polygon points
  const points = axes.map((axis, i) => {
    const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
    const r = (axis.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-editorial text-lg font-bold text-slate-900 dark:text-white">
            11-Nation DEFA Readiness &amp; Inclusion Radar
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Evaluating digital divide, Big Tech influence, and SEOM negotiation transparency
          </p>
        </div>

        {/* Country Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          {ASEAN_MEMBER_STATES.map((c) => {
            const FlagIcon = FLAG_COMPONENTS[c.code];
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setSelectedCountry(c.code)}
                aria-pressed={selectedCountry === c.code}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all focus-visible:ring-2 focus-visible:ring-asean-yellow/70 ${
                  selectedCountry === c.code
                    ? "bg-asean-blue text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {FlagIcon && <FlagIcon className="w-3.5 h-2.5 rounded-xs shrink-0" />}
                {c.code}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Radar Chart Visualizer */}
        <div className="relative flex flex-col items-center py-4">
          <svg width={size} height={size} className="overflow-visible font-sans" role="img" aria-label={`${activeCountry?.name ?? "ASEAN"} DEFA readiness radar chart with four axes`}>
            {/* Concentric Grid Circles */}
            {[0.25, 0.5, 0.75, 1].map((scale) => (
              <circle
                key={scale}
                cx={center}
                cy={center}
                r={radius * scale}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray={scale === 1 ? "none" : "2,2"}
              />
            ))}

            {/* Radar Axes Lines */}
            {axes.map((axis, i) => {
              const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              const cosA = Math.cos(angle);
              const anchor = cosA > 0.3 ? "start" : cosA < -0.3 ? "end" : "middle";
              const labelWidth = axis.label.length * 6.3;
              const lxRaw = center + (radius + 22) * cosA + (cosA > 0.3 ? 6 : cosA < -0.3 ? -6 : 0);
              const lx = cosA > 0.3
                ? Math.min(lxRaw, size - labelWidth - 4)
                : cosA < -0.3
                  ? Math.max(lxRaw, labelWidth + 4)
                  : lxRaw;
              const ly = center + (radius + 18) * Math.sin(angle);

              return (
                <g key={axis.label} aria-hidden="true">
                  <line x1={center} y1={center} x2={x2} y2={y2} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={anchor}
                    dominantBaseline="middle"
                    className="text-[9px] font-bold fill-slate-500 uppercase tracking-wider pointer-events-none select-none"
                  >
                    {axis.label}
                  </text>
                </g>
              );
            })}

            {/* Radar Polygon */}
            <polygon
              points={points}
              fill="rgba(0, 51, 153, 0.25)"
              stroke={ASEAN_COLORS.blue}
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </svg>
          <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 text-center max-w-[260px] font-sans">
            Larger shaded area = stronger democratic inclusion and DEFA readiness (0–100 per axis).
          </p>
        </div>

        {/* Breakdown Stats for Selected Country */}
        <div className="space-y-3 font-sans text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            {activeCountry && <activeCountry.Flag className="w-5 h-3.5 object-cover rounded-[2px]" />}
            <span className="font-bold text-slate-900 dark:text-white text-sm">{activeCountry?.name} Radar Dossier</span>
          </div>

          {axes.map((axis) => (
            <div key={axis.label} className="space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">{axis.label}</span>
                <span className="font-mono text-asean-blue font-bold">{axis.value} / 100</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-asean-blue" style={{ width: `${axis.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
