CREATE TABLE "users_groups" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);


CREATE TABLE "users_in_groups" (
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
  delete from users_in_groups where user_id=OLD.id;
END;;
DELIMITER ;


DELIMITER ;;
CREATE TRIGGER "users_groups_ad" AFTER DELETE ON "users_groups" FOR EACH ROW
BEGIN
  delete from users_in_groups where group_id=OLD.id;
END;;
DELIMITER ;


CREATE UNIQUE INDEX "users_in_groups_user_id_group_id" ON "users_in_groups" ("user_id", "group_id");


BEGIN;
CREATE TABLE "adminer_domains" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "domain_name" text NOT NULL,
  "nginx_template" text NOT NULL DEFAULT '',
  "space_id" integer NULL,
  "enable_auth" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_domains" ("id", "domain_name", "nginx_template", "space_id", "gmtime_created", "gmtime_updated") SELECT "id", "domain_name", "nginx_template", "space_id", "gmtime_created", "gmtime_updated" FROM "domains";
DROP TABLE "domains";
ALTER TABLE "adminer_domains" RENAME TO "domains";
CREATE INDEX "domains_space_id" ON "domains" ("space_id");
CREATE UNIQUE INDEX "domains_domain_name" ON "domains" ("domain_name");
COMMIT;
