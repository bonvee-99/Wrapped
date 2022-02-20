-- CREATE DATABASE --

CREATE extension IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
	user_id UUID DEFAULT uuid_generate_v4(),
	confirmed BOOLEAN NOT NULL DEFAULT FALSE,
	user_name VARCHAR(50) NOT NULL,
	user_email VARCHAR(50) NOT NULL UNIQUE,
	user_password VARCHAR(255) NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE courses (
	course_id SERIAL,
	course_subject VARCHAR(10) NOT NULL,
	course_code VARCHAR(10) NOT NULL,
	course_section INTEGER NOT NULL,
	course_year VARCHAR(10) NOT NULL,
	PRIMARY KEY (course_id)
);

CREATE TABLE user_course (
	user_id UUID,
	course_id SERIAL,
	grade INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

-- insert into users (user_name, user_email, user_password) VALUES ('ben', 'ben@gmail.com', 'abc');
