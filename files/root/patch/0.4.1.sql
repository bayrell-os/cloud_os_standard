
PRAGMA foreign_keys=off;


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
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "templates_versions_template_id" ON "templates_versions" ("template_id");
CREATE UNIQUE INDEX "templates_versions_template_id_version" ON "templates_versions"
 ("template_id", "version");



-- applications

BEGIN;
CREATE TABLE "adminer_applications" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "stack_name" text NOT NULL,
  "name" text NOT NULL,
  "template_version_id" integer NULL,
  "status" integer NOT NULL DEFAULT '0',
  "content" text NOT NULL DEFAULT '',
  "custom_patch" text NOT NULL DEFAULT '',
  "yaml" text NOT NULL DEFAULT '',
  "yaml_file_id" integer NULL,
  "variables" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_applications" ("id", "name", "template_version_id", "status", "content", "custom_patch", "yaml", "variables", "yaml_file_id", "gmtime_created", "gmtime_updated") SELECT "id", "name", "template_id", "status", "content", "custom_patch", "yaml", "variables", "app_file_id", "gmtime_created", "gmtime_updated" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "adminer_applications" RENAME TO "applications";
CREATE INDEX "app_status_template_id" ON "applications" ("template_version_id");
COMMIT;



-- add priority to modificators

BEGIN;
CREATE TABLE "adminer_modificators" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "content" text NOT NULL DEFAULT '',
  "priority" numeric NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_modificators" ("id", "name", "content", "gmtime_created", "gmtime_updated") SELECT "id", "name", "content", "gmtime_created", "gmtime_updated" FROM "modificators";
DROP TABLE "modificators";
ALTER TABLE "adminer_modificators" RENAME TO "modificators";
COMMIT;


DROP INDEX "app_files_file_name";
CREATE INDEX "docker_yaml_files_file_name" ON "docker_yaml_files" ("file_name");
CREATE UNIQUE INDEX "docker_yaml_files_stack_name_file_name" ON "docker_yaml_files" ("stack_name", "file_name");


-- add modificators

BEGIN;
CREATE TABLE "adminer_applications" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "stack_name" text NOT NULL,
  "name" text NOT NULL,
  "template_version_id" integer NULL,
  "status" integer NOT NULL DEFAULT '0',
  "content" text NOT NULL DEFAULT '',
  "modificators" text NOT NULL DEFAULT '',
  "custom_patch" text NOT NULL DEFAULT '',
  "yaml" text NOT NULL DEFAULT '',
  "yaml_file_id" integer NULL,
  "variables" text NOT NULL DEFAULT '',
  "environments" text NOT NULL DEFAULT '',
  "volumes" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_applications" ("id", "stack_name", "name", "template_version_id", "status", "content", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated") SELECT "id", "stack_name", "name", "template_version_id", "status", "content", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "adminer_applications" RENAME TO "applications";
CREATE INDEX "app_status_template_id" ON "applications" ("template_version_id");
COMMIT;


-- Add uid, version to modificators

BEGIN;
CREATE TABLE "adminer_modificators" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" text NOT NULL DEFAULT '',
  "version" text NOT NULL DEFAULT '',
  "name" text NOT NULL DEFAULT '',
  "content" text NOT NULL DEFAULT '',
  "priority" numeric NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_modificators" ("id", "name", "content", "priority", "gmtime_created", "gmtime_updated") SELECT "id", "name", "content", "priority", "gmtime_created", "gmtime_updated" FROM "modificators";
DROP TABLE "modificators";
ALTER TABLE "adminer_modificators" RENAME TO "modificators";
COMMIT;


-- Change space table

BEGIN;
CREATE TABLE "adminer_spaces" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" text NOT NULL DEFAULT '',
  "name" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_spaces" ("id", "name") SELECT "space_id", "name" FROM "spaces";
DROP TABLE "spaces";
ALTER TABLE "adminer_spaces" RENAME TO "spaces";
COMMIT;


-- Add key uid to modificators
CREATE UNIQUE INDEX "modificators_uid" ON "modificators" ("uid");


-- Add key uid to applications

CREATE UNIQUE INDEX "applications_stack_name_name" ON "applications" ("stack_name", "name");


-- Add delete trigger to applications

DELIMITER ;;
CREATE TRIGGER "applications_delete" AFTER DELETE ON "applications" FOR EACH ROW
BEGIN
delete from app_modificators where app_id=OLD.id;
END
;;
DELIMITER ;


-- Add delete trigger to modificators

DELIMITER ;;
CREATE TRIGGER "modificators_delete" AFTER DELETE ON "modificators" FOR EACH ROW
BEGIN
delete from app_modificators where modificator_id=OLD.id;
END
;;
DELIMITER ;


-- Add delete trigger to templates

DELIMITER ;;
CREATE TRIGGER "templates_delete" AFTER DELETE ON "templates" FOR EACH ROW
BEGIN
delete from templates_versions where template_id=OLD.id;
END
;;
DELIMITER ;


-- Add table options

CREATE TABLE "options" (
  "key" text NOT NULL,
  "value" text NOT NULL,
  PRIMARY KEY ("key")
);


PRAGMA foreign_keys=on;
