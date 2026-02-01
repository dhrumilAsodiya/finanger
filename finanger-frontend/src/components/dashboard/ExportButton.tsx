"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/lib/api";

export default function ExportButton({ data }: { data: Transaction[] }) {
  
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    // 1. Define CSV Headers
    const headers = ["Date", "Description", "Type", "Category", "Amount"];
    
    // 2. Convert Data to CSV Rows
    const csvContent = [
      headers.join(","), // Header Row
      ...data.map(t => {
        return [
          t.date,
          `"${t.description.replace(/"/g, '""')}"`, // Escape quotes
          t.type,
          t.category,
          t.amount
        ].join(",");
      })
    ].join("\n");

    // 3. Create a Blob and Download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}