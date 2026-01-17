import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Database features will not work.');
}

const sql = neon(process.env.DATABASE_URL || 'postgres://user:pass@host:5432/db');
export const db = drizzle(sql, { schema });
