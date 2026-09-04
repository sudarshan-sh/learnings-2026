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
│   ├── 01-create-database.sql
│   ├── 02-drop-database.sql
│   └── 03-list-databases.sql
│
├── 02_tables/
│   ├── 01-create-tables.sql
│   ├── 02-alter-table.sql
│   ├── 03-drop-table.sql
│   └── 04-truncate-table.sql
│
├── 03_crud/
│   ├── 01-insert.sql
│   ├── 02-select.sql
│   ├── 03-update.sql
│   └── 04-delete.sql
│
├── 04_constraints/
│   ├── 01-primary-key.sql
│   ├── 02-foreign-key.sql
│   ├── 03-not-null.sql
│   ├── 04-unique.sql
│   ├── 05-check.sql
│   └── 06-default.sql
│
├── 05_queries/
│   ├── 01-where.sql
│   ├── 02-order-by.sql
│   ├── 03-group-by.sql
│   ├── 04-having.sql
│   └── 05-limit-offset.sql
│
├── 06_joins/
│   ├── 01-inner-join.sql
│   ├── 02-left-join.sql
│   ├── 03-right-join.sql
│   └── 04-full-join.sql
│
├── 07_subqueries/
│   ├── 01-scalar-subquery.sql
│   ├── 02-correlated-subquery.sql
│   └── 03-exists.sql
│
├── 08_functions/
│   ├── 01-aggregate-functions.sql
│   ├── 02-string-functions.sql
│   ├── 03-date-functions.sql
│   └── 04-window-functions.sql
│
├── 09_indexes/
│   ├── 01-create-index.sql
│   └── 02-explain.sql
│
├── 10_transactions/
│   ├── 01-begin-commit.sql
│   ├── 02-rollback.sql
│   └── 03-savepoint.sql
│
└── 11_project/
    └── ecommerce/
        ├── 01-schema.sql
        ├── 02-seed.sql
        └── 03-queries.sql
```

- `01-databases` - Database creation and management
- `02-tables` - Table creation and modification
- `03-crud` - INSERT, SELECT, UPDATE, DELETE
- `04-constraints` - Primary key, foreign key, unique, etc.
- `05-queries` - Filtering, grouping, sorting, etc.
- `06-joins` - SQL joins
