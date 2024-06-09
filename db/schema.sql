-- Drop the database if it exists
DROP DATABASE IF EXISTS triviosa;

-- Create the database
CREATE DATABASE triviosa;

-- Create a user and set a password
CREATE USER triviosa_user WITH PASSWORD 'potter';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE triviosa TO triviosa_user;
