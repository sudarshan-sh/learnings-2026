-- LIST of CONSTRAINTS (optional)
NOT NULL,
UNIQUE,
PRIMARY KEY,
FOREIGN KEY,
CHECK,
DEFAULT

-- create a table with composite primary keys
CREATE TABLE Users (
    UserID int NOT NULL, 
    name varchar(255), 
    email varchar(255) NOT NULL, 
    PRIMARY KEY (UserID, email)
);

-- create table with constraint CHECK
CREATE TABLE students(
    StudentID int PRIMARY KEY,
    StudentName varchar(255),
    age int NOT NULL,
    CONSTRAINT C1 CHECK (age BETWEEN 3 AND 18)
);

-- insert data in students table
INSERT INTO students (StudentID, StudentName, age) 
VALUES (2, 'Viha', 4);

-- create a table with constraint DEFAULT
CREATE TABLE Products (
    ProductID int PRIMARY KEY,
    ProductName varchar(100),
    StockLevel int DEFAULT 0,
    ProductStatus varchar(100) DEFAULT 'Pending',
    DateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert values in products table
INSERT INTO products (ProductID, ProductName)
VALUES (2, 'TV');

INSERT INTO products (ProductID, ProductName, StockLevel)
VALUES (3, 'iPad', 7);

-- modifying existing table by adding DEFAULT constraint on Stock Level-
ALTER TABLE products
ALTER COLUMN StockLevel SET DEFAULT 5;