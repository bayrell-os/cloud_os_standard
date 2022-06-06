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
