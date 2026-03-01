"use client";

import { useState } from "react";
import { vendorAnalysis } from "@/data/vendorAnalysis";
import { formatCurrency, formatPct } from "@/lib/formatters";
import type { Vendor } from "@/lib/types";

type SortKey = "rank" | "totalSpending" | "pctOfTotal";

export default function VendorTable({ limit = 25 }: { limit?: number }) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(key === "rank"); }
  };

  const sorted = [...vendorAnalysis].slice(0, limit).sort((a, b) => {
    const mul = sortAsc ? 1 : -1;
    return (a[sortKey] - b[sortKey]) * mul;
  });

  const SortHeader = ({ k, children }: { k: SortKey; children: React.ReactNode }) => (
    <th
      className="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide cursor-pointer hover:text-slate-900 select-none"
      onClick={() => handleSort(k)}
    >
      {children}
      {sortKey === k && (
        <span className="ml-1">{sortAsc ? "▲" : "▼"}</span>
      )}
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <SortHeader k="rank">#</SortHeader>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Vendor</th>
            <SortHeader k="totalSpending">Total</SortHeader>
            <SortHeader k="pctOfTotal">%</SortHeader>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide">Role</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide hidden md:table-cell">Years</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wide hidden md:table-cell">Codes</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((v: Vendor) => (
            <tr key={v.rank} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-3 py-2 text-slate-500 font-mono text-xs">{v.rank}</td>
              <td className="px-3 py-2 font-medium text-slate-800">{v.vendor}</td>
              <td className="px-3 py-2 text-slate-700 font-mono text-xs">{formatCurrency(v.totalSpending)}</td>
              <td className="px-3 py-2 text-slate-500 text-xs">{formatPct(v.pctOfTotal)}</td>
              <td className="px-3 py-2">
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                  v.likelyRole.includes("Scanning")
                    ? "bg-amber-100 text-amber-800"
                    : v.likelyRole.includes("Consulting")
                    ? "bg-purple-100 text-purple-800"
                    : v.likelyRole.includes("Telecom")
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {v.likelyRole}
                </span>
              </td>
              <td className="px-3 py-2 text-slate-500 text-xs hidden md:table-cell">{v.yearsActive}</td>
              <td className="px-3 py-2 text-slate-400 text-xs hidden md:table-cell font-mono">{v.objectCodes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
