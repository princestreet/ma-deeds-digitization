"use client";

import { scanningContractors } from "@/data/scanningContractors";
import { formatCurrency } from "@/lib/formatters";

export default function ScanningContractorsTable() {
  const total = scanningContractors.reduce((sum, c) => sum + c.total, 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-amber-50 border-b border-amber-200">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-amber-800 uppercase tracking-wide">Vendor</th>
            <th className="px-3 py-2 text-right text-xs font-semibold text-amber-800 uppercase tracking-wide">Narrow Spending</th>
          </tr>
        </thead>
        <tbody>
          {scanningContractors.slice(0, 20).map((c) => (
            <tr key={c.vendor} className="border-b border-slate-100 hover:bg-amber-50/50">
              <td className="px-3 py-2 font-medium text-slate-800">{c.vendor}</td>
              <td className="px-3 py-2 text-right text-slate-700 font-mono text-xs">{formatCurrency(c.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 border-t border-slate-200">
          <tr>
            <td className="px-3 py-2 font-bold text-slate-800">Total (all {scanningContractors.length} vendors)</td>
            <td className="px-3 py-2 text-right font-bold text-slate-800 font-mono text-xs">{formatCurrency(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
