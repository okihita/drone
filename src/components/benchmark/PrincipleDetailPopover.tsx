"use client";

import { useEffect, useState } from "react";
import type { BenchmarkPrinciple } from "@/types/benchmark";
import { X } from "lucide-react";

interface Props {
  principle: BenchmarkPrinciple;
  position: { x: number; y: number };
  onClose?: () => void;
}

export default function PrincipleDetailPopover({ principle, position, onClose }: Props) {
  const [coords, setCoords] = useState<{ left: number; top: number }>({ left: 16, top: 100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updatePosition() {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) return;

      const popoverWidth = 320;
      const popoverHeight = 220;
      const left = Math.max(12, Math.min(position.x + 12, window.innerWidth - popoverWidth - 16));
      const top = Math.max(12, Math.min(position.y - 10, window.innerHeight - popoverHeight - 16));
      setCoords({ left, top });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [position]);

  useEffect(() => {
    if (!onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (isMobile) {
    return (
      <div
        role="dialog"
        aria-label={`${principle.title} — principle details`}
        className="fixed inset-x-0 bottom-0 z-50 p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-2xl rounded-t-2xl animate-[slideInUp_0.2s_ease-out]"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-extrabold text-slate-700 dark:text-slate-300">
              #{principle.id}
            </span>
            <span className="font-bold text-sm text-slate-900 dark:text-white">{principle.title}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              aria-label="Close detail card"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{principle.description}</p>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-2 text-[10px]">
          <span className="font-sans font-bold text-slate-400 dark:text-slate-500 uppercase">TPP Source: {principle.tppSource}</span>
          <p className="mt-1 text-slate-500 dark:text-slate-400 italic leading-relaxed">{principle.provisionText}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={`${principle.title} — principle details`}
      className="fixed z-40 w-80 p-4 rounded-xl shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-sans pointer-events-none animate-[fadeIn_0.15s_ease-out]"
      style={{ left: `${coords.left}px`, top: `${coords.top}px` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="font-sans text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          #{principle.id}
        </span>
        <span className="font-bold text-slate-900 dark:text-white">{principle.title}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{principle.description}</p>
      <div className="border-t border-slate-100 dark:border-slate-800 pt-2">
        <span className="text-[10px] font-sans font-bold text-slate-400 dark:text-slate-500 uppercase">TPP Source: {principle.tppSource}</span>
        <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 italic leading-relaxed">{principle.provisionText}</p>
      </div>
    </div>
  );
}
