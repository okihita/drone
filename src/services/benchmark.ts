import { DIGITAL_2_DOZEN_PRINCIPLES } from "@/lib/digital2dozen";
import { getAllBenchmarkSummaries } from "@/lib/benchmarkData";
import type { BenchmarkPrinciple, BenchmarkCountrySummary } from "@/types/benchmark";

/** Get all 24 principles. */
export function listPrinciples(): BenchmarkPrinciple[] {
  return DIGITAL_2_DOZEN_PRINCIPLES;
}

/** Get all countries' summaries. */
export function listAllBenchmarks(): BenchmarkCountrySummary[] {
  return getAllBenchmarkSummaries();
}
