"use client";

import {
  ComposedChart,
  Area,
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

export default function AnnualSpendingChart() {
  return (
    <ChartContainer
      title="Annual Spending by Fund (FY2005-2026)"
      caption="Stacked area shows Fund 0049 (state registries) and Fund 0050 (county registries). Dashed line shows inflation-adjusted combined total."
      sourceNote="Source: CTHRU Non-Budgeted Special Revenue Funds dataset via Socrata API"
    >
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={annualTotals} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
          <Area
            type="monotone"
            dataKey="fund0049"
            name="Fund 0049 (State)"
            stackId="1"
            fill={COLORS.fund0049}
            fillOpacity={0.6}
            stroke={COLORS.fund0049}
          />
          <Area
            type="monotone"
            dataKey="fund0050"
            name="Fund 0050 (County)"
            stackId="1"
            fill={COLORS.fund0050}
            fillOpacity={0.6}
            stroke={COLORS.fund0050}
          />
          <Line
            type="monotone"
            dataKey="inflationAdjusted"
            name="Combined (2026$)"
            stroke={COLORS.inflationAdj}
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
