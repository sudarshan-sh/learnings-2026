# PostgreSQL Learning

This repository contains my PostgreSQL and SQL learning notes,
commands, queries, and practical exercises.

## Structure

```
postgres/
│
├── README.md
├── .gitignore
│
├── 01_databases/
│   └── databases.sql
│
├── 02_tables/
│   └── tables.sql
│
├── 03_crud/
│   └── crud.sql
│
├── 04_constraints/
│   └── constraints.sql
│
├── 05_queries/
│   └── queries.sql
│
├── 06_joins/
│   └── joins.sql
│
├── 07_subqueries/
│   └── subqueries.sql
│
├── 08_functions/
│   └── functions.sql
│
├── 09_indexes/
│   └── indexes.sql
│
├── 10_transactions/
│   └── transactions.sql
│
└── 11_project/
    └── ecommerce/
        ├── 01-schema.sql
        ├── 02-seed.sql
        └── 03-queries.sql
```

Each topic folder holds a single `.sql` file covering all the operations for that topic (e.g. `databases.sql` includes CREATE, DROP, and LIST). The `11_project` folder is the exception — it's a small end-to-end project, so schema, seed data, and queries stay in separate files.

- `01_databases` - Database creation, deletion, and listing
- `02_tables` - Table creation and modification
- `03_crud` - INSERT, SELECT, UPDATE, DELETE
- `04_constraints` - Primary key, foreign key, unique, etc.
- `05_queries` - Filtering, grouping, sorting, etc.
- `06_joins` - SQL joins
- `07_subqueries` - Scalar, correlated, and EXISTS subqueries
- `08_functions` - Aggregate, string, date, and window functions
- `09_indexes` - Indexes and query plans
- `10_transactions` - Transactions, rollbacks, and savepoints
- `11_project` - A small end-to-end e-commerce schema and query set
