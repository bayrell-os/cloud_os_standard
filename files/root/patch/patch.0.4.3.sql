
-- Remove foreign key from applications

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
INSERT INTO "adminer_applications" ("id", "stack_name", "name", "template_version_id", "status", "content", "modificators", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated") SELECT "id", "stack_name", "name", "template_version_id", "status", "content", "modificators", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated" FROM "applications";
DROP TABLE "applications";
ALTER TABLE "adminer_applications" RENAME TO "applications";
CREATE INDEX "app_status_template_id" ON "applications" ("template_version_id");
CREATE UNIQUE INDEX "applications_stack_name_name" ON "applications" ("stack_name", "name");
COMMIT;


-- Remove foreign key from templates_versions

BEGIN;
CREATE TABLE "adminer_templates_versions" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "template_id" integer NOT NULL,
  "version" text NOT NULL,
  "content" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_templates_versions" ("id", "template_id", "version", "content", "gmtime_created", "gmtime_updated") SELECT "id", "template_id", "version", "content", "gmtime_created", "gmtime_updated" FROM "templates_versions";
DROP TABLE "templates_versions";
ALTER TABLE "adminer_templates_versions" RENAME TO "templates_versions";
CREATE INDEX "templates_versions_template_id" ON "templates_versions" ("template_id");
CREATE UNIQUE INDEX "templates_versions_template_id_version" ON "templates_versions" ("template_id", "version");
COMMIT;


-- Remove foreign key from spaces_users_roles

BEGIN;
CREATE TABLE "adminer_spaces_users_roles" (
  "user_id" integer NOT NULL,
  "role_id" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_spaces_users_roles" ("user_id", "role_id", "is_deleted", "gmtime_created", "gmtime_updated") SELECT "user_id", "role_id", "is_deleted", "gmtime_created", "gmtime_updated" FROM "spaces_users_roles";
DROP TABLE "spaces_users_roles";
ALTER TABLE "adminer_spaces_users_roles" RENAME TO "spaces_users_roles";
CREATE UNIQUE INDEX "users_in_groups_user_id_group_id" ON "spaces_users_roles" ("user_id", "role_id");
COMMIT;


-- Remove foreign key from spaces_users

BEGIN;
CREATE TABLE "adminer_spaces_users" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "user_id" numeric NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_spaces_users" ("id", "space_id", "user_id", "gmtime_created", "gmtime_updated") SELECT "id", "space_id", "user_id", "gmtime_created", "gmtime_updated" FROM "spaces_users";
DROP TABLE "spaces_users";
ALTER TABLE "adminer_spaces_users" RENAME TO "spaces_users";
CREATE INDEX "spaces_users_user_id" ON "spaces_users" ("user_id");
CREATE UNIQUE INDEX "spaces_users_space_id_user_id" ON "spaces_users" ("space_id", "user_id");
COMMIT;


-- Remove foreign key from spaces_roles

BEGIN;
CREATE TABLE "adminer_spaces_roles" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "name" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_spaces_roles" ("id", "space_id", "name", "is_deleted", "gmtime_created", "gmtime_updated") SELECT "id", "space_id", "name", "is_deleted", "gmtime_created", "gmtime_updated" FROM "spaces_roles";
DROP TABLE "spaces_roles";
ALTER TABLE "adminer_spaces_roles" RENAME TO "spaces_roles";
CREATE INDEX "spaces_roles_name" ON "spaces_roles" ("name");
CREATE UNIQUE INDEX "spaces_roles_space_id_name" ON "spaces_roles" ("space_id", "name");
COMMIT;


-- Remove foreign key from domains

BEGIN;
CREATE TABLE "adminer_domains" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NULL,
  "ssl_id" integer NULL,
  "domain_name" text NOT NULL,
  "nginx_template" text NOT NULL DEFAULT '',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_domains" ("id", "space_id", "ssl_id", "domain_name", "nginx_template", "is_deleted", "gmtime_created", "gmtime_updated") SELECT "id", "space_id", "ssl_id", "domain_name", "nginx_template", "is_deleted", "gmtime_created", "gmtime_updated" FROM "domains";
DROP TABLE "domains";
ALTER TABLE "adminer_domains" RENAME TO "domains";
CREATE UNIQUE INDEX "domains_domain_name" ON "domains" ("domain_name");
COMMIT;


-- Remove foreign key from docker_yaml_files

BEGIN;
CREATE TABLE "adminer_docker_yaml_files" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "file_name" text NOT NULL,
  "stack_name" text NOT NULL DEFAULT 'app',
  "content" text NOT NULL DEFAULT '',
  "timestamp" integer NOT NULL DEFAULT '0',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_docker_yaml_files" ("id", "file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated") SELECT "id", "file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated" FROM "docker_yaml_files";
DROP TABLE "docker_yaml_files";
ALTER TABLE "adminer_docker_yaml_files" RENAME TO "docker_yaml_files";
CREATE INDEX "docker_yaml_files_file_name" ON "docker_yaml_files" ("file_name");
CREATE UNIQUE INDEX "docker_yaml_files_stack_name_file_name" ON "docker_yaml_files" ("stack_name", "file_name");
CREATE INDEX "docker_yaml_files_stack_name" ON "docker_yaml_files" ("stack_name");
COMMIT;


-- Remove foreign key from app_modificators

BEGIN;
CREATE TABLE "adminer_app_modificators" (
  "app_id" integer NOT NULL,
  "modificator_id" integer NOT NULL
);
INSERT INTO "adminer_app_modificators" ("app_id", "modificator_id") SELECT "app_id", "modificator_id" FROM "app_modificators";
DROP TABLE "app_modificators";
ALTER TABLE "adminer_app_modificators" RENAME TO "app_modificators";
CREATE UNIQUE INDEX "applications_modificators_app_id_modificator_id" ON "app_modificators" ("app_id", "modificator_id");
CREATE INDEX "applications_modificators_modificator_id" ON "app_modificators" ("modificator_id");
COMMIT;


-- Remove foreign key from users_auth

BEGIN;
CREATE TABLE "adminer_users_auth" (
  "user_id" integer NOT NULL,
  "method" text NOT NULL,
  "test" text NOT NULL DEFAULT '',
  "value" text NOT NULL
);
INSERT INTO "adminer_users_auth" ("user_id", "method", "test", "value") SELECT "user_id", "method", "test", "value" FROM "users_auth";
DROP TABLE "users_auth";
ALTER TABLE "adminer_users_auth" RENAME TO "users_auth";
CREATE UNIQUE INDEX "users_auth_user_id_method" ON "users_auth" ("user_id", "method");
COMMIT;


-- Add cert_info, container_name

BEGIN;
CREATE TABLE "adminer_domains_ssl_groups" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "container_name" text NOT NULL DEFAULT '',
  "cert_info" text NOT NULL DEFAULT '',
  "public_key" text NOT NULL DEFAULT '',
  "private_key" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);
INSERT INTO "adminer_domains_ssl_groups" ("id", "name", "public_key", "private_key", "gmtime_created", "gmtime_updated") SELECT "id", "name", "public_key", "private_key", "gmtime_created", "gmtime_updated" FROM "domains_ssl_groups";
DROP TABLE "domains_ssl_groups";
ALTER TABLE "adminer_domains_ssl_groups" RENAME TO "domains_ssl_groups";
COMMIT;

 