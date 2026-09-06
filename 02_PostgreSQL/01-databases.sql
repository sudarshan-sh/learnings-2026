-- =========================================
-- DATABASES: CREATE, DROP, LIST
-- =========================================

-- 1. CREATE DATABASE
CREATE DATABASE db1;
CREATE DATABASE sdb_new;

-- 2. DROP DATABASE
DROP DATABASE IF EXISTS sdb_new;

-- 3. LIST DATABASES
-- via psql inside docker:
-- docker exec -it <container_name> psql -U <username> -d <database_name> -c "\l"
-- ex: docker exec -it myDb psql -U sudarshan -d sdb -c "\l"

-- via SQL:
SELECT datname FROM pg_database;
