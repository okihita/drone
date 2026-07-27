"use client";

import React from "react";
import { ASEAN_COUNTRIES } from "./AseanMap";

export default function AseanBlindMap() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden flex items-center justify-center">
      <svg
        viewBox="0 0 540 370"
        className="w-full h-full object-cover opacity-20 dark:opacity-30 transform scale-110 sm:scale-100 transition-opacity"
      >
        {ASEAN_COUNTRIES.map((country) => (
          <path
            key={country.id}
            d={country.path}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.75"
            className="text-amber-400 dark:text-blue-400"
          />
        ))}
      </svg>
    </div>
  );
}
