DO
$do$
BEGIN
  PERFORM 1 FROM pg_database WHERE datname = 'test';
  EXCEPTION WHEN OTHERS THEN
    CREATE DATABASE "test";
END
$do$;
