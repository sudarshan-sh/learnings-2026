-- # to check all the DBs
docker exec -it <container_name> psql -U <username> -d <database_name> -c "\l"
ex- docker exec -it myDb psql -U sudarshan -d sdb -c "\l"

SELECT datname FROM pg_database;