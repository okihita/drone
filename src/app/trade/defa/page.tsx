import DefaChapterHeatmap from "@/components/defa/DefaChapterHeatmap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ASEAN DEFA Ratification Tracker | Digital Trade Agreements — DRONE",
  description: "Real-time compliance telemetry mapping all 11 ASEAN member states across the 9 official Digital Economy Framework Agreement negotiation chapters.",
};

export default function TradeDefaPage() {
  return <DefaChapterHeatmap />;
}
