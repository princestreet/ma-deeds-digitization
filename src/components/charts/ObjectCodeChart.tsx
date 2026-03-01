"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { objectCodeBreakdown } from "@/data/objectCodeBreakdown";
import { COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import ChartContainer from "@/components/ChartContainer";

const PIE_COLORS = [COLORS.scanning, COLORS.itInfra, COLORS.payroll, COLORS.other];

export default function ObjectCodeChart() {
  return (
    <ChartContainer
      title="Fund 0049 Spending by Category (FY2010-2026)"
      caption="How the $61.8M in state-registry fund spending breaks down by MMARS Object code classification."
      sourceNote="Source: CTHRU transaction-level data, classified by Object code"
    >
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={objectCodeBreakdown}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            labelLine={true}
          >
            {objectCodeBreakdown.map((_, index) => (
              <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value as number)}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-sans)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
