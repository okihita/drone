import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D.R.O.N.E. — ASEAN Digital Rights Oversight & Network Evaluator",
  description: "Independent policy research portal and data observatory tracking digital trade treaties, cross-border data governance, and AI rights across Southeast Asia.",
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
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f17] text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
