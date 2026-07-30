"use client";

import { useState } from "react";
import BenchmarkHeroMap from "./BenchmarkHeroMap";
import BenchmarkHeatmap from "./BenchmarkHeatmap";
import BenchmarkExport from "./BenchmarkExport";
import type { BenchmarkCountrySummary, BenchmarkPrinciple } from "@/types/benchmark";

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: BenchmarkPrinciple[];
}

export default function BenchmarkClientShell({ summaries, principles }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>("ID");

  return (
    <>
      <BenchmarkHeroMap
        selectedCountryCode={selectedCountry}
        onSelectCountry={setSelectedCountry}
      />
      <main className="flex-1">
        <BenchmarkHeatmap
          summaries={summaries}
          principles={principles}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
        <BenchmarkExport summaries={summaries} />
      </main>
    </>
  );
}
