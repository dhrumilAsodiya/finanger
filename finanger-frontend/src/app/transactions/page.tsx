import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";
import { getTransactions, Transaction } from "@/lib/api"; // Import our API helper
import { auth } from "@clerk/nextjs/server";
import TransactionDeleteButton from "@/components/dashboard/TransactionDeleteButton";
import ExportButton from "@/components/dashboard/ExportButton"; // <--- 1. ADD THIS IMPORT


export default async function TransactionsPage() {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) return <div>Unauthorized</div>;

  // Pass token
  const transactions: Transaction[] = await getTransactions(token);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-slate-500 mt-1">
            Manage your daily expenses and income.
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton data={transactions} />
          {/* If you have an AddTransactionDialog (from previous steps), it usually goes here too */}
          {/* <AddTransactionDialog /> */}
        </div>
      </div>

      {/* Filters (Visual only for now) */}
      <div className="flex items-center gap-2 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search transactions..."
            className="pl-8 bg-slate-50 border-slate-200"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* The Real Data Table */}
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead> {/*Empty header for actions */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-slate-500">
                  No transactions found. Go add one!
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium text-slate-600">
                    {t.date}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{t.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {t.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={t.type === "INCOME" ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-slate-500"}
                    >
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-bold ${t.type === "INCOME" ? "text-emerald-600" : "text-red-600"
                      }`}
                  >
                    {t.type === "INCOME" ? "+" : "-"}₹{t.amount}
                  </TableCell>
                  {/* NEW DELETE COLUMN */}
                  <TableCell>
                    {/* We must pass the ID (and verify it exists) */}
                    {t.id && <TransactionDeleteButton id={t.id} />}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}