import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D.R.O.N.E. | ASEAN Digital Rights Oversight & Network Evaluator",
  description: "High-altitude intelligence, policy tracking, and early-warning watchdog on ASEAN digital governance, cross-border data flows, and AI rights.",
  keywords: ["ASEAN Policy", "Digital Rights", "DEFA", "Southeast Asia", "EngageMedia", "AI Governance", "Data Privacy"],
  authors: [{ name: "Okihita" }, { name: "EngageMedia" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
