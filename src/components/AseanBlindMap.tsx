"use client";

import React, { useMemo } from "react";
import { getRealAseanCountries } from "@/lib/aseanGeo";

export default function AseanBlindMap() {
  const countries = useMemo(() => getRealAseanCountries(), []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 540 370"
        className="w-full h-full object-cover opacity-15 dark:opacity-25 transform scale-100 transition-opacity"
      >
        {countries.map((country) => (
          <path
            key={country.id}
            d={country.pathD}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-amber-400 dark:text-blue-400"
          />
        ))}
      </svg>
    </div>
  );
}
