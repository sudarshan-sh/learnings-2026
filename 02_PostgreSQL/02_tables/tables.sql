-- =========================================
-- TABLES: CREATE
-- =========================================
 -- 1. CREATE TABLE

CREATE TABLE Employee(empid int PRIMARY KEY,
                                name varchar(255) NOT NULL,
                                                  age int, salary float(10),
                                                                  CONSTRAINT C1 UNIQUE(empid));


SELECT *
FROM Employee;


DELETE
from Employee
where name='Diwakar';

--2. DROP TABLE

DROP TABLE employee;

--3. INSERT DATA

INSERT INTO employee (empid, name, age, salary)
VALUES (2, 'Ashish', 44, 120000);

-- 4. MODIFY TABLE COLUMN using ALTER

ALTER TABLE employee
ALTER COLUMN name
SET NOT NULL;


ALTER TABLE employee
ALTER COLUMN age
SET NOT NULL;


ALTER TABLE employee
ALTER COLUMN age
DROP NOT NULL;

-- Adding a NOT NULL Constraint to an Existing Column where already having few NULL values like in age column-

UPDATE employee
SET age=34
WHERE age is NULL
    AND empid=6;

-- but now we would ensure age to have NOT NULL values

ALTER TABLE employee
ALTER column age
SET NOT NULL;

-- 5. UNIQUE on ALTER TABLE
a.
ALTER TABLE employee ADD UNIQUE (column);

-- to add the constraint
b.
ALTER TABLE employee ADD CONSTRAINT C1 UNIQUE(columns);

-- to remove the constraint
c.
ALTER TABLE employee
DROP INDEX C1;