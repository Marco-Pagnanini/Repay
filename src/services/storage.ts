// services/amountService.ts
import { db } from "@/db/database";
import { amount, subscriptions } from "@/db/schema";
import { Subscription } from "@/types/Subscription";
import { Transaction } from "@/types/Transaction";
import { eq } from "drizzle-orm";
import { randomUUID } from "expo-crypto";

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

export const createSubscription = async(s:Omit<Subscription, 'id' | 'createAt'>) =>{
    const result = await db.insert(subscriptions).values({
        id: randomUUID(),
        name: s.name,
        amount: s.amount,
        repeat: s.repeat,
        createdAt: new Date().toISOString(),
    });
    const existing = await db.query.amount.findFirst();
  
  if (existing) {
    await db
      .update(amount)
      .set({ totalAmount: existing.totalAmount + s.amount })
      .where(eq(amount.id, existing.id));
  } else {
    await db.insert(amount).values({
      id: randomUUID(),
      ownerId: 'default',
      totalAmount: s.amount,
    });
  }



}