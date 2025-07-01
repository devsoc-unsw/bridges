# Backend Quick Start Guide

## First Time Setup

Install [pnpm](https://pnpm.io/installation).

Then install dependencies:

```bash
pnpm install
```

Populate a `.env` file in the `backend` directory with the following content:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/mydb
```

After running `docker-compose up`, you will need to migrate the database. You can do this by running the following commands:

```bash
pnpm build
pnpm run migrate
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
