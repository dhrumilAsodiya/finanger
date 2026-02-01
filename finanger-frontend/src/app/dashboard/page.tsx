import AddTransactionButton from "@/components/dashboard/AddTransactionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { getDashboardStats } from "@/lib/api"; // Import the new helper\
import OverviewChart from "@/components/dashboard/OverviewChart";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
// 1. Get the Token from Clerk
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    return <div>Unauthorized</div>;
  }

  // 2. Pass token to the API
  const stats = await getDashboardStats(token);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Overview of your financial health.
          </p>
        </div>
        <AddTransactionButton />
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Balance Card */}
        <Card className="bg-slate-900 text-white border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">
              Total Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-slate-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{stats.totalBalance.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live from Database
            </p>
          </CardContent>
        </Card>

        {/* Income Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Income
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              +₹{stats.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time earnings
            </p>
          </CardContent>
        </Card>

        {/* Expense Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              -₹{stats.totalExpense.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time spending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for the Chart (Phase 4 Part 2) */}
      {/* Spending Overview Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex flex-col space-y-1.5">
          <h3 className="font-semibold leading-none tracking-tight">
            Spending Overview
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="h-[350px] w-full pt-4">
            {/* The Real Chart Component */}
            <OverviewChart 
              income={stats.totalIncome} 
              expense={stats.totalExpense} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}