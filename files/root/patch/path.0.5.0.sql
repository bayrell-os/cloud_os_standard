
-- Add domain_id to routes

BEGIN;
CREATE TABLE "adminer_routes" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "enable" integer NOT NULL DEFAULT '0',
  "protocol" text NOT NULL,
  "protocol_data" text NOT NULL DEFAULT '',
  "domain_name" text NOT NULL,
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
INSERT INTO "adminer_routes" ("id", "enable", "protocol", "protocol_data", "domain_name", "route_prefix", "docker_name", "source_port", "target_port", "target_prefix", "layer_uid", "nginx_config", "gmtime_created", "gmtime_updated") SELECT "id", "enable", "protocol", "protocol_data", "domain_name", "route_prefix", "docker_name", "source_port", "target_port", "target_prefix", "layer_uid", "nginx_config", "gmtime_created", "gmtime_updated" FROM "routes";
DROP TABLE "routes";
ALTER TABLE "adminer_routes" RENAME TO "routes";
CREATE INDEX "routes_domain_name" ON "routes" ("domain_name");
COMMIT;


-- Add routes_domain_id index

CREATE INDEX "routes_domain_id" ON "routes" ("domain_id");


-- Update domain_id key in routes

UPDATE routes
SET domain_id = (
    SELECT id
    FROM domains
    WHERE domains.domain_name = routes.domain_name
);


-- Delete all records where domain_id is null

DELETE FROM routes WHERE domain_id is null;


-- Remove domain_id from routes

BEGIN;
CREATE TABLE "adminer_routes" (
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
INSERT INTO "adminer_routes" ("id", "enable", "protocol", "protocol_data", "domain_id", "route_prefix", "docker_name", "source_port", "target_port", "target_prefix", "layer_uid", "nginx_config", "gmtime_created", "gmtime_updated") SELECT "id", "enable", "protocol", "protocol_data", "domain_id", "route_prefix", "docker_name", "source_port", "target_port", "target_prefix", "layer_uid", "nginx_config", "gmtime_created", "gmtime_updated" FROM "routes";
DROP TABLE "routes";
ALTER TABLE "adminer_routes" RENAME TO "routes";
CREATE INDEX "routes_domain_id" ON "routes" ("domain_id");
COMMIT;


-- Add count_work, count_total fields

BEGIN;
CREATE TABLE "adminer_docker_services" (
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
INSERT INTO "adminer_docker_services" ("service_id", "stack_name", "service_name", "software_api_name", "have_admin_page", "admin_port", "admin_route", "admin_custom_nginx", "enable", "is_deleted", "data", "docker_name", "docker_image", "docker_content", "docker_json", "docker_tasks", "docker_balancer", "timestamp", "gmtime_created", "gmtime_updated") SELECT "service_id", "stack_name", "service_name", "software_api_name", "have_admin_page", "admin_port", "admin_route", "admin_custom_nginx", "enable", "is_deleted", "data", "docker_name", "docker_image", "docker_content", "docker_json", "docker_tasks", "docker_balancer", "timestamp", "gmtime_created", "gmtime_updated" FROM "docker_services";
DROP TABLE "docker_services";
ALTER TABLE "adminer_docker_services" RENAME TO "docker_services";
CREATE UNIQUE INDEX "services_docker_name" ON "docker_services" ("docker_name");
CREATE UNIQUE INDEX "services_stack_name_service_name" ON "docker_services" ("stack_name", "service_name");
COMMIT;

