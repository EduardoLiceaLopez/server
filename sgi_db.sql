CREATE DATABASE sgi_db;

USE sgi_db;


CREATE TABLE user_types(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE users(

	id INT PRIMARY KEY auto_increment,
	name VARCHAR(50) NOT NULL,
	middle_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50),
	curp VARCHAR(18) NOT NULL,
	rfc VARCHAR(13) NOT NULL,
	phone_number VARCHAR(10) NOT NULL,
	email VARCHAR(50) NOT NULL,
	user_type_id INT NOT NULL,

	FOREIGN KEY (user_type_id) REFERENCES user_types(id) ON DELETE CASCADE
);

CREATE TABLE permissions(
	id INT PRIMARY KEY auto_increment,
	action VARCHAR(100) NOT NULL,
	description VARCHAR(250) NOT NULL,
	name VARCHAR(70) NOT NULL
);

CREATE TABLE roles(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR (25) NOT NULL,
	description VARCHAR(150)
);

CREATE TABLE roles_permissions(
	user_id INT PRIMARY KEY,
	role_id INT NOT NULL,
	active TINYINT(1) DEFAULT 1
);


CREATE TABLE user_access(
	user_id INT PRIMARY KEY,
	user_name VARCHAR(25) NOT NULL,
	password VARCHAR(150) NOT NULL,
	user_role VARCHAR(40) NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE base(
	user_id INT PRIMARY KEY,

	FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE comissionary(
	user_id INT PRIMARY KEY,
	institution VARCHAR(75),

	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE trust(
	user_id INT PRIMARY KEY,

	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE academics(
	user_id INT PRIMARY KEY,
	sni_level VARCHAR(50) NOT NULL,
	pride_level VARCHAR(50) NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE officials(
	id INT PRIMARY KEY auto_increment,
	user_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	PA VARCHAR(100) NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE employee_data(
	user_id INT PRIMARY KEY,
	employee_number VARCHAR(15) NOT NULL,
	admission_datee DATE NOT NULL,

	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE academic_levels(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(1) NOT NULL
);

CREATE TABLE academic_categories(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(10) NOT NULL,
	academic_level_id INT NOT NULL,

	FOREIGN KEY (academic_level_id) REFERENCES academic_levels(id)
);

CREATE TABLE academic_appointments(
	user_id INT,
	category_id INT,
	description VARCHAR(100) NOT NULL,
	admission_date DATE NOT NULL,
	conclusion_date DATE,

	PRIMARY KEY(user_id, category_id),

	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY	 (category_id) REFERENCES academic_categories(id)
);

CREATE TABLE schendule(

	id INT PRIMARY KEY auto_increment,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL
);

CREATE TABLE user_schendules(
	user_id INT,
	schendule_id INT,

	PRIMARY KEY(user_id, schendule_id),

	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (schendule_id) REFERENCES schendule(id)	
);


CREATE TABLE clothes(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(50)
);

CREATE TABLE sizes(

	id INT PRIMARY KEY auto_increment,
	clothe_id INT NOT NULL,
	description VARCHAR(45),

	FOREIGN KEY (clothe_id) REFERENCES clothes(id)
);

CREATE TABLE user_sizes(
	user_id INT,
	size_id INT,

	PRIMARY KEY	(user_id, size_id),

	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (size_id) REFERENCES sizes(id)
);

CREATE TABLE programs(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE trust_evaluations(
	id INT PRIMARY KEY auto_increment,
	program_id INT NOT NULL,
	trust_user_id INT NOT NULL,
	dates Date NOT NULL,
	result VARCHAR(15) NOT NULL,

	FOREIGN KEY(program_id) REFERENCES programs(id),
	FOREIGN KEY(trust_user_id) REFERENCES trust(user_id)
);

CREATE TABLE base_evaluations(
	id INT PRIMARY KEY auto_increment,
	program_id INT NOT NULL,
	base_user_id INT NOT NULL,
	dates Date NOT NULL,
	result VARCHAR(15) 	NOT NULL,

	FOREIGN KEY(program_id) REFERENCES programs(id),
	FOREIGN KEY(base_user_id) REFERENCES base(user_id)
);

CREATE TABLE social_service_programs(
	id INT PRIMARY KEY auto_increment,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE users_social_services(
	user_id INT,
	social_service_program_id INT,
	program_key VARCHAR(15),
	active BOOLEAN,

	PRIMARY KEY(user_id, social_service_program_id),

	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(social_service_program_id) REFERENCES social_service_programs(id)
);

CREATE TABLE locations(
	id INT PRIMARY KEY auto_increment,
	cubicler_number INT NOT NULL,
	floor INT NOT NULL,
	section VARCHAR(5) NOT NULL,
	extension VARCHAR(5) NOT NULL,
	capacity INT NOT NULL
);

CREATE TABLE user_locations(
	 id INT PRIMARY KEY auto_increment,
	 user_id INT NOT NULL,
	 location_id INT NOT NULL,

	 FOREIGN KEY (user_id) REFERENCES users(id),
	 FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE resources(
	id INT PRIMARY KEY auto_increment,
	description VARCHAR (75) NOT NULL,
	inventory_code VARCHAR (15) NOT NULL
);

CREATE TABLE user_resources(
 user_id INT NOT NULL,
 resource_id INT NOT NULL,
 user_location_id INT NOT NULL,
 amount INT NOT NULL,

 PRIMARY KEY(user_id, resource_id),

 FOREIGN KEY(user_id) REFERENCES users(id),
 FOREIGN KEY (resource_id) REFERENCES resources(id),
 FOREIGN KEY (user_location_id) REFERENCES user_locations(id)
);