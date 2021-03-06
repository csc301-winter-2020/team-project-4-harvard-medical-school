DROP SCHEMA IF EXISTS csc301db CASCADE;

CREATE SCHEMA csc301db;

SET
    SEARCH_PATH TO csc301db;

CREATE TYPE Valid_user_types AS ENUM('Student', 'Educator', 'Administrator');

CREATE TYPE SEX_AT_BIRTH AS ENUM('Male', 'Female');

CREATE TYPE default_modes AS ENUM('Both', 'Writing', 'Typing');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    avatar_url TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    year INT,
    user_type Valid_user_types,
    date_create DATE NOT NULL,
    default_mode default_modes NOT NULL DEFAULT 'Both',
    default_sidebar BOOLEAN DEFAULT TRUE,
    location TEXT NOT NULL
);

DROP TABLE IF EXISTS class CASCADE;

CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    instructor_id int REFERENCES users(id),
    help_enabled BOOLEAN DEFAULT false
);

CREATE TABLE students_enrollment (
    class_id INT REFERENCES class(id),
    student_id INT REFERENCES users(id),
    PRIMARY KEY (class_id, student_id)
);

-- -- Not Sure what other fields should be put in --
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    lab_result INT
);

CREATE TYPE SMOKING_TYPE AS ENUM('NEVER', 'EX', 'CURRENT');


CREATE TABLE templates (
    user_id INT REFERENCES users(id) NOT NULL,
    template_id SERIAL PRIMARY KEY,
    UNIQUE (user_id, template_id),
    template_name TEXT NOT NULL,
    date_millis BIGINT NOT NULL,
    -- Gimmick, backend does not need to understand what is in the
    -- template, just store as a plain text
    template TEXT NOT NULL
);

CREATE TABLE patient_profile (
    id SERIAL,
    last_modified TIMESTAMP,
    created_date TIMESTAMP,
    student_id INT REFERENCES users(id),
    patient_id INT,
    UNIQUE (student_id, patient_id),
    first_name TEXT,
    family_name TEXT,
    age INT NOT NULL CHECK (
        age > 0
    ),
    gender_at_birth SEX_AT_BIRTH,
    gender TEXT NOT NULL,
    country TEXT,
    country_canvas TEXT,
    pregnant TEXT,
    pregnant_canvas text,
    country_residence TEXT,
    country_residence_canvas TEXT,
    country_visited TEXT,
    country_visited_canvas TEXT,
    complaint TEXT,
    complaint_canvas TEXT,
    medical_history TEXT,
    medical_history_canvas TEXT,
    social_history TEXT,
    social_history_canvas TEXT,
    family_history TEXT,
    family_history_canvas TEXT,
    HPI TEXT,
    HPI_canvas TEXT,
    hospital_history TEXT,
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
    assessments TEXT,
    assessments_canvas TEXT,
    imaging TEXT,
    imaging_canvas TEXT,
    final_diagnosis TEXT,
    class_id INT REFERENCES class(id),
    template_id INT REFERENCES templates(template_id),
    PRIMARY KEY (id, last_modified)
);


INSERT INTO
    users (
        username,
        first_name,
        last_name,
        avatar_url,
        email,
        password,
        year,
        user_type,
        date_create,
        location
    )
VALUES
    (
        'will',
        'will',
        'qie',
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
        'willqie@gmail.com',
        'will',
        1,
        'Student',
        '20190101',
        'Mount Sinai Hospital'
    );

INSERT INTO
    users (
        username,
        first_name,
        last_name,
        avatar_url,
        email,
        password,
        year,
        user_type,
        date_create,
        location
    )
VALUES
    (
        'student',
        'student',
        'McStudent',
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
        'willqie@gmail.com',
        'student',
        1,
        'Student',
        '20190101',
        'Toronto Western Hospital'
    );

INSERT INTO
    users (
        username,
        first_name,
        last_name,
        avatar_url,
        email,
        password,
        year,
        user_type,
        date_create,
        location
    )
VALUES
    (
        'instructor',
        'Will',
        'Qie',
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
        'willqie@gmail.com',
        'instructor',
        1,
        'Educator',
        '20190101',
        'Toronto General Hospital'
    );

    INSERT INTO
    users (
        username,
        first_name,
        last_name,
        avatar_url,
        email,
        password,
        year,
        user_type,
        date_create,
        location
    )
    VALUES
    (
        'i',
        'Instructor',
        'McInstructor',
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
        'instrc@gmail.com',
        'i',
        1,
        'Educator',
        '20190101',
        'Toronto General Hospital'
    );

INSERT INTO
    users (
        username,
        first_name,
        last_name,
        avatar_url,
        email,
        password,
        year,
        user_type,
        date_create,
        location
    )
VALUES
    (
        'admin',
        'will',
        'qie',
        'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png',
        'willqie@gmail.com',
        'admin',
        1,
        'Administrator',
        '20190101',
        'Sick Kids'
    );

INSERT INTO
    patients (lab_result)
VALUES
    (NULL);

    --Class Inserts for testing purposes 
INSERT INTO
    class (name, instructor_id, help_enabled)
VALUES
    ('CSC369 WINTER 2020', 3, true);

INSERT INTO
    class (name, instructor_id, help_enabled)
VALUES
    ('CSC343 WINTER 2020', 3, false);

