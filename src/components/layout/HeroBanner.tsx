import type { LucideIcon } from "lucide-react";
import { BookOpen, Info } from "lucide-react";

export interface StatPillData {
  icon: LucideIcon;
  iconClass: string;
  label: string;
  value: React.ReactNode;
}

export interface ConceptCardData {
  title: string;
  desc: string;
}

const CONCEPT_COLUMNS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

function StatPills({ stats }: { stats: StatPillData[] }) {
  return (
    <div className="shrink-0 flex flex-wrap items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-sm font-sans">
      {stats.map((pill, idx) => (
        <div key={pill.label} className="flex items-center gap-4 sm:gap-6">
          {idx > 0 && <div className="h-9 w-px bg-slate-200 dark:bg-slate-700" />}
          <div className="flex items-center gap-2.5">
            <pill.icon className={`h-5 w-5 shrink-0 ${pill.iconClass}`} />
            <div>
              <span className="block font-sans text-sm text-slate-400 uppercase font-bold tracking-wider">{pill.label}</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{pill.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConceptCards({ cards, cols = 5 }: { cards: ConceptCardData[]; cols?: number }) {
  const colsClass = CONCEPT_COLUMNS[cols] ?? "lg:grid-cols-5";
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${colsClass} gap-4 sm:gap-6`}>
      {cards.map((card) => (
        <div key={card.title} className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800/80 text-sm text-slate-600 dark:text-slate-400 leading-relaxed shadow-xs hover:border-slate-300 dark:hover:border-slate-600 transition-all">
          <strong className="block text-slate-900 dark:text-white font-bold mb-1.5 text-sm">{card.title}</strong>
          {card.desc}
        </div>
      ))}
    </div>
  );
}

interface HeroBannerProps {
  eyebrow?: string;
  eyebrowClass?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  stats?: StatPillData[];
  rightSlot?: React.ReactNode;
  concepts?: ConceptCardData[];
  conceptCols?: number;
  howToRead?: React.ReactNode;
  children?: React.ReactNode;
}

export default function HeroBanner({
  eyebrow,
  eyebrowClass = "text-asean-yellow",
  title,
  description,
  stats,
  rightSlot,
  concepts,
  conceptCols,
  howToRead,
  children,
}: HeroBannerProps) {
  return (
    <section className="relative border-b border-slate-200/70 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-10">
          <div className="flex-1 max-w-3xl">
            {eyebrow && (
              <span className={`text-sm font-sans font-bold uppercase tracking-wider ${eyebrowClass}`}>
                {eyebrow}
              </span>
            )}
            <h1 className={`font-serif-editorial text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight ${eyebrow ? "mt-2" : ""}`}>
              {title}
            </h1>
            {description && (
              <div className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                {description}
              </div>
            )}
          </div>
          {rightSlot ?? (stats && stats.length > 0 && <StatPills stats={stats} />)}
        </div>

        {concepts && concepts.length > 0 && (
          <div className="pt-8 border-t border-slate-200/70 dark:border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-sans">
              <BookOpen className="w-4 h-4 text-asean-blue" />
              <span>Core Concepts &amp; Regulatory Dimensions</span>
            </div>
            <ConceptCards cards={concepts} cols={conceptCols} />
          </div>
        )}

        {howToRead && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/30 border border-slate-200/70 dark:border-slate-800/70 text-sm font-sans text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl">
            <Info className="w-4 h-4 text-asean-blue shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Reading Guidance: </strong>
              {howToRead}
            </div>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
