"use client";

import React, { useState } from "react";
import { getDefaChapterStatuses, getDefaDataGovernanceStates, getDefaCivilSocietyStates } from "@/services/defa";
import { Download, FileSpreadsheet, FileJson } from "lucide-react";

export default function DEFABenchmarkExport() {
  const [downloading, setDownloading] = useState<"csv" | "json" | null>(null);

  const handleExportCSV = () => {
    setDownloading("csv");
    const statuses = getDefaChapterStatuses();
    const dataGov = getDefaDataGovernanceStates();
    const cs = getDefaCivilSocietyStates();

    let csvContent = "data:text/csv;charset=utf-8,CountryCode,ChapterID,Status,ProgressPercent,LegalFrictionScore,OverallReadinessIndex\n";
    statuses.forEach((st) => {
      const gov = dataGov.find((g) => g.countryCode === st.countryCode);
      const civ = cs.find((c) => c.countryCode === st.countryCode);
      csvContent += `${st.countryCode},${st.chapterId},${st.status},${st.progressPercent},${gov?.legalFrictionScore || 0},${civ?.overallReadinessIndex || 0}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ASEAN_DEFA_Telemetry_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(null), 800);
  };

  const handleExportJSON = () => {
    setDownloading("json");
    const exportData = {
      metadata: {
        title: "ASEAN DEFA Telemetry & Observatory Dataset",
        exportedAt: new Date().toISOString(),
        author: "EngageMedia Research Team",
      },
      statuses: getDefaChapterStatuses(),
      dataGovernance: getDefaDataGovernanceStates(),
      civilSociety: getDefaCivilSocietyStates(),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `ASEAN_DEFA_Telemetry_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloading(null), 800);
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
      <div className="space-y-1">
        <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
          <Download className="w-4 h-4 text-asean-emerald" /> Export DEFA Regional Telemetry Dataset
        </h4>
        <p className="text-xs text-slate-500">
          Download real-time SEOM legal scrubbing, DFFT regime tiers, and readiness metrics across 11 nations.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={handleExportCSV}
          disabled={downloading !== null}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition-all shadow-xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-asean-emerald" />
          {downloading === "csv" ? "Exporting..." : "Export CSV"}
        </button>

        <button
          type="button"
          onClick={handleExportJSON}
          disabled={downloading !== null}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 transition-all shadow-xs"
        >
          <FileJson className="w-4 h-4 text-asean-blue" />
          {downloading === "json" ? "Exporting..." : "Export JSON"}
        </button>
      </div>
    </div>
  );
}
