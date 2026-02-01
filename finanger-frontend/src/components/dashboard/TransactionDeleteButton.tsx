"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TransactionDeleteButton({ id }: { id: string }) {
  const { getToken } = useAuth();
  const router = useRouter(); // Used to refresh the page data
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      await deleteTransaction(id, token);
      
      // Refresh the Server Component to remove the deleted row
      router.refresh(); 
    } catch (error) {
      console.error(error);
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete} 
      disabled={loading}
      className="text-slate-400 hover:text-red-600 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}