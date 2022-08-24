CREATE TABLE "spaces_roles" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "name" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
CREATE INDEX "spaces_roles_name" ON "spaces_roles" ("name");
CREATE UNIQUE INDEX "spaces_roles_space_id_name" ON "spaces_roles" ("space_id", "name");


CREATE TABLE "spaces_domains" (
  "space_id" integer NOT NULL,
  "domain_name" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
CREATE UNIQUE INDEX "spaces_domains_domain_name" ON "spaces_domains" ("domain_name");
CREATE INDEX "spaces_domains_space_id" ON "spaces_domains" ("space_id");


CREATE TABLE "spaces_users" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "user_id" numeric NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
CREATE INDEX "spaces_users_user_id" ON "spaces_users" ("user_id");
CREATE UNIQUE INDEX "spaces_users_space_id_user_id" ON "spaces_users" ("space_id", "user_id");


CREATE TABLE "spaces_users_roles" (
  "user_id" integer NOT NULL,
  "group_id" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

DELIMITER ;;
CREATE TRIGGER "users_delete" AFTER DELETE ON "users" FOR EACH ROW
BEGIN
  delete from users_auth where user_id=OLD.id;
  delete from spaces_users where user_id=OLD.id;
END;;
DELIMITER ;


DELIMITER ;;
CREATE TRIGGER "spaces_delete" AFTER DELETE ON "spaces" FOR EACH ROW
BEGIN
delete from spaces_users where space_id=OLD.id;
delete from spaces_roles where space_id=OLD.id;
delete from spaces_domains where space_id=OLD.id;
END;;
DELIMITER ;


DELIMITER ;;
CREATE TRIGGER "spaces_roles_delete" AFTER DELETE ON "spaces_roles" FOR EACH ROW
BEGIN
delete from "spaces_users_roles" where role_id=OLD.id;
END;;
DELIMITER ;


DELIMITER ;;
CREATE TRIGGER "domains_delete" AFTER DELETE ON "domains" FOR EACH ROW
BEGIN
delete from spaces_domains where domain_id=OLD.id;
END;;
DELIMITER ;



CREATE TABLE "spaces_applications" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "domain_name" text NOT NULL,
  "route" text NOT NULL,
  "docker_name" text NOT NULL,
  "source_port" text NOT NULL DEFAULT '80',
  "target_port" text NOT NULL DEFAULT '80',
  "target_prefix" text NOT NULL DEFAULT '/',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);