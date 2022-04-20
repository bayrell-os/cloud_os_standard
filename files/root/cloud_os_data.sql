
-- Add load_balancer_http

INSERT INTO "docker_yaml_files" ("file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated") VALUES ('load_balancer_http.yaml',	'cloud_os',	'version: ''3.7''
services:
  load_balancer_http:
    image: ''bayrell/load_balancer_http:0.4.0''
    hostname: ''{{.Service.Name}}.{{.Task.ID}}.local''
    volumes:
      - ''load_balancer_http_data:/data''
    ports:
      - target: 80
        published: 80
        protocol: tcp
        mode: host
      - target: 443
        published: 443
        protocol: tcp
        mode: host
    env_file:
      - ./env.conf
    dns:
      - 172.18.0.1
    deploy:
      replicas: 1
      endpoint_mode: dnsrr
      update_config:
        parallelism: 1
        failure_action: rollback
        order: start-first
        delay: 5s
      restart_policy:
        condition: on-failure
        delay: 10s
        window: 120s
      placement:
        constraints:
          - ''node.hostname == docker0''
    networks:
      - cloud_network
    logging:
      driver: journald
volumes:
  load_balancer_http_data:
networks:
  cloud_network:
    external: true
',	'0',	'0',	'%GMTIME%',	'%GMTIME%');


-- Add env.conf

INSERT INTO "docker_yaml_files" ("file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated") VALUES ('env.conf',	'cloud_os',	'DOCKER=1
NODE_ID={{.Node.ID}}
TASK_ID={{.Task.ID}}
SERVICE_ID={{.Service.ID}}
CLOUD_OS_KEY=%CLOUD_OS_KEY%
CLOUD_OS_GATEWAY=%CLOUD_OS_GATEWAY%',	'0',	'0',	'%GMTIME%',	'%GMTIME%');


-- Add test.yaml

INSERT INTO "docker_yaml_files" ("file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated") VALUES ('test.yaml',	'app',	'version: ''3.7''
services:
  test:
    image: ''bayrell/alpine_php_fpm:7.4''
    hostname: ''{{.Service.Name}}.{{.Task.ID}}.local''
    volumes:
      - ''test_data:/data''
    environment:
      TZ: Asia/Almaty
      WWW_UID: 1000
      WWW_GID: 1000
    dns:
      - 172.18.0.1
    deploy:
      replicas: 1
      endpoint_mode: dnsrr
      update_config:
        parallelism: 1
        failure_action: rollback
        order: start-first
        delay: 5s
      restart_policy:
        condition: on-failure
        delay: 10s
        window: 120s
      placement:
        constraints:
          - ''node.hostname == docker0''
    networks:
      - cloud_network
    logging:
      driver: journald
volumes:
  test_data:
networks:
  cloud_network:
    external: true
',	'0',	'0',	'%GMTIME%',	'%GMTIME%');


-- Add Cloud OS modificator

INSERT INTO "modificators" ("id", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (1,	'Cloud OS',	'<?xml version="1.1" encoding="UTF-8" ?>
<patch>
	<name>Cloud OS</name>
  <priority>-1000</priority>
	<operations>
    
    <operation type="add" position="first">
      <path>/template/yaml</path>
      <notExists>/template/yaml/version</notExists>
      <value>
        <version>3.7</version>
      </value>
    </operation>
    
    <operation type="add">
			<path>/template/yaml/services/_var_service_name_</path>
      <notExists>/template/yaml/services/_var_service_name_/environment</notExists>
      <value>
        <environment></environment>
      </value>
		</operation>
    
		<operation type="add">
			<path>/template/yaml/services/_var_service_name_</path>
      <notExists>/template/yaml/services/_var_service_name_/logging</notExists>
			<value>
				<logging>
					<driver>journald</driver>
				</logging>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/_var_service_name_</path>
      <notExists>/template/yaml/services/_var_service_name_/deploy</notExists>
			<value>
				<deploy>
					<replicas type="int">1</replicas>
					<endpoint_mode>dnsrr</endpoint_mode>
					<update_config>
						<parallelism type="int">1</parallelism>
						<failure_action>rollback</failure_action>
						<order>start-first</order>
						<delay>5s</delay>
					</update_config>
					<restart_policy>
						<condition>on-failure</condition>
						<delay>10s</delay>
						<window>120s</window>
					</restart_policy>
				</deploy>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/_var_service_name_</path>
      <notExists>/template/yaml/services/_var_service_name_/networks</notExists>
			<value>
				<networks type="array">cloud_network</networks>
			</value>
		</operation>
		
    <operation type="add">
			<path>/template/yaml</path>
      <notExists>/template/yaml/networks</notExists>
			<value>
        <networks>
				  <cloud_network>
            <external type="boolean">true</external>
				  </cloud_network>
        </networks>
			</value>
		</operation>
		
    
    <!-- Patch last -->
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_service_name_/volumes</path>
      <name>type</name>
      <value>array</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_service_name_/environment</path>
      <name>type</name>
      <value>map</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/volumes</path>
      <name>type</name>
      <value>map</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/volumes/*</path>
      <name>type</name>
      <value>map</value>
		</operation>
    
	</operations>
</patch>',	-1000,	'%GMTIME%',	'%GMTIME%');


-- Add Deploy hostname modificator

INSERT INTO "modificators" ("id", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (2,	'Deploy hostname',	'<?xml version="1.1" encoding="UTF-8" ?>
<patch>
	<name>Deploy hostname</name>
	<operations>
    
    <operation type="remove">
      <path>/template/yaml/services/_var_service_name_/deploy/placement</path>
    </operation>
    
		<operation type="add">
			<path>/template/yaml/services/_var_service_name_/deploy</path>
			<value>
        <placement>
          <constraints type="array">node.hostname == _var_hostname_</constraints>
        </placement>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/variables</path>
      <notExists>/template/variables/variable[name="_var_hostname_"]</notExists>
			<value>
				<variable>
					<name>_var_hostname_</name>
          <label>Hostname</label>
					<type>string</type>
				</variable>
			</value>
		</operation>
		
	</operations>
</patch>',	'0',	'%GMTIME%',	'%GMTIME%');

-- 