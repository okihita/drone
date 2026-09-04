import DefaCivilSocietyView from "@/components/defa/DefaCivilSocietyView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Labor & Platform Watchdog | Platform Accountability — DRONE",
  description: "Evaluating closed-door negotiation transparency, Big Tech lobby pressure, gig worker dispatch algorithms, and civil society readiness.",
};

export default function CivilSocietyPage() {
  return <DefaCivilSocietyView />;
}
