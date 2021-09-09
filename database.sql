CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "firstName" VARCHAR (80) NOT NULL,
    "lastName" VARCHAR (80) NOT NULL,
    "flashLevel" VARCHAR (10) NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "photo" VARCHAR (256),
    "teamId" INT REFERENCES "team"
);


-- INSERT INTO "user"
-- ("username", "password", "firstName", "lastName", "flashLevel", "photo", "teamId")
-- VALUES
-- ('curtisClimbs', '123456', 'Curtis', 'Kettler', '5.9', 'imgurl', 1),
-- ('FreeSolo', '123456', 'Alex', 'Honold', '5.14', 'imgurl', 1),
-- ('cliffhanger4eva', '123456', 'Sylvester', 'Stallone', '5.10', 'imgurl', 1);


DROP TABLE "user";



CREATE TABLE "gym" (
    "id" SERIAL PRIMARY KEY,
    "location" VARCHAR (80) UNIQUE NOT NULL
);

INSERT INTO "gym"
("location")
VALUES ('Minneapolis'), ('St. Paul'), ('Bloomington');

DROP TABLE "gyms";



CREATE TABLE "team" (
    "id" SERIAL PRIMARY KEY,
    "teamName" VARCHAR (80) UNIQUE NOT NULL,
    "teamScore" INTEGER,
    "locationId" INT REFERENCES "gym"
);

INSERT INTO "team"
("teamName", "teamScore", "locationId")
VALUES ('Rock Crushers', 100, 1), ('Hard Rock', 99, 1), ('We Climb Good', 98, 1);

DROP TABLE "team";



CREATE TABLE "scores" (
	"id" SERIAL PRIMARY KEY,
	"climbType" VARCHAR (80) NOT NULL,
	"climbGrade" VARCHAR (10) NOT NULL,
	"isFlash" BOOLEAN,
	"isOnSight" BOOLEAN,
	"isBonus" BOOLEAN,
	"climbScore" INTEGER,
	"date" DATE,
	"climberId" INT REFERENCES "user" 
);

INSERT INTO "scores"
("climbType", "climbGrade", "isFlash", "isOnSight", "isBonus", "date", "climberId")
VALUES
('Top Rope', '5.10', true, false, false, '2020-11-11', 1);

DROP TABLE "scores";

SELECT
	"firstName",
	"lastName",
	"flashLevel",
	"photo",
	"teamName"
FROM "user"
JOIN "team" ON "user"."teamId" = "team"."id"
WHERE "user"."id" = 1;