CREATE TABLE review_of_systems (
    id SERIAL PRIMARY KEY,
    patient_id INT,
    info JSON
);

INSERT INTO review_of_systems (patient_id, info) VALUES (1, '{
    "endocrine": {
        "weightLoss": false,
        "weightGain": false,
        "fatigue": false,
        "difficultySleeping": false,
        "feelingUnwell": false,
        "chronicPain": false,
        "fevers": false,
        "chills": false,
        "sweatsEndocrine": false,
        "lossOfAppetite": false,
        "heatIntolerance": false,
        "coldIntolerance": false,
        "polyphagia": false,
        "polydipsia": false
    },
    "vision": {
        "decreaseInVision": false,
        "increaseInVision": false,
        "blurriness": false,
        "painVision": false,
        "doubleVision": false,
        "eyeDischarge": false,
        "redEye": false
    },
    "headNeck": {
        "painHeadNeck": false,
        "soresInMouth": false,
        "soresAroundMouth": false,
        "ulcersInMouth": false,
        "ulcersAroundMouth": false,
        "masses": false,
        "growths": false,
        "acuityChange": false,
        "earPain": false,
        "earDischarge": false,
        "nasalDischarge": false,
        "voiceChange": false,
        "hoarseness": false,
        "toothPain": false,
        "lumpInThroat": false
    },
    "pulmonary": {
        "chestPainPulmonary": false,
        "cough": false,
        "haemoptysis": false,
        "wheezing": false,
        "snoring": false,
        "aponoea": false
    },
    "cardiovascular": {
        "chestPainCardiovascular": false,
        "chestPressure": false,
        "shortBreathRest": false,
        "shortBreathExertion": false,
        "orthopnoea": false,
        "paroxysmal": false,
        "lowerOedema": false,
        "lossOfConsciousnessCardiovascular": false,
        "palpitation": false,
        "legPain": false,
        "legCramps": false,
        "ulcersOnFeet": false,
        "woundsOnFeet": false
    },
    "gastrointestinal": {
        "substernalPain": false,
        "abdominalPain": false,
        "difficultySwallowing": false,
        "painSwallowing": false,
        "nausea": false,
        "vomiting": false,
        "abdominalSwelling": false,
        "jaundice": false,
        "vomitingBlood": false,
        "blackStools": false,
        "bloodyStools": false,
        "constipation": false,
        "diarrhoea": false,
        "changesInBowelHabits": false
    },
    "gynaecological": {
        "polyuria": false,
        "bloodyUrine": false,
        "buringUrination": false,
        "incontinence": false,
        "urgentUrination": false,
        "frequentUrination": false,
        "incompleteEmptying": false,
        "hesitance": false,
        "decreasedForce": false,
        "needVoid": false,
        "erectileDysfunction": false,
        "penileDischarge": false,
        "penilePain": false,
        "testicularPain": false,
        "testicularSwelling": false,
        "penileUlcers": false,
        "penileGrowths": false,
        "sweatsGynaecological": false,
        "pastPregnancies": false,
        "vaginalDischarge": false,
        "menstruationCessation": false,
        "menstruationIrregularity": false,
        "breastPain": false,
        "breastDischarge": false,
        "breastMass": false
    },
    "hematology": {
        "abnormalBleeding": false,
        "abnormalBruising": false,
        "newLumps": false
    },
    "neurological": {
        "lossOfConsciousnessNeurological": false,
        "seizureActivity": false,
        "numbness": false,
        "weakness": false,
        "dizziness": false,
        "balanceProblems": false,
        "headaches": false
    },
    "musculoskeletal": {
        "jointPain": false,
        "jointSwelling": false,
        "muscleAches": false,
        "lowBackPain": false,
        "kneePain": false,
        "kneeSwelling": false,
        "handPain": false,
        "handSwelling": false,
        "elbowPain": false,
        "elbowSwelling": false,
        "hipPain": false,
        "hipSwelling": false,
        "shoulderPain": false,
        "shoulderSwelling": false
    },
    "mental": {
        "memory": false,
        "confusion": false,
        "anxiety": false
    },
    "skinHair": {
        "hairLoss": false,
        "skinEruptions": false,
        "rashes": false,
        "growingSores": false,
        "lesions": false,
        "itching": false
    }
}');

CREATE TABLE physical_examinations (
    id SERIAL PRIMARY KEY,
    patient_id INT,
    info JSON
);

CREATE TABLE lab_results (
    id SERIAL PRIMARY KEY,
    patient_id INT,
    info JSON
);

CREATE TABLE analysis (
    profile_id INT,
    student_input TEXT,
    isbell_result JSON,
    time_submitted TIMESTAMP
);

INSERT INTO
    patient_profile (
        last_modified,
        created_date,
        student_id,
        patient_id,
        first_name,
        family_name,
        age,
        gender_at_birth,
        gender,
        pregnant,
        country_residence,
        country_visited,
        complaint,
        medical_history,
        social_history,
        family_history,
        class_id
    )
VALUES
    (
        current_timestamp,
        current_timestamp,
        1,
        1,
        'Joe',
        'Smith',
        20,
        'Male',
        'Male',
        'NO',
        'CA',
        NULL,
        'ddd',
        'fff',
        'zzz',
        'vvv',
        1
    );