import type { Metadata } from "next";
import TradeDealsView from "@/components/trade/TradeDealsView";

export const metadata: Metadata = {
  title: "Trade Deals & Treaties Timeline | Digital Trade Agreements — DRONE",
  description: "Gantt and vertical timeline tracking DEFA, CPTPP, DEPA, IPEF, and bilateral digital economy agreement negotiations across Southeast Asia.",
};

export default function TradeNegotiationsPage() {
  return <TradeDealsView />;
}

