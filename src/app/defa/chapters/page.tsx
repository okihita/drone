import DefaChapterHeatmap from "@/components/defa/DefaChapterHeatmap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DEFA 9-Chapter Ratification Telemetry Matrix | D.R.O.N.E.",
  description: "Real-time compliance telemetry mapping all 11 ASEAN member states across the 9 official Digital Economy Framework Agreement negotiation chapters.",
};

export default function DefaChaptersPage() {
  return <DefaChapterHeatmap />;
}
