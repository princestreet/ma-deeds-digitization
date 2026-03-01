"use client";

import { annualTotals } from "@/data/annualTotals";
import { formatCurrency } from "@/lib/formatters";

export default function AnnualTotalsTable() {
  const totals = annualTotals.reduce(
    (acc, r) => ({
      fund0049: acc.fund0049 + r.fund0049,
      fund0050: acc.fund0050 + r.fund0050,
      combined: acc.combined + r.combined,
      revenue: acc.revenue + r.combinedRevenue,
      inflationAdj: acc.inflationAdj + r.inflationAdjusted,
    }),
    { fund0049: 0, fund0050: 0, combined: 0, revenue: 0, inflationAdj: 0 }
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-600 uppercase">FY</th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 uppercase">Fund 0049</th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 uppercase">Fund 0050</th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 uppercase">Combined</th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Revenue</th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-slate-600 uppercase hidden md:table-cell">Combined (2026$)</th>
          </tr>
        </thead>
        <tbody>
          {annualTotals.map((r) => (
            <tr key={r.year} className="border-b border-slate-100 hover:bg-slate-50">
              <td className="px-3 py-1.5 font-medium text-slate-800">
                {r.year}{r.note ? "*" : ""}
              </td>
              <td className="px-3 py-1.5 text-right font-mono text-xs text-slate-700">{formatCurrency(r.fund0049)}</td>
              <td className="px-3 py-1.5 text-right font-mono text-xs text-slate-700">{formatCurrency(r.fund0050)}</td>
              <td className="px-3 py-1.5 text-right font-mono text-xs text-slate-800 font-medium">{formatCurrency(r.combined)}</td>
              <td className="px-3 py-1.5 text-right font-mono text-xs text-green-700 hidden md:table-cell">{formatCurrency(r.combinedRevenue)}</td>
              <td className="px-3 py-1.5 text-right font-mono text-xs text-slate-500 hidden md:table-cell">{formatCurrency(r.inflationAdjusted)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-100 border-t-2 border-slate-300">
          <tr>
            <td className="px-3 py-2 font-bold text-slate-900">TOTAL</td>
            <td className="px-3 py-2 text-right font-mono text-xs font-bold text-slate-900">{formatCurrency(totals.fund0049)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs font-bold text-slate-900">{formatCurrency(totals.fund0050)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs font-bold text-slate-900">{formatCurrency(totals.combined)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs font-bold text-green-800 hidden md:table-cell">{formatCurrency(totals.revenue)}</td>
            <td className="px-3 py-2 text-right font-mono text-xs font-bold text-slate-700 hidden md:table-cell">{formatCurrency(totals.inflationAdj)}</td>
          </tr>
        </tfoot>
      </table>
      <p className="text-xs text-slate-400 mt-2">*Partial year</p>
    </div>
  );
}
