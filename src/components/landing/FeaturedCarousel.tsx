"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsCardItem } from "@/types";

export default function FeaturedCarousel({
  stories,
}: {
  stories: NewsCardItem[];
}) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused || stories.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, stories.length]);

  const activeStory = stories[activeSlideIndex];

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) =>
      prev === 0 ? stories.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % stories.length);
  };

  if (stories.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-800">
      {/* ... exact same JSX as original, omitting for brevity ... */}
      <div className="relative px-0 lg:px-14">
        <button
          onClick={handlePrevSlide}
          aria-label="Previous Story"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer hidden lg:block"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          aria-label="Next Story"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer hidden lg:block"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 min-h-[500px] lg:h-[500px]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch h-full">
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-full h-full bg-slate-950 overflow-hidden">
              <div
                key={activeSlideIndex}
                className="absolute inset-0 animate-fade-in"
              >
                <Image
                  src={stories[activeSlideIndex]?.image_url || ""}
                  alt={stories[activeSlideIndex]?.title || ""}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden z-20" />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full space-y-4 relative z-20">
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-2 text-xs font-sans">
                  <span className="bg-asean-yellow/20 text-asean-yellow font-bold px-2.5 py-0.5 rounded border border-asean-yellow/30 uppercase tracking-wider">
                    {activeStory.category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-sans text-xs">
                    {activeStory.read_time}
                  </span>
                </div>

                <div className="min-h-[5.5rem] flex items-center">
                  <h2 className="font-serif-editorial text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-4 transition-all duration-300">
                    {activeStory.title}
                  </h2>
                </div>

                <div className="min-h-[5.5rem] flex items-center">
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-serif-editorial italic border-l-2 border-asean-yellow pl-3 line-clamp-4 transition-all duration-300">
                    {activeStory.summary}
                  </p>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 font-sans pt-1">
                  By{" "}
                  <strong className="text-slate-900 dark:text-slate-200">
                    {activeStory.author}
                  </strong>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mt-auto">
                <Link
                  href={`/investigations/${activeStory.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs font-sans transition-colors shadow-xs"
                >
                  <span>Read Full Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-sans font-semibold">
                  Story {activeSlideIndex + 1} of {stories.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handlePrevSlide}
          aria-label="Previous Story"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer lg:hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          aria-label="Next Story"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer lg:hidden"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="mt-4 flex items-center justify-center gap-2.5 font-sans">
          {stories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setActiveSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${story.title}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlideIndex === idx
                  ? "w-8 bg-asean-yellow"
                  : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
