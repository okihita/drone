"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import BenchmarkHeroMap from "./BenchmarkHeroMap";
import BenchmarkHeatmap from "./BenchmarkHeatmap";
import BenchmarkExport from "./BenchmarkExport";
import type { BenchmarkCountrySummary, BenchmarkPrinciple } from "@/types/benchmark";

interface Props {
  summaries: BenchmarkCountrySummary[];
  principles: BenchmarkPrinciple[];
}

export default function BenchmarkClientShell({ summaries, principles }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const urlCountry = searchParams.get("country");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    urlCountry && summaries.some((s) => s.countryCode === urlCountry.toUpperCase())
      ? urlCountry.toUpperCase()
      : "ID",
  );

  const handleSelectCountry = (code: string | null) => {
    setSelectedCountry(code);
    const params = new URLSearchParams(searchParams.toString());
    if (code) {
      params.set("country", code);
    } else {
      params.delete("country");
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  useEffect(() => {
    if (urlCountry && summaries.some((s) => s.countryCode === urlCountry.toUpperCase())) {
      setSelectedCountry(urlCountry.toUpperCase());
    }
  }, [urlCountry, summaries]);

  return (
    <>
      <BenchmarkHeroMap
        selectedCountryCode={selectedCountry}
        onSelectCountry={handleSelectCountry}
      />
      <main className="flex-1">
        <BenchmarkHeatmap
          summaries={summaries}
          principles={principles}
          selectedCountry={selectedCountry}
          onSelectCountry={handleSelectCountry}
        />
        <BenchmarkExport summaries={summaries} />
      </main>
    </>
  );
}
