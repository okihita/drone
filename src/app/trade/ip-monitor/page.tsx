import type { Metadata } from "next";
import IpSourceCodeView from "@/components/trade/IpSourceCodeView";

export const metadata: Metadata = {
  title: "IP & Trade Secret Risk Monitor | Digital Trade Agreements — DRONE",
  description: "Tracking intellectual property protection, trade secret theft risk, copyright safe harbors, patent disclosure mandates, and AI model exfiltration risk across Southeast Asia.",
};

export default function TradeIPMonitorPage() {
  return <IpSourceCodeView />;
}

