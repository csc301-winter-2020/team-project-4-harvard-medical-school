DROP SCHEMA IF EXISTS csc301db CASCADE;

CREATE SCHEMA csc301db;

SET SEARCH_PATH TO csc301db;

CREATE TYPE Valid_user_types AS ENUM('Student', 'Educator', 'Admin');

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    year INT,
    user_type Valid_user_types,
    date_create DATE NOT NULL
);

-- CREATE TABLE class (
--     id INT PRIMARY KEY,
--     name VARCHAR(50) NOT NULL,
--     instructor_id int REFERENCES users(id)
-- );

-- CREATE TABLE students_enrollment (
--   class_id INT REFERENCES class(id),
--   student_id INT REFERENCES users(id),
--   PRIMARY KEY (class_id, student_id)
-- );

-- -- Not Sure what other fields should be put in --
-- CREATE TABLE patients (
--     id INT PRIMARY KEY
-- );

-- CREATE TABLE patient_profile (
--   id INT PRIMARY KEY,
--   student_id INT REFERENCES users(id),
--   patient_id INT REFERENCES patients(id),
--   UNIQUE (student_id, patient_id),
--   age INT NOT NULL CHECK ( age > 0 AND age < 100 ),
--   gender_at_birth VARCHAR(1) NOT NULL CHECK ( gender_at_birth = 'M' OR gender_at_birth = 'F' ),
--   gender VARCHAR(10) NOT NULL,
--   pregnant VARCHAR(20) NOT NULL,
--   country_residence VARCHAR(20) NOT NULL,
--   country_visited TEXT NOT NULL,
--   complaint TEXT NOT NULL,
--   medical_history TEXT NOT NULL,
--   social_history TEXT NOT NULL,
--   family_history TEXT NOT NULL,
-- );




