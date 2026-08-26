import type { LucideIcon } from "lucide-react";

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
    <div className="shrink-0 flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-sans">
      {stats.map((pill, idx) => (
        <div key={pill.label} className="flex items-center gap-4">
          {idx > 0 && <div className="h-8 w-px bg-slate-300 dark:bg-slate-700" />}
          <div className="flex items-center gap-2">
            <pill.icon className={`h-5 w-5 ${pill.iconClass}`} />
            <div>
              <span className="block font-sans text-sm text-slate-400 uppercase font-bold">{pill.label}</span>
              <span className="font-bold text-slate-900 dark:text-white">{pill.value}</span>
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
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${colsClass} gap-2.5`}>
      {cards.map((card) => (
        <div key={card.title} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-600 dark:text-slate-400 leading-snug">
          <strong className="block text-slate-800 dark:text-slate-200 font-bold mb-0.5">{card.title}</strong>
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
    <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 py-6 sm:py-9 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            {eyebrow && (
              <span className={`text-sm font-sans font-bold uppercase tracking-wider ${eyebrowClass}`}>
                {eyebrow}
              </span>
            )}
            <h1 className={`font-serif-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight ${eyebrow ? "mt-1" : ""}`}>
              {title}
            </h1>
            {description && (
              <div className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl font-sans leading-relaxed">
                {description}
              </div>
            )}
          </div>
          {rightSlot ?? (stats && stats.length > 0 && <StatPills stats={stats} />)}
        </div>

        {concepts && concepts.length > 0 && <ConceptCards cards={concepts} cols={conceptCols} />}

        {howToRead && (
          <p className="text-sm text-slate-400 dark:text-slate-500 max-w-3xl font-sans leading-relaxed">
            <strong className="text-slate-500 dark:text-slate-400">How to read</strong>: {howToRead}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
