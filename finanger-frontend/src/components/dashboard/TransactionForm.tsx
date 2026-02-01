"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { transactionSchema } from "@/lib/validators"; // We removed the type import to let inference work
import { createTransaction } from "@/lib/api";
import { useAuth } from "@clerk/nextjs"; // <--- Import this
import { useState } from "react";


export default function TransactionForm({ onClose }: { onClose?: () => void }) {
  const { getToken } = useAuth(); // <--- 1. Get the hook
  const [loading, setLoading] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: "" as any,
      type: "EXPENSE",
      category: "",
      date: new Date(), // Uncomment if you want a default date
    },
  });

async function onSubmit(data: any) {
    try {
      setLoading(true);
      
      // 2. Get the fresh token securely
      const token = await getToken();
      
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      // 3. Pass token to the API
      await createTransaction({
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      }, token);

      alert("Transaction Saved!");
      if (onClose) onClose();
      window.location.reload();
      
    } catch (error) {
      console.error(error);
      alert("Failed to save transaction.");
    } finally {
      setLoading(false);
    }
  
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-6">
        
        {/* GRID: Type & Amount */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-500 text-xs font-bold uppercase tracking-wider">Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                  <FormControl>
                    {/* h-12 makes it taller and professional */}
                    <SelectTrigger className="h-12 border-slate-200 shadow-sm">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOME" className="text-emerald-600 font-medium">Income</SelectItem>
                    <SelectItem value="EXPENSE" className="text-red-600 font-medium">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-500 text-xs font-bold uppercase tracking-wider">Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    {/* Centered the currency symbol vertically */}
                    <span className="absolute left-4 top-3.5 text-slate-400 font-medium text-lg">₹</span>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      className="pl-10 h-12 text-lg font-bold text-slate-900 border-slate-200 shadow-sm" 
                      {...field} 
                      value={field.value as number} 
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-xs font-bold uppercase tracking-wider">Description</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g. Grocery Shopping" 
                  className="h-12 border-slate-200 shadow-sm" 
                  {...field} 
                  value={field.value as string} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500 text-xs font-bold uppercase tracking-wider">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                <FormControl>
                  <SelectTrigger className="h-12 border-slate-200 shadow-sm">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-slate-500 text-xs font-bold uppercase tracking-wider">Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-12 pl-4 text-left font-normal border-slate-200 hover:bg-slate-50 shadow-sm",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value as Date}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-14 mt-6 text-lg shadow-md transition-all hover:scale-[1.01]">
          Save Transaction
        </Button>
      </form>
    </Form>
  );
}