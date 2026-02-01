"use client";

import { Transaction } from "@/lib/api";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsView({ transactions }: { transactions: Transaction[] }) {
  
  // Calculate Spending by Category
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === "EXPENSE") {
        stats[t.category] = (stats[t.category] || 0) + t.amount;
        totalExpense += t.amount;
      }
    });

    // Convert to array and sort by amount (highest first)
    return Object.entries(stats)
      .map(([name, value]) => ({ name, value, percentage: (value / totalExpense) * 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Card 1: Expense Breakdown */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.length === 0 ? (
              <p className="text-sm text-slate-500">No expenses recorded yet.</p>
            ) : (
              categoryStats.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-slate-500">
                      ₹{cat.value.toLocaleString()} ({cat.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  {/* Custom Progress Bar */}
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div 
                      className="h-2 rounded-full bg-indigo-600" 
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}