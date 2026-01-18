
import fs from 'fs';
import path from 'path';
import { sql } from 'drizzle-orm';

async function resetTable() {
  // Manually load .env
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim().replace(/^["']|["']$/g, ''); // Simple cleanup
      }
    });
  }

  // Dynamic import
  const { db } = await import('@/lib/db');

  console.log('Dropping proxy_sources table...');
  await db.execute(sql`DROP TABLE IF EXISTS proxy_sources`);
  console.log('Table dropped.');
  process.exit(0);
}

resetTable().catch(console.error);
