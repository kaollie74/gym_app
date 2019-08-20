
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


-- For the Day Table, it must be pre-filled in Monday - Sunday
-- Where Monday will be "id" '1' all the way where 'Sunday being "id" '7'
-- You can find the query below.
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

-- Insert these values in the "day" table before running the APP
-- Enter them in this order.
INSERT INTO "day" ("day")
Values('Monday');
INSERT INTO "day" ("day")
Values('Tuesday');
INSERT INTO "day" ("day")
Values('Wednesday');
INSERT INTO "day" ("day")
Values('Thursday');
INSERT INTO "day" ("day")
Values('Friday');
INSERT INTO "day" ("day")
Values('Saturday');
INSERT INTO "day" ("day")
Values('Sunday');