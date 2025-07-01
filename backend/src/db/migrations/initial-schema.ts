import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Societies
  await db.schema
    .createTable('society')
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
    .createTable('social')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('society_id', 'uuid', (col) =>
      col.references('society.id').onDelete('cascade').notNull()
    )
    .execute();

  // Auth
  await db.schema
    .createTable('session')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('society_id', 'uuid', (col) =>
      col.references('society.id').onDelete('cascade').notNull()
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
    .createTable('sponsor')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('logo_url', 'text')
    .addColumn('website', 'text')
    .execute();

  await db.schema
    .createTable('society_sponsorship')
    .addColumn('society_id', 'uuid', (col) =>
      col.notNull().references('society.id')
    )
    .addColumn('sponsor_id', 'uuid', (col) =>
      col.notNull().references('sponsor.id')
    )
    .addPrimaryKeyConstraint('society_sponsorship_pkey', [
      'society_id',
      'sponsor_id',
    ])
    .execute();

  // Events
  await db.schema
    .createTable('event')
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
    .createTable('event_host')
    .addColumn('society_id', 'uuid', (col) =>
      col.notNull().references('society.id')
    )
    .addColumn('event_id', 'uuid', (col) =>
      col.notNull().references('events.id')
    )
    .addPrimaryKeyConstraint('event_host_pkey', ['society_id', 'event_id'])
    .execute();

  await db.schema
    .createTable('event_sponsorship')
    .addColumn('event_id', 'uuid', (col) =>
      col.notNull().references('event.id')
    )
    .addColumn('sponsor_id', 'uuid', (col) =>
      col.notNull().references('sponsor.id')
    )
    .addPrimaryKeyConstraint('event_sponsorship_pkey', [
      'event_id',
      'sponsor_id',
    ])
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
