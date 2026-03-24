import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// proiezione — totale speso aggregato
export const amount = sqliteTable('amount', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  totalAmount: real('total_amount').notNull().default(0),
});

// master data — abbonamenti attivi
export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  repeat: text('repeat').notNull(), // monthly | yearly | weekly
  createdAt: text('created_at').notNull(),
});

// log immutabile — ogni volta che un abbonamento si rinnova
export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  subscriptionId: text('subscription_id').notNull(),
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  date: text('date').notNull(),
});