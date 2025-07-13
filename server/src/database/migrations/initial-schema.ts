import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  // Societies
  await db.schema
    .createTable('society')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('login_email', 'text', (col) => col.unique())
    .addColumn('contact_email', 'text', (col) => col.unique())
    .addColumn('description', 'text')
    .addColumn('logo_url', 'text')
    .addColumn('member_count', 'integer')
    .addColumn('is_approved', 'boolean', (col) => col.notNull().defaultTo(false))
    .execute();

  await db.schema
    .createType('social_media_type')
    .asEnum(['DISCORD', 'FACEBOOK', 'INSTAGRAM', 'LINKEDIN', 'YOUTUBE', 'OTHER'])
    .execute();

  await db.schema
    .createTable('social_media')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('society_id', 'uuid', (col) => col.references('society.id').onDelete('cascade').notNull())
    .addColumn('type', sql`social_media_type`, (col) => col.notNull())
    .addColumn('url', 'text', (col) => col.notNull())
    .execute();

  // Sponsors
  await db.schema
    .createTable('sponsor')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('logo_url', 'text')
    .addColumn('website', 'text')
    .execute();

  await db.schema
    .createTable('society_sponsorship')
    .addColumn('society_id', 'uuid', (col) => col.notNull().references('society.id'))
    .addColumn('sponsor_id', 'uuid', (col) => col.notNull().references('sponsor.id'))
    .addPrimaryKeyConstraint('society_sponsorship_pkey', ['society_id', 'sponsor_id'])
    .execute();

  // Events
  await db.schema
    .createTable('event')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('description', 'text')
    .addColumn('start_date', 'timestamptz', (col) => col.notNull())
    .addColumn('end_date', 'timestamptz', (col) => col.notNull())
    .addColumn('looking_for_sponsors', 'boolean', (col) => col.notNull().defaultTo(false))
    .addColumn('cover_image_url', 'text')
    .execute();

  await db.schema
    .createTable('event_host')
    .addColumn('society_id', 'uuid', (col) => col.notNull().references('society.id'))
    .addColumn('event_id', 'uuid', (col) => col.notNull().references('event.id'))
    .addPrimaryKeyConstraint('event_host_pkey', ['society_id', 'event_id'])
    .execute();

  await db.schema
    .createTable('event_sponsorship')
    .addColumn('event_id', 'uuid', (col) => col.notNull().references('event.id'))
    .addColumn('sponsor_id', 'uuid', (col) => col.notNull().references('sponsor.id'))
    .addPrimaryKeyConstraint('event_sponsorship_pkey', ['event_id', 'sponsor_id'])
    .execute();

  // Indexing for faster queries
  await db.schema.createIndex('social_media_society_id_idx').on('social_media').column('society_id').execute();

  await db.schema
    .createIndex('society_sponsorship_society_id_idx')
    .on('society_sponsorship')
    .column('society_id')
    .execute();
  await db.schema
    .createIndex('society_sponsorship_sponsor_id_idx')
    .on('society_sponsorship')
    .column('sponsor_id')
    .execute();

  await db.schema.createIndex('event_host_society_id_idx').on('event_host').column('society_id').execute();
  await db.schema.createIndex('event_host_event_id_idx').on('event_host').column('event_id').execute();

  await db.schema.createIndex('event_sponsorship_event_id_idx').on('event_sponsorship').column('event_id').execute();
  await db.schema
    .createIndex('event_sponsorship_sponsor_id_idx')
    .on('event_sponsorship')
    .column('sponsor_id')
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropIndex('event_sponsorship_sponsor_id_idx').execute();
  await db.schema.dropIndex('event_sponsorship_event_id_idx').execute();
  await db.schema.dropIndex('event_host_event_id_idx').execute();
  await db.schema.dropIndex('event_host_society_id_idx').execute();
  await db.schema.dropIndex('society_sponsorship_sponsor_id_idx').execute();
  await db.schema.dropIndex('society_sponsorship_society_id_idx').execute();
  await db.schema.dropIndex('social_media_society_id_idx').execute();

  await db.schema.dropTable('event_sponsorship').execute();
  await db.schema.dropTable('event_host').execute();
  await db.schema.dropTable('event').execute();

  await db.schema.dropTable('society_sponsorship').execute();
  await db.schema.dropTable('sponsor').execute();

  await db.schema.dropTable('social_media').execute();
  await db.schema.dropType('social_media_type').execute();

  await db.schema.dropTable('society').execute();
}
