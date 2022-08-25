DROP TRIGGER "applications_delete"
DROP TRIGGER "modificators_delete"
DROP TRIGGER "templates_delete"
DROP TRIGGER "users_delete"


PRAGMA foreign_keys = ON;
PRAGMA foreign_keys = OFF;


-- Add foreign key to app_modificators

BEGIN;
CREATE TABLE "adminer_app_modificators" (
  "app_id" integer NOT NULL,
  "modificator_id" integer NOT NULL,
  FOREIGN KEY ("modificator_id") REFERENCES "modificators" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("app_id") REFERENCES "applications" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "adminer_app_modificators" ("app_id", "modificator_id") SELECT "app_id", "modificator_id" FROM "app_modificators";
DROP TABLE "app_modificators";
ALTER TABLE "adminer_app_modificators" RENAME TO "app_modificators";
CREATE UNIQUE INDEX "applications_modificators_app_id_modificator_id" ON "app_modificators" ("app_id", "modificator_id");
CREATE INDEX "applications_modificators_modificator_id" ON "app_modificators" ("modificator_id");
COMMIT;


-- Add foreign key to applications

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
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("template_version_id") REFERENCES "templates_versions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "adminer_applications" ("id", "stack_name", "name", "template_version_id", "status", "content", "modificators", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated") SELECT "id", "stack_name", "name", "template_version_id", "status", "content", "modificators", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "adminer_applications" RENAME TO "applications";
CREATE INDEX "app_status_template_id" ON "applications" ("template_version_id");
CREATE UNIQUE INDEX "applications_stack_name_name" ON "applications" ("stack_name", "name");
COMMIT;


-- Add foreign key to users_auth

BEGIN;
CREATE TABLE "adminer_users_auth" (
  "user_id" integer NOT NULL,
  "method" text NOT NULL,
  "test" text NOT NULL DEFAULT '',
  "value" text NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "adminer_users_auth" ("user_id", "method", "test", "value") SELECT "user_id", "method", "test", "value" FROM "users_auth";
DROP TABLE "users_auth";
ALTER TABLE "adminer_users_auth" RENAME TO "users_auth";
CREATE UNIQUE INDEX "users_auth_user_id_method" ON "users_auth" ("user_id", "method");
COMMIT;


-- Add foreign key to templates_versions

BEGIN;
CREATE TABLE "adminer_templates_versions" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "template_id" integer NOT NULL,
  "version" text NOT NULL,
  "content" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("template_id") REFERENCES "templates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "adminer_templates_versions" ("id", "template_id", "version", "content", "gmtime_created", "gmtime_updated") SELECT "id", "template_id", "version", "content", "gmtime_created", "gmtime_updated" FROM "templates_versions";
DROP TABLE "templates_versions";
ALTER TABLE "adminer_templates_versions" RENAME TO "templates_versions";
CREATE INDEX "templates_versions_template_id" ON "templates_versions" ("template_id");
CREATE UNIQUE INDEX "templates_versions_template_id_version" ON "templates_versions" ("template_id", "version");
COMMIT;


-- Add table domains_ssl_groups

CREATE TABLE "domains_ssl_groups" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "public_key" text NOT NULL DEFAULT '',
  "private_key" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);


-- Add space_id, ssl_id to domains

BEGIN;
CREATE TABLE "adminer_domains" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NULL,
  "ssl_id" integer NULL,
  "domain_name" text NOT NULL,
  "nginx_template" text NOT NULL DEFAULT '',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("space_id") REFERENCES "spaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("ssl_id") REFERENCES "domains_ssl_groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
);
INSERT INTO "adminer_domains" ("id", "domain_name", "nginx_template", "gmtime_created", "gmtime_updated") SELECT "id", "domain_name", "nginx_template", "gmtime_created", "gmtime_updated" FROM "domains";
DROP TABLE "domains";
ALTER TABLE "adminer_domains" RENAME TO "domains";
CREATE UNIQUE INDEX "domains_domain_name" ON "domains" ("domain_name");
COMMIT;


-- Add spaces spaces_roles


CREATE TABLE "spaces_roles" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "name" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("space_id") REFERENCES "spaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "spaces_roles_name" ON "spaces_roles" ("name");
CREATE UNIQUE INDEX "spaces_roles_space_id_name" ON "spaces_roles" ("space_id", "name");


-- Add spaces spaces_users

CREATE TABLE "spaces_users" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "user_id" numeric NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("space_id") REFERENCES "spaces" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "spaces_users_user_id" ON "spaces_users" ("user_id");
CREATE UNIQUE INDEX "spaces_users_space_id_user_id" ON "spaces_users" ("space_id", "user_id");


-- Add spaces spaces_users_roles

CREATE TABLE "spaces_users_roles" (
  "user_id" integer NOT NULL,
  "group_id" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
   FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("role_id") REFERENCES "spaces_roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);


-- Add space_id to adminer_routes

CREATE TABLE "adminer_routes" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NULL,
  "enable" integer NOT NULL DEFAULT '0',
  "protocol" text NOT NULL,
  "protocol_data" text NOT NULL DEFAULT '',
  "domain_name" text NOT NULL,
  "route" text NOT NULL DEFAULT '/',
  "docker_name" text NOT NULL,
  "source_port" integer NOT NULL DEFAULT '80',
  "target_port" integer NOT NULL DEFAULT '80',
  "target_prefix" text NOT NULL DEFAULT '/',
  "layer_uid" text NOT NULL DEFAULT '',
  "nginx_config" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_routes" ("id", "enable", "protocol", "protocol_data", "domain_name", "route", "docker_name", "source_port", "target_port", "target_prefix", "layer_uid", "nginx_config", "gmtime_created", "gmtime_updated") SELECT "id", "enable", "protocol", "protocol_data", "domain_name", "route", "docker_name", "source_port", "target_port", "route_prefix", "layer_uid", "nginx_config", "gmtime_created", "gmtime_updated" FROM "routes";
DROP TABLE "routes";
ALTER TABLE "adminer_routes" RENAME TO "routes";
CREATE INDEX "routes_domain_name" ON "routes" ("domain_name");
CREATE INDEX "routes_space_id" ON "routes" ("space_id");
