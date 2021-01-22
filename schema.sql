
-- Drops the day_planner_db if it already exists --
DROP DATABASE IF EXISTS moviePlannerDB;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE moviePlannerDB;

USE moviePlannerDB;

-- Create the table plans.
CREATE TABLE plans (
  id int NOT NULL AUTO_INCREMENT,
  movie varchar(255) NOT NULL,
  PRIMARY KEY (id)
);
