
-- Rename id in users --
BEGIN;
CREATE TABLE "adminer_users" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "login" text NOT NULL,
  "name" text NOT NULL DEFAULT '',
  "banned" integer NOT NULL DEFAULT '0',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_users" ("id", "login", "name", "banned", "is_deleted") SELECT "user_id", "login", "name", "banned", "is_deleted" FROM "users";
DROP TABLE "users";
ALTER TABLE "adminer_users" RENAME TO "users";
COMMIT;


CREATE UNIQUE INDEX "users_login" ON "users" ("login");


-- Add uid, remove content from templates --
BEGIN;
CREATE TABLE "adminer_templates" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" text NOT NULL,
  "name" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_templates" ("id", "name", "gmtime_created", "gmtime_updated") SELECT "id", "name", "gmtime_created", "gmtime_updated" FROM "templates";
DROP TABLE "templates";
ALTER TABLE "adminer_templates" RENAME TO "templates";
COMMIT;

CREATE UNIQUE INDEX "templates_uid" ON "templates" ("uid");


CREATE TABLE "templates_versions" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "template_id" integer NOT NULL,
  "version" text NOT NULL,
  "content" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("template_id") REFERENCES "templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "templates_versions_template_id" ON "templates_versions" ("template_id");
CREATE UNIQUE INDEX "templates_versions_template_id_version" ON "templates_versions"
 ("template_id", "version");

