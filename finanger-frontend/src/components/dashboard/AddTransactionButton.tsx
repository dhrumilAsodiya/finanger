"use client";

import { Button } from "@/components/ui/button";
import TransactionForm from "./TransactionForm";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader, // <--- Add this import
  SheetTitle,  // <--- Add this import
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export default function AddTransactionButton() {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Button>Add Transaction</Button>;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Transaction</Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-100 sm:w-135">
        {/* FIX: Add the Header and Title here */}
        <SheetHeader>
          <SheetTitle>Add New Transaction</SheetTitle>
        </SheetHeader>

        {/* Add some spacing below the title if needed */}
        <div className="mt-4">
          <TransactionForm onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}