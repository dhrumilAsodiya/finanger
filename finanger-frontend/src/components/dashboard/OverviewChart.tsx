"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface OverviewChartProps {
  income: number;
  expense: number;
}

export default function OverviewChart({ income, expense }: OverviewChartProps) {
  // We transform the two numbers into an array for the chart
  const data = [
    { name: "Income", amount: income, fill: "#10b981" }, // Emerald-500
    { name: "Expense", amount: expense, fill: "#ef4444" }, // Red-500
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        {/* Custom Tooltip to show exact numbers on hover */}
        <Tooltip 
          cursor={{ fill: 'transparent' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
        />
        <Bar 
          dataKey="amount" 
          radius={[4, 4, 0, 0]} 
          barSize={50} // Thickness of the bars
        />
      </BarChart>
    </ResponsiveContainer>
  );
}