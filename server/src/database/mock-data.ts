import { db } from './database';

const result = await db
  .insertInto('society')
  .values({
    name: 'Software Development Society',
    loginEmail: 'bridges@devsoc.app',
    contactEmail: 'contact@devsoc.app',
    description: 'makes software projects',
    memberCount: 420,
    isApproved: true,
  })
  .executeTakeFirst();

console.log(`Inserted DevSoc. Added ${String(result.numInsertedOrUpdatedRows)} row(s)`);
