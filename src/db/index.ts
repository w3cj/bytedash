import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/db/schema';
import env from "@/env";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    max: (env.DB_MIGRATING || env.DB_SEEDING) ? 1 : undefined,
    onnotice: env.DB_SEEDING ? () => {} : undefined,
  },
  casing: 'snake_case',
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
