"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { registryBreakdown } from "@/data/registryBreakdown";
import { COLORS } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import ChartContainer from "@/components/ChartContainer";

export default function RegistryBreakdownChart() {
  return (
    <ChartContainer
      title="FY2016 Planned Spending by Registry (Fund 0049)"
      caption="From Senate Docket SD2501 statewide spending plan. Boston/Suffolk accounts for ~40% of planned expenditures."
      sourceNote="Source: SD2501 — FY2016 Statewide Spending Plan"
    >
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={registryBreakdown}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fontFamily: "var(--font-sans)" }}
            tickFormatter={(v) => formatCurrency(v, true)}
          />
          <YAxis
            type="category"
            dataKey="registry"
            tick={{ fontSize: 11, fontFamily: "var(--font-sans)" }}
            width={130}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value as number)}
          />
          <Bar dataKey="planned" fill={COLORS.fund0049} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
