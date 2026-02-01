"use client"; // Interactive Island

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TransactionForm from "./TransactionForm";

export default function AddTransactionButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* 1. The Trigger: This is what the user sees initially */}
      <SheetTrigger asChild>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </SheetTrigger>

      {/* 2. The Content: This slides out when clicked */}
      {/* sm:max-w-[540px] makes it wider on tablets/desktop */}
{/* Added 'p-6' to force 24px padding on all sides */}
<SheetContent className="overflow-y-auto sm:max-w-[540px] p-6">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Record a new income or expense entry.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-4">
          {/* We pass the close function so the form can close the sheet on success */}
          <TransactionForm onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}