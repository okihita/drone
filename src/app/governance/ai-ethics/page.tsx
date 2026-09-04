import DefaAiEthicsView from "@/components/defa/DefaAiEthicsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Ethics & Algorithmic Accountability | Data & AI Governance — DRONE",
  description: "Evaluating ASEAN Member State compliance with the ASEAN Guide on AI Ethics and Governance (2024), algorithmic transparency, and harm telemetry.",
};

export default function AiEthicsPage() {
  return <DefaAiEthicsView />;
}
