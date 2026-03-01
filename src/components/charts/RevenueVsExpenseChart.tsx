"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { annualTotals } from "@/data/annualTotals";
import { COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import ChartContainer from "@/components/ChartContainer";

export default function RevenueVsExpenseChart() {
  return (
    <ChartContainer
      title="Revenue vs. Expenses (FY2005-2026)"
      caption="Combined revenue from $5 per-recording surcharges vs. combined fund expenditures."
      sourceNote="Source: CTHRU Non-Budgeted Special Revenue Funds dataset"
    >
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={annualTotals} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fontFamily: "var(--font-sans)" }}
            tickFormatter={(v) => `'${String(v).slice(2)}`}
          />
          <YAxis
            tick={{ fontSize: 12, fontFamily: "var(--font-sans)" }}
            tickFormatter={(v) => formatCurrency(v, true)}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value as number)}
            labelFormatter={(label) => `FY${label}`}
          />
          <Legend wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-sans)" }} />
          <Line
            type="monotone"
            dataKey="combinedRevenue"
            name="Revenue"
            stroke={COLORS.revenue}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="combined"
            name="Expenses"
            stroke={COLORS.expenses}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
