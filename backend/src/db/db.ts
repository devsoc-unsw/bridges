import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { DB } from 'kysely-codegen';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load env vars from .env
dotenv.config();

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
