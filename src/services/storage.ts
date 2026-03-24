// services/amountService.ts
import { db } from "@/db/database";
import { amount, subscriptions, transactions } from "@/db/schema";
import { Subscription } from "@/types/Subscription";
import { Transaction } from "@/types/Transaction";
import { and, eq, gte, lte, sum } from "drizzle-orm";
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

    const idRandom = randomUUID();
    const date = new Date().toISOString()
    const result = await db.insert(subscriptions).values({
        id: idRandom,
        name: s.name,
        amount: s.amount,
        repeat: s.repeat,
        createdAt: date,
    });

    const transaction = await db.insert(transactions).values({
        id: randomUUID(),
        name: s.name,
        subscriptionId: idRandom,
        amount: s.amount,
        date: date
    })

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

  export const loadMonthlyTotal = async (): Promise<number> => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
  
    const result = await db
      .select({ total: sum(transactions.amount) })
      .from(transactions)
      .where(
        and(
          gte(transactions.date, startOfMonth),
          lte(transactions.date, endOfMonth)
        )
      );
  
    return parseFloat(result[0]?.total ?? '0');
  };
  
  export const loadMonthlyTransactions = async (): Promise<Transaction[]> => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();
  
    const rows = await db.query.transactions.findMany({
      where: and(
        gte(transactions.date, startOfMonth),
        lte(transactions.date, endOfMonth)
      ),
      orderBy: (t, { desc }) => [desc(t.date)],
    });
  
    return (rows ?? []).map((row) => ({
      ...row,
      date: new Date(row.date),
    }));
  };
