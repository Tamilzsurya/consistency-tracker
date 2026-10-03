-- ============================================================
-- CONSISTENCY TRACKER DATABASE SCHEMA
-- MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS consistency
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

USE consistency;


-- ============================================================
-- USERS
-- ============================================================

CREATE TABLE users
(
    id INT NOT NULL AUTO_INCREMENT,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,

    password_hash VARCHAR(255) DEFAULT NULL,

    provider ENUM('local', 'google', 'apple')
        NOT NULL DEFAULT 'local',

    google_id VARCHAR(255) DEFAULT NULL,

    profile_picture VARCHAR(500) DEFAULT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY email_id (email),

    UNIQUE KEY google_id (google_id)
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- ============================================================
-- HABITS
-- ============================================================

CREATE TABLE habits
(
    id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL,

    name VARCHAR(255) NOT NULL,

    category ENUM(
        'Health',
        'Learning',
        'Productivity',
        'Mindfulness',
        'Social',
        'Creative',
        'Others'
    )
    NOT NULL DEFAULT 'Others',

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    KEY fk_habit_user (user_id),

    CONSTRAINT fk_habit_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- ============================================================
-- HABIT ENTRIES
-- ============================================================

CREATE TABLE habit_entries
(
    id VARCHAR(225) NOT NULL,

    habit_id INT NOT NULL,

    entry_date DATE NOT NULL,

    is_completed TINYINT(1) NOT NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY unique_habit_entry_date
        (habit_id, entry_date),

    CONSTRAINT fk_habit_entry_habit
        FOREIGN KEY (habit_id)
        REFERENCES habits (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- ============================================================
-- EMAIL VERIFICATION OTPs
-- ============================================================

CREATE TABLE email_verification_otps
(
    id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL,

    otp_hash VARCHAR(255) NOT NULL,

    expires_at DATETIME NOT NULL,

    attempt INT NOT NULL DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY user_id (user_id),

    CONSTRAINT fk_email_otp_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;