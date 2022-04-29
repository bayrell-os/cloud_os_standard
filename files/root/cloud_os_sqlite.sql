-- Adminer 4.7.1 SQLite 3 dump

DROP TABLE IF EXISTS "app_modificators";
CREATE TABLE "app_modificators" (
  "app_id" integer NOT NULL,
  "modificator_id" integer NOT NULL,
  FOREIGN KEY ("modificator_id") REFERENCES "modificators" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("app_id") REFERENCES "applications" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "applications_modificators_app_id_modificator_id" ON "app_modificators" ("app_id", "modificator_id");

CREATE INDEX "applications_modificators_modificator_id" ON "app_modificators" ("modificator_id");


DROP TABLE IF EXISTS "applications";
CREATE TABLE "applications" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "template_id" integer NULL,
  "status" integer NOT NULL DEFAULT '0',
  "content" text NOT NULL DEFAULT '',
  "custom_patch" text NOT NULL DEFAULT '',
  "yaml" text NOT NULL DEFAULT '',
  "yaml_json" text NOT NULL DEFAULT '',
  "variables" text NOT NULL DEFAULT '',
  "services" text NOT NULL DEFAULT '',
  "app_file_id" integer NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  FOREIGN KEY ("app_file_id") REFERENCES "docker_yaml_files" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY ("template_id") REFERENCES "templates" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX "app_status_template_id" ON "applications" ("template_id");


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

CREATE UNIQUE INDEX "app_files_file_name" ON "docker_yaml_files" ("file_name");


DROP TABLE IF EXISTS "domains";
CREATE TABLE "domains" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "domain_name" text NOT NULL,
  "nginx_template" text NOT NULL DEFAULT '',
  "space_id" integer NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "domains_space_id" ON "domains" ("space_id");
CREATE UNIQUE INDEX "domains_domain_name" ON "domains" ("domain_name");


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
  "name" text NOT NULL,
  "content" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);


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
  "domain_name" text NOT NULL,
  "route" text NOT NULL DEFAULT '/',
  "docker_name" text NOT NULL,
  "source_port" integer NOT NULL DEFAULT '80',
  "target_port" integer NOT NULL DEFAULT '80',
  "route_prefix" text NOT NULL DEFAULT '/',
  "layer_uid" text NOT NULL DEFAULT '',
  "nginx_config" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);

CREATE INDEX "routes_domain_name" ON "routes" ("domain_name");


DROP TABLE IF EXISTS "spaces";
CREATE TABLE "spaces" (
  "space_id" integer NOT NULL,
  "api_name" text NOT NULL,
  "name" text NOT NULL,
  PRIMARY KEY ("space_id")
);


DROP TABLE IF EXISTS "stacks";
CREATE TABLE "stacks" (
  "stack_name" integer NOT NULL,
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL,
  PRIMARY KEY ("stack_name")
);


DROP TABLE IF EXISTS "templates";
CREATE TABLE "templates" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "content" text NOT NULL DEFAULT '',
  "gmtime_created" numeric NOT NULL,
  "gmtime_updated" numeric NOT NULL
);


DROP TABLE IF EXISTS "test";
CREATE TABLE "test" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "type" integer NOT NULL,
  "name" text NULL
);


DROP TABLE IF EXISTS "top_menu";
CREATE TABLE "top_menu" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" text NOT NULL,
  "href" text NOT NULL,
  "pos" integer NOT NULL
);


DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
  "user_id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "login" text NOT NULL,
  "name" text NOT NULL,
  "banned" integer NOT NULL,
  "is_deleted" integer NOT NULL
);


DROP TABLE IF EXISTS "users_auth";
CREATE TABLE `users_auth` (
  `user_id` integer NOT NULL,
  `method` text  NOT NULL,
  `value` text  NOT NULL
);

CREATE UNIQUE INDEX "users_auth_user_id_method" ON "users_auth" ("user_id", "method");


-- 