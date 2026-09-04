import PlatformLaborWatchdogView from "@/components/accountability/PlatformLaborWatchdogView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Labor & Platform Watchdog | Platform Accountability — DRONE",
  description: "Evaluating algorithmic management, dynamic surge dispatch, arbitrary account deactivations, and Fairwork labor protections across Southeast Asian super-apps.",
};

export default function CivilSocietyPage() {
  return <PlatformLaborWatchdogView />;
}
