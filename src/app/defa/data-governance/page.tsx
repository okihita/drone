import DefaDataGovernanceView from "@/components/defa/DefaDataGovernanceView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cross-Border Data Flows & Localization Observatory | DEFA Observatory",
  description: "Evaluating Data Free Flow with Trust (DFFT) vs domestic server localization decrees across all 11 ASEAN member states.",
};

export default function DefaDataGovernancePage() {
  return <DefaDataGovernanceView />;
}
