// backend/src/db/init.ts
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';
import dotenv from 'dotenv';
import { up } from './migrations';

// Load env vars from .env
dotenv.config();

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});

async function migrate() {
  try {
    await up(db);
    console.log('Migration completed');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await db.destroy();
  }
}

migrate();
