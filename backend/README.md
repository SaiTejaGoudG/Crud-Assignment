**Steps To Run The Application**

1.git clone {git repo}
2.cd backend
3.npm install
4.create mysql database 

` create database student_managent;

use student_management;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL ,
  last_name VARCHAR(255) NOT NULL,
  contact varchar(255) NOT NULL unique,
  email varchar(255) not null unique,
  address varchar(255) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email varchar(255) not null unique,
  password varchar(255) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); `
5.npm run server
