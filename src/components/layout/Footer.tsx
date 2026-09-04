import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-400 font-sans transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 font-sans">

        {/* Col 1: Institutional Overview + EngageMedia Logo */}
        <div className="md:col-span-2 space-y-4 font-sans">
          <Link
            href="https://engagemedia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 shrink-0 group"
          >
            <Image
              src="/images/Logomark_Red_800px.png"
              alt="EngageMedia"
              width={800}
              height={800}
              className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-asean-yellow transition-colors font-sans">
              EngageMedia
            </span>
          </Link>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-lg font-sans">
            <strong>DRONE — Digital Rights Oversight &amp; Network Evaluator</strong> is an independent policy intelligence platform developed by <strong>EngageMedia</strong>. It monitors ASEAN digital trade frameworks, legal scrubbing, cross-border data transfer laws, and algorithmic governance threats.
          </p>

          <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 font-sans">
            <span>Maintained by: <strong className="text-slate-800 dark:text-slate-200 font-sans">EngageMedia Research Team</strong></span>
          </div>
        </div>

        {/* Col 2: Research Modules */}
        <div className="space-y-2 font-sans">
          <h4 className="font-sans text-sm uppercase font-bold text-slate-900 dark:text-white tracking-wider mb-3">
            Research Modules
          </h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-sans">
            <li><Link href="/governance" className="hover:text-asean-yellow transition-colors">Data &amp; AI Governance</Link></li>
            <li><Link href="/trade" className="hover:text-asean-yellow transition-colors">Digital Trade Agreements</Link></li>
            <li><Link href="/accountability" className="hover:text-asean-yellow transition-colors">Platform Accountability</Link></li>
            <li><Link href="/observatory" className="hover:text-asean-yellow transition-colors">Jurisdiction Observatory</Link></li>
            <li><Link href="/ledger" className="hover:text-asean-yellow transition-colors">Verified Policy Ledger</Link></li>
            <li><Link href="/links" className="hover:text-asean-yellow transition-colors">Curated Knowledge Hub</Link></li>
            <li><Link href="/leaks" className="hover:text-asean-yellow transition-colors">Encrypted Leaks Portal</Link></li>
          </ul>
        </div>

        {/* Col 3: Network & Resources */}
        <div className="space-y-2 font-sans">
          <h4 className="font-sans text-sm uppercase font-bold text-slate-900 dark:text-white tracking-wider mb-3">
            EngageMedia Network
          </h4>
          <ul className="space-y-3 text-sm font-sans">
            <li>
              <a href="https://engagemedia.org" target="_blank" rel="noopener noreferrer" className="hover:text-asean-yellow transition-colors flex items-center justify-between group">
                <span className="font-semibold text-slate-800 dark:text-slate-200">EngageMedia Official Site</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-asean-yellow" />
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-sans">Open and secure digital technologies, media, and human rights across Asia-Pacific</p>
            </li>
            <li>
              <a href="https://drapac.org" target="_blank" rel="noopener noreferrer" className="hover:text-asean-yellow transition-colors flex items-center justify-between group">
                <span className="font-semibold text-slate-800 dark:text-slate-200">DRAPAC Network</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-asean-yellow" />
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-sans">Digital Rights Asia-Pacific Assembly &amp; Regional Movement Building</p>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-900 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 font-sans">
        <div>© {CURRENT_YEAR} EngageMedia • DRONE Project • Released under CC BY 4.0 Human Rights License.</div>
      </div>
    </footer>
  );
}
