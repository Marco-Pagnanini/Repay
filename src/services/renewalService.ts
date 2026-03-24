import { db } from '@/db/database';
import { amount, subscriptions, transactions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'expo-crypto';

function getNextRenewalDate(fromDate: Date, repeat: string): Date {
  const next = new Date(fromDate);
  switch (repeat.toLowerCase()) {
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      break;
    case 'yearly':
      next.setFullYear(next.getFullYear() + 1);
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
  }
  return next;
}

async function processSubscriptionRenewals(sub: typeof subscriptions.$inferSelect) {
  // trova l'ultima transazione per questo abbonamento
  const lastTransaction = await db.query.transactions.findFirst({
    where: eq(transactions.subscriptionId, sub.id),
    orderBy: (t, { desc }) => [desc(t.date)],
  });

  // punto di partenza — ultima transazione o data di creazione
  let lastDate = lastTransaction
    ? new Date(lastTransaction.date)
    : new Date(sub.createdAt);

  const now = new Date();
  let renewed = false;

  // crea tutte le transazioni mancanti fino ad oggi
  while (getNextRenewalDate(lastDate, sub.repeat) <= now) {
    lastDate = getNextRenewalDate(lastDate, sub.repeat);

    await db.insert(transactions).values({
      id: randomUUID(),
      subscriptionId: sub.id,
      name: sub.name,
      amount: sub.amount,
      date: lastDate.toISOString(),
    });

    renewed = true;
  }

  return renewed ? sub.amount : 0;
}

export async function processAllRenewals() {
  const allSubs = await db.query.subscriptions.findMany();
  let totalAdded = 0;

  for (const sub of allSubs) {
    const added = await processSubscriptionRenewals(sub);
    totalAdded += added;
  }

  // aggiorna il totale in amount se ci sono stati rinnovi
  if (totalAdded > 0) {
    const existing = await db.query.amount.findFirst();
    if (existing) {
      await db
        .update(amount)
        .set({ totalAmount: existing.totalAmount + totalAdded })
        .where(eq(amount.id, existing.id));
    }
  }
}