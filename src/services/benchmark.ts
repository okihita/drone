import { DIGITAL_2_DOZEN_PRINCIPLES, getPrincipleById, getPrinciplesByCluster } from "@/lib/digital2dozen";
import { getBenchmarkScores, getCountryBenchmarkSummary, getAllBenchmarkSummaries } from "@/lib/benchmarkData";
import type { BenchmarkPrinciple, BenchmarkScore, BenchmarkCountrySummary } from "@/types/benchmark";

/** Get all 24 principles. */
export function listPrinciples(): BenchmarkPrinciple[] {
  return DIGITAL_2_DOZEN_PRINCIPLES;
}

/** Get principles grouped by cluster. */
export function listPrinciplesByCluster() {
  return getPrinciplesByCluster();
}

/** Get a single principle. */
export function fetchPrinciple(id: number): BenchmarkPrinciple | undefined {
  return getPrincipleById(id);
}

/** Get benchmark scores, optionally filtered. */
export function fetchBenchmarkScores(countryCode?: string): BenchmarkScore[] {
  return getBenchmarkScores(countryCode);
}

/** Get a single country's summary. */
export function fetchCountryBenchmark(countryCode: string, countryName: string): BenchmarkCountrySummary {
  return getCountryBenchmarkSummary(countryCode, countryName);
}

/** Get all countries' summaries. */
export function listAllBenchmarks(): BenchmarkCountrySummary[] {
  return getAllBenchmarkSummaries();
}
