
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
DROP TABLE "docker_services";
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
CREATE UNIQUE INDEX "services_docker_name" ON "docker_services" ("docker_name");
CREATE UNIQUE INDEX "services_stack_name_service_name" ON "docker_services" ("stack_name", "service_name");
COMMIT;


-- Update modificators cloud_os

UPDATE modificators
SET `version`='1.6', `content`='<?xml version="1.1" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.cloud_os</uid>
	<name>Cloud OS</name>
	<date>2022-08-09T17:15:00+06:00</date>
	<version>1.6</version>
	<priority>-1000</priority>
	<operations>
    
		<operation type="add" position="first">
			<path>/template/yaml[not(version)]</path>
			<value>
				<version>3.7</version>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*[not(hostname)]</path>
			<value>
				<hostname>{{.Service.Name}}.{{.Task.ID}}.local</hostname>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*[not(environment)]</path>
			<value>
				<environment></environment>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*[not(logging)]</path>
			<value>
				<logging>
					<driver>journald</driver>
				</logging>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*[not(deploy)]</path>
			<value>
				<deploy>
					<replicas type="int">1</replicas>
					<endpoint_mode>dnsrr</endpoint_mode>
					<rollback_config>
						<parallelism type="int">1</parallelism>
						<failure_action>continue</failure_action>
						<order>start-first</order>
						<delay>40s</delay>
					</rollback_config>
					<update_config>
						<parallelism type="int">1</parallelism>
						<failure_action>rollback</failure_action>
						<order>start-first</order>
						<delay>40s</delay>
					</update_config>
					<restart_policy>
						<condition>on-failure</condition>
						<max_attempts type="int">3</max_attempts>
						<delay>5s</delay>
						<window>120s</window>
					</restart_policy>
				</deploy>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*[not(dns)]</path>
			<value>
				<dns array="true">172.18.0.1</dns>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*[not(networks)]</path>
			<value>
				<networks array="true">cloud_network</networks>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml[not(networks)]</path>
			<value>
				<networks>
					<cloud_network>
						<external type="boolean">true</external>
					</cloud_network>
				</networks>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*/environment</path>
			<value>
				<DOCKER_NODE_ID>{{.Node.ID}}</DOCKER_NODE_ID>
				<DOCKER_TASK_ID>{{.Task.ID}}</DOCKER_TASK_ID>
				<DOCKER_SERVICE_ID>{{.Service.ID}}</DOCKER_SERVICE_ID>
				<DOCKER_SERVICE_NAME>{{.Service.Name}}</DOCKER_SERVICE_NAME>
				<TZ>Asia/Almaty</TZ>
			</value>
		</operation>
		
		<!-- Patch last -->
		
		<operation type="add" priority="9999">
			<path>/template/variables[not(variable[name="_var_app_name_"])]</path>
			<value>
				<variable>
					<name>_var_app_name_</name>
					<label>App name</label>
					<type>string</type>
				</variable>
			</value>
		</operation>

		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/services/*/volumes</path>
			<name>array</name>
			<value>true</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/services/*/env_file</path>
			<name>array</name>
			<value>true</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/services/*/ports</path>
			<name>array</name>
			<value>true</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/services/*/environment</path>
			<name>type</name>
			<value>map</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/volumes</path>
			<name>type</name>
			<value>map</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/volumes/*</path>
			<name>type</name>
			<value>map</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/services/*/ports/target</path>
			<name>type</name>
			<value>int</value>
		</operation>
		
		<operation type="addAttribute" priority="9999">
			<path>/template/yaml/services/*/ports/published</path>
			<name>type</name>
			<value>int</value>
		</operation>
		
	</operations>
</modificator>'

WHERE `uid`="org.bayrell.modificator.cloud_os";



-- Update modificators cloud_os

UPDATE modificators
SET `version`='1.1', `content`='<?xml version="1.0" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.deploy_hostname</uid>
	<name>Deploy hostname</name>
	<version>1.1</version>
	<xml name="bayrell.org" priority="10">https://cloud.bayrell.org/marketplace/org.bayrell.modificator.deploy_hostname.xml</xml>
	<xml name="github.com" priority="20">https://raw.githubusercontent.com/bayrell-os/marketplace/main/org.bayrell.modificator.deploy_hostname.xml</xml>
	<date>2022-08-09T17:15:00+06:00</date>
	<operations>
		<operation type="remove">
			<path>/template/yaml/services/*/deploy/placement</path>
		</operation>
		<operation type="add">
			<path>/template/yaml/services/*/deploy</path>
			<value>
				<placement>
					<constraints array="true">node.hostname == _var_hostname_</constraints>
				</placement>
			</value>
		</operation>
		<operation type="add">
			<path>/template/variables[not(variable[name="_var_hostname_"])]</path>
			<value>
				<variable>
					<name>_var_hostname_</name>
					<label>Hostname</label>
					<type>string</type>
				</variable>
			</value>
		</operation>
	</operations>
</modificator>'

WHERE `uid`="org.bayrell.modificator.deploy_hostname";

