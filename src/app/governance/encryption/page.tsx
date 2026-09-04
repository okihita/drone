import DefaEncryptionView from "@/components/defa/DefaEncryptionView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encryption & Privacy Safeguards | Data & AI Governance — DRONE",
  description: "Tracking encryption regulation across Southeast Asia: VPN bans, backdoor mandates, lawful intercept expansions, key escrow requirements, and cybersecurity capacity building.",
};

export default function EncryptionPage() {
  return <DefaEncryptionView />;
}
