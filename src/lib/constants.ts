export const COLORS = {
  fund0049: "#3b82f6",       // blue-500
  fund0050: "#8b5cf6",       // violet-500
  revenue: "#22c55e",        // green-500
  expenses: "#ef4444",       // red-500
  narrow: "#f59e0b",         // amber-500
  broad: "#6366f1",          // indigo-500
  fundTotal: "#94a3b8",      // slate-400
  inflationAdj: "#64748b",   // slate-500

  scanning: "#f59e0b",
  itInfra: "#3b82f6",
  payroll: "#94a3b8",
  other: "#d1d5db",
};

export const SECTION_IDS = {
  header: "header",
  bigPicture: "big-picture",
  whatMoneyBought: "what-money-bought",
  whoGotPaid: "who-got-paid",
  twoFundStructure: "two-fund-structure",
  dataGaps: "data-gaps",
  methodology: "methodology",
  sourceData: "source-data",
} as const;

export const SECTIONS = [
  { id: SECTION_IDS.bigPicture, label: "The Big Picture" },
  { id: SECTION_IDS.whatMoneyBought, label: "What the Money Bought" },
  { id: SECTION_IDS.whoGotPaid, label: "Who Got Paid" },
  { id: SECTION_IDS.twoFundStructure, label: "Two-Fund Structure" },
  { id: SECTION_IDS.dataGaps, label: "Data Gaps" },
  { id: SECTION_IDS.methodology, label: "Methodology" },
  { id: SECTION_IDS.sourceData, label: "Source Data" },
];
