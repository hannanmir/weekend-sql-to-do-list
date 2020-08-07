CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (255) NOT NULL,
    "completed" BOOLEAN DEFAULT 'false'
);

INSERT INTO "tasks" ("task") VALUES ('Weekend Challenge');
INSERT INTO "tasks" ("task") VALUES ('Prime Academy');
