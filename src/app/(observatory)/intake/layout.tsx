import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Dossier — DRONE",
  description: "Encrypted intake portal for regional activists and human rights defenders.",
  robots: { index: false, follow: false },
};

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
