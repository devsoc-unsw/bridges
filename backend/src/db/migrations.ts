import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Societies
  await db.schema
    .createTable('societies')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('login_email', 'text', (col) => col.notNull().unique())
    .addColumn('contact_email', 'text', (col) => col.notNull().unique())
    .addColumn('description', 'text')
    .addColumn('logo_url', 'text')
    .addColumn('member_count', 'integer')
    .addColumn('is_approved', 'boolean', (col) =>
      col.notNull().defaultTo(false)
    )
    .execute();

  await db.schema
    .createTable('socials')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('society_id', 'uuid', (col) =>
      col.references('societies.id').onDelete('cascade').notNull()
    )
    .execute();

  // Auth
  await db.schema
    .createTable('sessions')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('society_id', 'uuid', (col) =>
      col.references('societies.id').onDelete('cascade').notNull()
    )
    .addColumn('session_token', 'text', (col) => col.notNull().unique())
    .addColumn('expires', 'timestamptz', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('verification_tokens')
    .addColumn('id', 'text', (col) => col.primaryKey().notNull())
    .addColumn('token', 'text', (col) => col.notNull().unique())
    .addColumn('expires', 'timestamptz', (col) => col.notNull())
    .execute();

  // Sponsors
  await db.schema
    .createTable('sponsors')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('logo_url', 'text')
    .addColumn('website', 'text')
    .execute();

  await db.schema
    .createTable('society_sponsorships')
    .addColumn('society_id', 'uuid', (col) =>
      col.notNull().references('societies.id')
    )
    .addColumn('sponsor_id', 'uuid', (col) =>
      col.notNull().references('sponsors.id')
    )
    .addPrimaryKeyConstraint('primary_key', ['society_id', 'sponsor_id'])
    .execute();

  // Events
  await db.schema
    .createTable('events')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('start_date', 'timestamptz', (col) => col.notNull())
    .addColumn('end_date', 'timestamptz', (col) => col.notNull())
    .addColumn('looking_for_sponsors', 'boolean', (col) =>
      col.notNull().defaultTo(false)
    )
    .addColumn('cover_image_url', 'text')
    .execute();

  await db.schema
    .createTable('event_hosts')
    .addColumn('society_id', 'uuid', (col) =>
      col.notNull().references('societies.id')
    )
    .addColumn('event_id', 'uuid', (col) =>
      col.notNull().references('events.id')
    )
    .addPrimaryKeyConstraint('primary_key', ['society_id', 'event_id'])
    .execute();

  await db.schema
    .createTable('event_sponsorships')
    .addColumn('event_id', 'uuid', (col) =>
      col.notNull().references('events.id')
    )
    .addColumn('sponsor_id', 'uuid', (col) =>
      col.notNull().references('sponsors.id')
    )
    .addPrimaryKeyConstraint('primary_key', ['event_id', 'sponsor_id'])
    .execute();

  // TODO: Indexes
  // await db.schema
  //   .createIndex('sessions_society_id_index')
  //   .on('sessions')
  //   .column('society_id')
  //   .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // await db.schema.dropTable('societies').execute();
}
