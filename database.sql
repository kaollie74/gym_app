
Database Name: 'gym_app';


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "activity" (
"id" SERIAL PRIMARY KEY,
 "routine_id" INT REFERENCES "routine",
 "exercise" varchar(255),
 "reps" int,
 "sets" int ,
 "body_part" varchar(255),
 "comment" varchar(255)
 
);


CREATE TABLE "day" (
"id" SERIAL PRIMARY KEY,
"day" varchar(25)
);


CREATE TABLE "routine" (
   "id" SERIAL PRIMARY KEY,
  "routineName" varchar(255),
   "user_id" INT REFERENCES "user",
   "day_id" INT REFERENCES "day",
   "image" varchar(255),
   "completed" BOOLEAN DEFAULT 'false'
);