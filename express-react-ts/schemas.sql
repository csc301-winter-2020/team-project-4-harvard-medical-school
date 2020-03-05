DROP SCHEMA IF EXISTS csc301db CASCADE;

CREATE SCHEMA csc301db;

SET SEARCH_PATH TO csc301db;

CREATE TYPE Valid_user_types AS ENUM('Student', 'Educator', 'Admin');
CREATE TYPE SEX_AT_BIRTH AS ENUM('Male', 'Female');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
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
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    lab_result INT
);

CREATE TYPE SMOKING_TYPE AS ENUM('NEVER', "EX", "CURRENT");

CREATE TABLE patient_profile (
     id SERIAL PRIMARY KEY,
     student_id INT REFERENCES users(id),
     patient_id INT,
     UNIQUE (student_id, patient_id),
     first_name TEXT,
     family_name TEXT,
     age INT NOT NULL CHECK ( age > 0 AND age < 100 ),
     gender_at_birth SEX_AT_BIRTH,
     gender TEXT NOT NULL,
     country TEXT,
     country_canvas TEXT

     pregnant TEXT,
     pregnant_canvas text,

     country_residence TEXT,
     country_residence_canvas TEXT,

     country_visited TEXT,
     country_visited_canvas TEXT,

     complaint TEXT ,
     complaint_canvas TEXT,

     medical_history TEXT,
     medical_history_canvas TEXT,

     social_history TEXT,
     social_history_canvas TEXT,

     family_history TEXT,
     family_history_canvas TEXT,

     HPI TEXT,
     HPI_canvas TEXT,

     hosptial_history TEXT,
     hospital_history_canvas TEXT,

     medications TEXT,
     medications_canvas TEXT,

     allergies TEXT,
     allergies_canvas TEXT,

     work TEXT,
     work_canvas TEXT,

     living_conditions TEXT,
     living_conditions_canvas TEXT,

     sexual_history TEXT,
     sexual_history_canvas TEXT,

     etOH TEXT,
     etOH_canvas TEXT,

     drinks_per_week TEXT,
     drinks_per_week_canvas TEXT,

     smoker SMOKING_TYPE,

     last_time_smoked TEXT,
     last_time_smoked_canvas TEXT,

     packs_per_day TEXT,
     packs_per_day_canvas TEXT,

     other_substances TEXT,
     other_substances_canvas TEXT,

);
INSERT INTO users (name, email, password, year, user_type, date_create)
VALUES ('will', 'willqie@gmail.com', 'will', 1, 'Student', '20190101');
INSERT INTO patients (lab_result)
VALUES (NULL);
INSERT INTO patient_profile (student_id, patient_id, first_name, family_name, age, gender_at_birth, gender, pregnant, country_residence, country_visited, complaint, medical_history, social_history, family_history)
VALUES (1, 1, 'will', 'qie', 20, 'Male', 'Male', 'NO', 'CA', NULL, 'ddd', 'fff', 'zzz', 'vvv');



