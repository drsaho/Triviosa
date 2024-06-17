-- Drop the database if it exists
DROP DATABASE IF EXISTS triviosa;

-- Create the database with UTF8 encoding and default template
CREATE DATABASE triviosa
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Drop the user if it exists
DROP USER IF EXISTS triviosa_user;

-- Create a user and set a password
CREATE USER triviosa_user WITH PASSWORD 'potter';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE triviosa TO triviosa_user;

-- Connect to the newly created database
\c triviosa

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
