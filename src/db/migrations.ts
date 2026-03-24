import { sql } from 'drizzle-orm';
import { db } from './database';

export async function runMigrations() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS domain_events (
      id TEXT PRIMARY KEY,
      aggregate_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      payload TEXT NOT NULL,
      version INTEGER NOT NULL,
      occurred_at TEXT NOT NULL,
      UNIQUE(aggregate_id, version)
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS active_subscriptions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      current_price REAL NOT NULL,
      billing_cycle TEXT NOT NULL,
      next_billing_date TEXT NOT NULL,
      started_at TEXT NOT NULL
    )
  `);

  await db.run(sql`
    CREATE TABLE IF NOT EXISTS price_history (
      id TEXT PRIMARY KEY,
      subscription_id TEXT NOT NULL,
      price REAL NOT NULL,
      valid_from TEXT NOT NULL
    )
  `);
}