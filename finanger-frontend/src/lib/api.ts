const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/transactions";

export interface Transaction {
  id?: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

// 1. GET Transactions (Now needs a token)
export async function getTransactions(token: string) {
  const res = await fetch(API_URL, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`, // <--- The Key!
    },
  });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
}

// 2. CREATE Transaction (Now needs a token)
export async function createTransaction(data: Transaction, token: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // <--- The Key!
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create transaction");
  }
  return res.json();
}

// 3. GET Stats (Now needs a token)
export async function getDashboardStats(token: string) {
  const res = await fetch(`${API_URL}/stats`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`, // <--- The Key!
    },
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

// 4. DELETE Transaction
export async function deleteTransaction(id: string, token: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete transaction");
  }
}