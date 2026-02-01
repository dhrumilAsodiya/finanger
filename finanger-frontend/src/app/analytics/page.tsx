import { auth } from "@clerk/nextjs/server";
import { getTransactions } from "@/lib/api";
import AnalyticsView from "@/components/dashboard/AnalyticsView";

export default async function AnalyticsPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) return <div>Unauthorized</div>;

  // Reuse the existing API to get raw data
  const transactions = await getTransactions(token);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      <AnalyticsView transactions={transactions} />
    </div>
  );
}