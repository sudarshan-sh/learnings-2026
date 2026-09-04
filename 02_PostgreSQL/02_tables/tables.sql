-- =========================================
-- TABLES: CREATE
-- =========================================
 -- 1. CREATE TABLE

CREATE TABLE Employee(empid int PRIMARY KEY,
                                name varchar(255) NOT NULL,
                                                  age int, salary float(10));


SELECT *
FROM Employee;


DELETE
from Employee
where name='Diwakar';

--2. DROP TABLE

DROP TABLE employee;

--3. INSERT DATA

INSERT INTO employee (empid, name, age, salary)
VALUES (2, 'Manish', 44, 120000);

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