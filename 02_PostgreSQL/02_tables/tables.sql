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
VALUES (5, 'Ritesh', 25, 75000);

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

-- create another table for having a foreign key of employeeID

CREATE TABLE Project (projectid int PRIMARY KEY,
                                    project_name varchar(255) NOT NULL,
                                                              start_date DATE, incharge int,
                      FOREIGN KEY(incharge) REFERENCES employee(empid));

-- insert data into the Project Table

INSERT INTO Project (projectid, project_name, start_date, incharge)
VALUES (1, 'Brainstation Foundation', '2026-01-15', 3),
       (2, 'I4E Web App', '2026-02-01', 1),
       (3, 'NFD', '2026-03-01', 3),
       (4, 'IV Capital', '2026-03-01', 2),
       (5, 'InvestValue Titans', '2026-01-15', 2);

-- insert another set

INSERT INTO Project (projectid, project_name, start_date, incharge)
VALUES (6, 'InvestValue Research Basket', '2026-01-15', 4);

-- to add a foreign key constraint to a table that already exists

ALTER TABLE Project ADD CONSTRAINT FK_Project_Employee
FOREIGN KEY (incharge) REFERENCES employee(empid) ON
DELETE
SET NULL ON
UPDATE CASCADE;

-- the original CREATE TABLE (line above) added a plain FOREIGN KEY with no
-- ON DELETE/UPDATE action, which defaults to NO ACTION (restrict). That
-- default-named constraint still exists alongside FK_Project_Employee, and
-- Postgres enforces every FK constraint on a column -- so deletes still get
-- blocked by it even though FK_Project_Employee allows SET NULL.
-- drop the old restrictive constraint so only FK_Project_Employee applies:

ALTER TABLE Project
DROP CONSTRAINT project_incharge_fkey;

-- now deleting an employee sets their projects' incharge to NULL instead of failing

DELETE
FROM employee
WHERE empid = 4;

-- CHECK on ALTER for specifying the condition on a column

ALTER TABLE employee ADD CONSTRAINT check_age CHECK (age >=18);

-- updating the employee's age

UPDATE employee
SET age=22
WHERE empid=4;

-- to drop the already applied constraint

ALTER TABLE employee
DROP CHECK check_age;

-- common use cases of CHECK constraints
 CHECK (discount BETWEEN 0 AND 50);

CHECK (OrderStatus IN ('Pending',
                       'Shipped',
                       'Delivered',
                       'Cancelled'));

CHECK (Email LIKE '%@%.%');

-- ============================
-- ALTER COMMAND
-- ============================
-- 1. to add a column

ALTER TABLE employee ADD city varchar(100);


ALTER TABLE employee ADD department_type varchar(100);


CREATE TYPE department_type AS ENUM ('HR',
                                     'Sales',
                                     'Accounts',
                                     'Technology');


ALTER TABLE employee
ALTER COLUMN department_type TYPE department_type USING department_type ::department_type;

-- run the below command inside db1=# (to see the column detail picture)
db1=# \dT+ department_type
-- =============================================
-- 2. to modify/rename a column name

ALTER TABLE employee RENAME COLUMN department_type to dept_type;

-- =============================================
-- 3. to delete a column name

ALTER TABLE employee
DROP COLUMN dept;

-- ============================
-- update rows with the department type values

UPDATE employee
SET dept = 'Sales'
WHERE empid IN (2,
                5);

-- ============================
-- FILTERING RESULTS
-- ============================
-- matching patterns (LIKE / ILIKE):

SELECT *
from employee
WHERE name ILIKE 'm%';

-- Checking Ranges and Lists (BETWEEN, IN):

SELECT *
from employee
WHERE dept IN ('Sales',
               'Technology');

-- Sort data (ORDER BY):

SELECT *
from employee
ORDER BY salary DESC;

-- Limit the number of rows returned (LIMIT):

SELECT *
FROM employee
ORDER BY salary DESC
LIMIT 5;

-- for unique/distinct values

SELECT DISTINCT name
FROM employee;