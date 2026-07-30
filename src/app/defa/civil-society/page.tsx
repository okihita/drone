import DefaCivilSocietyView from "@/components/defa/DefaCivilSocietyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Civil Society Threat Matrix & DEFA Readiness | DEFA Observatory",
  description: "Evaluating closed-door SEOM negotiation transparency, Big Tech lobby pressure, digital divide equity gaps, and 11-nation DEFA readiness.",
};

export default function DefaCivilSocietyPage() {
  return <DefaCivilSocietyView />;
}
