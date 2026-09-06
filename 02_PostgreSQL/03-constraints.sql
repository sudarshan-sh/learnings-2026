-- =========================================
-- CONSTRAINTS: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT
-- =========================================

-- LIST of CONSTRAINTS (reference)
-- NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT

-- 1. composite PRIMARY KEY
CREATE TABLE Users (
    UserID int NOT NULL,
    name   varchar(255),
    email  varchar(255) NOT NULL,
    PRIMARY KEY (UserID, email)
);

-- 2. CHECK constraint (defined on CREATE TABLE)
CREATE TABLE students (
    StudentID   int PRIMARY KEY,
    StudentName varchar(255),
    age         int NOT NULL,
    CONSTRAINT C1 CHECK (age BETWEEN 3 AND 18)
);

INSERT INTO students (StudentID, StudentName, age)
VALUES (2, 'Viha', 4);

-- 3. DEFAULT constraint
CREATE TABLE Products (
    ProductID     int PRIMARY KEY,
    ProductName   varchar(100),
    StockLevel    int DEFAULT 0,
    ProductStatus varchar(100) DEFAULT 'Pending',
    DateAdded     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (ProductID, ProductName)
VALUES (2, 'TV');

INSERT INTO products (ProductID, ProductName, StockLevel)
VALUES (3, 'iPad', 7);

-- adding a DEFAULT constraint to an existing column
ALTER TABLE products ALTER COLUMN StockLevel SET DEFAULT 5;

-- 4. UNIQUE constraint (added via ALTER TABLE)
-- a) add an unnamed UNIQUE constraint
ALTER TABLE employee ADD UNIQUE (column);

-- b) add a named UNIQUE constraint
ALTER TABLE employee ADD CONSTRAINT C1 UNIQUE(columns);

-- c) remove the constraint
ALTER TABLE employee DROP INDEX C1;

-- 5. FOREIGN KEY constraint (added via ALTER TABLE, on the Project/Employee tables from 02-tables.sql)
ALTER TABLE Project ADD CONSTRAINT FK_Project_Employee
FOREIGN KEY (incharge) REFERENCES employee(empid)
ON DELETE SET NULL
ON UPDATE CASCADE;

-- the original CREATE TABLE (02-tables.sql) added a plain FOREIGN KEY with no
-- ON DELETE/UPDATE action, which defaults to NO ACTION (restrict). That
-- default-named constraint still exists alongside FK_Project_Employee, and
-- Postgres enforces every FK constraint on a column -- so deletes still get
-- blocked by it even though FK_Project_Employee allows SET NULL.
-- drop the old restrictive constraint so only FK_Project_Employee applies:
ALTER TABLE Project DROP CONSTRAINT project_incharge_fkey;

-- now deleting an employee sets their projects' incharge to NULL instead of failing
DELETE FROM employee WHERE empid = 4;

-- 6. CHECK constraint (added via ALTER TABLE)
ALTER TABLE employee ADD CONSTRAINT check_age CHECK (age >= 18);

UPDATE employee SET age = 22 WHERE empid = 4;

-- to drop the already applied constraint
ALTER TABLE employee DROP CHECK check_age;

-- common use cases of CHECK constraints
CHECK (discount BETWEEN 0 AND 50);

CHECK (OrderStatus IN ('Pending', 'Shipped', 'Delivered', 'Cancelled'));

CHECK (Email LIKE '%@%.%');
