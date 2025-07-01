# Backend Quick Start Guide

## First Time Setup

Populate a `.env` file in the `backend` directory with the following content before you run docker-compose (at the root):

```env
DATABASE_URL=postgres://postgres:postgres@bridges-db-1:5432/mydb
```

## Sample Kysely Usage

### Spawning Kysley DB Instance

Implementation can be found at [db.ts](src/db/db.ts)

### Example Query

```typescript
import { db } from './db';

const person = await db
  .selectFrom('person')
  .select(['id', 'first_name'])
  .where('id', '=', 1)
  .executeTakeFirst();
```

- See [Kysely Documentation](https://kysely.dev/docs/intro) for more details on how to use Kysely.
