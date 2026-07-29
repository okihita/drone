import type { BenchmarkPrinciple } from "@/types/benchmark";

interface Props {
  principle: BenchmarkPrinciple;
  position: { x: number; y: number };
}

export default function PrincipleDetailPopover({ principle, position }: Props) {
  return (
    <div
      className="fixed z-40 w-80 p-4 rounded-xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-sans pointer-events-none animate-[fadeIn_0.15s_ease-out]"
      style={{ left: Math.min(position.x + 12, window.innerWidth - 340), top: position.y - 10 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          #{principle.id}
        </span>
        <span className="font-bold text-slate-900 dark:text-white">{principle.title}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{principle.description}</p>
      <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase">TPP Source: {principle.tppSource}</span>
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 italic leading-relaxed">{principle.provisionText}</p>
      </div>
    </div>
  );
}
