CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (255) NOT NULL,
    "completed" VARCHAR (10) DEFAULT 'false',
    "time" VARCHAR (255) DEFAULT 'incomplete'
);

-- Sample entries
INSERT INTO "tasks" ("task") VALUES ('Weekend Challenge');
INSERT INTO "tasks" ("task") VALUES ('Prime Academy');
