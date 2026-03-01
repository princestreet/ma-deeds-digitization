"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { narrowVsBroad } from "@/data/narrowVsBroad";
import { COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import ChartContainer from "@/components/ChartContainer";

export default function NarrowVsBroadChart() {
  return (
    <ChartContainer
      title="Narrow vs. Broad Classification by Year (FY2010-2026)"
      caption="Gray bars show total Fund 0049 spending. Lines show narrow (direct scanning) and broad (all IT) classification trends."
      sourceNote="Source: CTHRU transaction-level data, classified by Object code"
    >
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={narrowVsBroad} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
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
          <Bar
            dataKey="fundTotal"
            name="Fund 0049 Total"
            fill={COLORS.fundTotal}
            fillOpacity={0.4}
            barSize={24}
          />
          <Line
            type="monotone"
            dataKey="broadTotal"
            name="Broad (All IT)"
            stroke={COLORS.broad}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="narrow"
            name="Narrow (Scanning)"
            stroke={COLORS.narrow}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
