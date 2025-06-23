# Backend Quick Start Guide

## Sample Kysely Usage

### Spawning Kysley DB Instance

```typescript
const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
```

### Example Query

```typescript
const persons = await db
  .selectFrom('person')
  .select('id')
  .where('first_name', '=', 'Arnold')
  .execute();
```

- See [Kysely Documentation](https://kysely.dev/docs/intro) for more details on how to use Kysely.
