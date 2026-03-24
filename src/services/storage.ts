// services/amountService.ts
import { db } from "@/db/database";
import { Subscription } from "@/types/Subscription";
import { Transaction } from "@/types/Transaction";

export const loadTotalAmount = async () => {

  const result = await db.query.amount.findFirst()
  return result?.totalAmount ?? 0;
};

export const loadTransaction = async (): Promise<Transaction[]> => {
  const rows = await db.query.transactions.findMany();
  return (rows ?? []).map((row) => ({
    ...row,
    date: new Date(row.date),
  }));
};

export const loadSubcriptions = async () : Promise<Subscription[]> =>{
    const rows = await db.query.subscriptions.findMany();
    return (rows ?? []).map((row) =>({
        ...row,
        createAt: new Date(row.createdAt)
    }));
}