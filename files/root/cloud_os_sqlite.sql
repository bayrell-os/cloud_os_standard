-- Adminer 4.8.1 SQLite 3 3.31.1 dump

DROP TABLE IF EXISTS "app_modificators";
CREATE TABLE "app_modificators" (
  "app_id" integer NOT NULL,
  "modificator_id" integer NOT NULL
);

CREATE UNIQUE INDEX "applications_modificators_app_id_modificator_id" ON "app_modificators" ("app_id", "modificator_id");

CREATE INDEX "applications_modificators_modificator_id" ON "app_modificators" ("modificator_id");


DROP TABLE IF EXISTS "applications";
CREATE TABLE "applications" (
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

CREATE INDEX "app_status_template_id" ON "applications" ("template_version_id");

CREATE UNIQUE INDEX "applications_stack_name_name" ON "applications" ("stack_name", "name");


DROP TABLE IF EXISTS "cron";
CREATE TABLE `cron` (
  `command` text  NOT NULL,
  `last_run` integer NOT NULL,
  PRIMARY KEY (`command`)
);


DROP TABLE IF EXISTS "docker_services";
CREATE TABLE "docker_services" (
  "service_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "stack_name" text NOT NULL,
  "service_name" text NOT NULL,
  "software_api_name" text NOT NULL DEFAULT '',
  "have_admin_page" integer NOT NULL DEFAULT '0',
  "admin_port" integer NOT NULL DEFAULT '0',
  "admin_route" text NOT NULL DEFAULT '',
  "admin_custom_nginx" text NOT NULL DEFAULT '',
  "enable" integer NOT NULL DEFAULT '0',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "count_work" integer NOT NULL,
  "count_total" integer NOT NULL,
  "data" text NULL,
  "docker_name" text NOT NULL,
  "docker_image" text NOT NULL DEFAULT '',
  "docker_content" text NULL,
  "docker_json" text NULL,
  "docker_tasks" text NULL,
  "docker_balancer" text NULL,
  "timestamp" integer NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "services_stack_name_service_name" ON "docker_services" ("stack_name", "service_name");

CREATE UNIQUE INDEX "services_docker_name" ON "docker_services" ("docker_name");


DROP TABLE IF EXISTS "docker_yaml_files";
CREATE TABLE "docker_yaml_files" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "file_name" text NOT NULL,
  "stack_name" text NOT NULL DEFAULT 'app',
  "content" text NOT NULL DEFAULT '',
  "timestamp" integer NOT NULL DEFAULT '0',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "docker_yaml_files_file_name" ON "docker_yaml_files" ("file_name");

CREATE UNIQUE INDEX "docker_yaml_files_stack_name_file_name" ON "docker_yaml_files" ("stack_name", "file_name");

CREATE INDEX "docker_yaml_files_stack_name" ON "docker_yaml_files" ("stack_name");


DROP TABLE IF EXISTS "domains";
CREATE TABLE "domains" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NULL,
  "ssl_id" integer NULL,
  "https_redirect" integer NULL DEFAULT '0',
  "domain_name" text NOT NULL,
  "nginx_template" text NOT NULL DEFAULT '',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "domains_domain_name" ON "domains" ("domain_name");


DROP TABLE IF EXISTS "domains_ssl_groups";
CREATE TABLE "domains_ssl_groups" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "container_name" text NOT NULL DEFAULT '',
  "cert_info" text NOT NULL DEFAULT '',
  "public_key" text NOT NULL DEFAULT '',
  "private_key" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);


DROP TABLE IF EXISTS "layers";
CREATE TABLE `layers` (
  `layer_uid` text  NOT NULL,
  `layer_name` text  NOT NULL,
  `space_id` integer DEFAULT NULL,
  PRIMARY KEY (`layer_uid`)
);

CREATE INDEX "layers_space_id" ON "layers" ("space_id");


DROP TABLE IF EXISTS "modificators";
CREATE TABLE "modificators" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" text NOT NULL DEFAULT '',
  "version" text NOT NULL DEFAULT '',
  "name" text NOT NULL DEFAULT '',
  "content" text NOT NULL DEFAULT '',
  "priority" numeric NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "modificators_uid" ON "modificators" ("uid");


DROP TABLE IF EXISTS "nginx_files";
CREATE TABLE "nginx_files" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "enable" integer NOT NULL DEFAULT '0',
  "content" text NOT NULL DEFAULT '',
  "timestamp" integer NOT NULL DEFAULT '0',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "nginx_files_name" ON "nginx_files" ("name");


DROP TABLE IF EXISTS "options";
CREATE TABLE "options" (
  "key" text NOT NULL,
  "value" text NOT NULL,
  "gmtime_created" numeric NOT NULL DEFAULT '',
  "gmtime_updated" numeric NOT NULL DEFAULT '',
  PRIMARY KEY ("key")
);


DROP TABLE IF EXISTS "roles";
CREATE TABLE "roles" (
  "role_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "role_name" text NOT NULL
);

CREATE INDEX "roles_space_id" ON "roles" ("space_id");


DROP TABLE IF EXISTS "routes";
CREATE TABLE "routes" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "enable" integer NOT NULL DEFAULT '0',
  "protocol" text NOT NULL,
  "protocol_data" text NOT NULL DEFAULT '',
  "domain_id" integer NULL,
  "route_prefix" text NOT NULL DEFAULT '/',
  "docker_name" text NOT NULL,
  "source_port" integer NOT NULL DEFAULT '80',
  "target_port" integer NOT NULL DEFAULT '80',
  "target_prefix" text NOT NULL DEFAULT '/',
  "layer_uid" text NOT NULL DEFAULT '',
  "nginx_config" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "routes_domain_id" ON "routes" ("domain_id");


DROP TABLE IF EXISTS "spaces";
CREATE TABLE "spaces" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" text NOT NULL DEFAULT '',
  "name" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "spaces_uid" ON "spaces" ("uid");


DROP TABLE IF EXISTS "spaces_roles";
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


DROP TABLE IF EXISTS "spaces_users";
CREATE TABLE "spaces_users" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "space_id" integer NOT NULL,
  "user_id" numeric NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "spaces_users_user_id" ON "spaces_users" ("user_id");

CREATE UNIQUE INDEX "spaces_users_space_id_user_id" ON "spaces_users" ("space_id", "user_id");


DROP TABLE IF EXISTS "spaces_users_roles";
CREATE TABLE "spaces_users_roles" (
  "user_id" integer NOT NULL,
  "role_id" integer NOT NULL,
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "users_in_groups_user_id_group_id" ON "spaces_users_roles" ("user_id", "role_id");


DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence(name,seq);


DROP TABLE IF EXISTS "stacks";
CREATE TABLE "stacks" (
  "stack_name" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  PRIMARY KEY ("stack_name")
);


DROP TABLE IF EXISTS "templates";
CREATE TABLE "templates" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "uid" text NOT NULL,
  "name" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "templates_uid" ON "templates" ("uid");


DROP TABLE IF EXISTS "templates_versions";
CREATE TABLE "templates_versions" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "template_id" integer NOT NULL,
  "version" text NOT NULL,
  "content" text NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "templates_versions_template_id" ON "templates_versions" ("template_id");

CREATE UNIQUE INDEX "templates_versions_template_id_version" ON "templates_versions" ("template_id", "version");


DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "login" text NOT NULL,
  "name" text NOT NULL DEFAULT '',
  "banned" integer NOT NULL DEFAULT '0',
  "is_deleted" integer NOT NULL DEFAULT '0',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE UNIQUE INDEX "users_login" ON "users" ("login");


DROP TABLE IF EXISTS "users_auth";
CREATE TABLE "users_auth" (
  "user_id" integer NOT NULL,
  "method" text NOT NULL,
  "test" text NOT NULL DEFAULT '',
  "value" text NOT NULL
);

CREATE UNIQUE INDEX "users_auth_user_id_method" ON "users_auth" ("user_id", "method");


-- 