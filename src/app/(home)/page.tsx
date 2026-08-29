import type { Metadata } from "next";
import HomeSections from "@/components/landing/HomeSections";
import { listJurisdictions } from "@/services/jurisdictions";
import { getRealAseanCountries } from "@/lib/aseanGeo";

export const revalidate = 3600; // ISR: regenerate page at most once per hour

export const metadata: Metadata = {
  title: "DRONE — ASEAN Digital Rights Oversight & Network Evaluator",
  description:
    "Independent policy research portal and data observatory tracking digital trade treaties, cross-border data governance, and AI rights across Southeast Asia.",
};

export default async function Home() {
  const jurisdictions = await listJurisdictions();
  const countries = getRealAseanCountries(jurisdictions);

  return (
    <main className="flex-1">
      <HomeSections initialCountries={countries} />
    </main>
  );
}
