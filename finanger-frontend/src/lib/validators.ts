import { z } from "zod";

// This is the "Blueprint" for a valid transaction
export const transactionSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters"),
  amount: z.coerce.number().positive("Amount must be greater than 0"), // coerce converts string "500" to number 500
  category: z.string().min(1, "Please select a category"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z.date({
    message: "A date is required.",
  }),
});

// We export the "Type" so TypeScript knows what this looks like automatically
export type TransactionFormValues = z.infer<typeof transactionSchema>;