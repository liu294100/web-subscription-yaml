import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const clashYamls = pgTable('clash_yamls', {
  id: serial('id').primaryKey(),
  filename: text('filename').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const stOverrides = pgTable('st_overrides', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  ruleUrl: text('rule_url').notNull(),
  proxies: jsonb('proxies').$type<string[]>(), // Array of proxy names
  createdAt: timestamp('created_at').defaultNow(),
});
