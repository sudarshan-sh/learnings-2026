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