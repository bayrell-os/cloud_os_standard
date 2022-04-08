
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

