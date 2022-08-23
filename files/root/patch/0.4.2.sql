CREATE TABLE "spaces_roles" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "name" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);


CREATE TABLE "spaces_domains" (
  "space_id" integer NOT NULL,
  "domain_name" text NOT NULL
);
CREATE INDEX "spaces_domains_domain_name" ON "spaces_domains" ("domain_name");
CREATE UNIQUE INDEX "spaces_domains_space_id_domain_name" ON "spaces_domains" ("space_id", "domain_name");


CREATE TABLE "spaces_users" (
  "space_id" integer NOT NULL,
  "user_id" numeric NOT NULL
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
  delete from spaces_users_roles where user_id=OLD.id;
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


CREATE UNIQUE INDEX "spaces_users_roles_uq" ON "spaces_users_roles_roles" ("user_id", "group_id");


ALTER TABLE "users_in_groups" RENAME TO "spaces_users_roles";
