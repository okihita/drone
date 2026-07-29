import type { Metadata } from "next";
import { Newsreader, Geist } from "next/font/google";
import { Suspense } from "react";
import AdminBarLoader from "@/components/AdminBarLoader";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://drone.engagemedia.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DRONE — ASEAN Digital Rights Oversight & Network Evaluator",
  description: "Independent policy research portal and data observatory tracking digital trade treaties, cross-border data governance, and AI rights across Southeast Asia.",
  keywords: ["ASEAN Policy", "Digital Rights", "DEFA", "Southeast Asia", "EngageMedia", "AI Governance", "Data Privacy"],
  authors: [{ name: "EngageMedia Research Team" }, { name: "EngageMedia" }],
  openGraph: {
    title: "DRONE — ASEAN Digital Rights Oversight & Network Evaluator",
    description: "Independent policy research portal and data observatory tracking digital trade treaties, cross-border data governance, and AI rights across Southeast Asia.",
    url: siteUrl,
    siteName: "DRONE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DRONE — ASEAN Digital Rights Oversight & Network Evaluator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DRONE — ASEAN Digital Rights Oversight & Network Evaluator",
    description: "Independent policy research portal and data observatory tracking digital trade treaties, cross-border data governance, and AI rights across Southeast Asia.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geist.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('drone-theme') || 'system';
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-200 pt-[var(--drone-admin-bar-h,0px)]">
        <Suspense fallback={null}>
          <AdminBarLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
