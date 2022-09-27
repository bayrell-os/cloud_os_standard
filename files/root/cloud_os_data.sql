-- Adminer 4.7.1 SQLite 3 dump

INSERT INTO "applications" ("id", "stack_name", "name", "template_version_id", "status", "content", "modificators", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated") VALUES (1,	'cloud_os',	'load_balancer',	1,	'0',	'',	'',	'',	'',	NULL,	'{"_var_app_name_":"load_balancer","_var_service_name_":"cloud_os_load_balancer","_var_hostname_":"docker0"}',	'',	'',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "applications" ("id", "stack_name", "name", "template_version_id", "status", "content", "modificators", "custom_patch", "yaml", "yaml_file_id", "variables", "environments", "volumes", "gmtime_created", "gmtime_updated") VALUES (2,	'cloud_os',	'virtual_space',	2,	'0',	'',	'',	'',	'',	NULL,	'{"_var_app_name_":"virtual_space","_var_service_name_":"cloud_os_virtual_space","_var_hostname_":"docker0"}',	'',	'',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "modificators" ("id", "uid", "version", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (1,	'org.bayrell.modificator.cloud_os',	'1.5',	'Cloud OS',	'<?xml version="1.1" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.cloud_os</uid>
	<name>Cloud OS</name>
	<date>2022-08-09T17:15:00+06:00</date>
	<version>1.5</version>
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
			<path>/template/yaml/services/*</path>
			<notExists>/template/yaml/services/*/hostname</notExists>
			<value>
				<hostname>{{.Service.Name}}.{{.Task.ID}}.local</hostname>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*</path>
			<notExists>/template/yaml/services/*/environment</notExists>
			<value>
				<environment></environment>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*</path>
			<notExists>/template/yaml/services/*/logging</notExists>
			<value>
				<logging>
					<driver>journald</driver>
				</logging>
			</value>
		</operation>
			
		<operation type="add">
			<path>/template/yaml/services/*</path>
			<notExists>/template/yaml/services/*/deploy</notExists>
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
			<path>/template/yaml/services/*</path>
			<notExists>/template/yaml/services/*/dns</notExists>
			<value>
				<dns type="array">172.18.0.1</dns>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/*</path>
			<notExists>/template/yaml/services/*/networks</notExists>
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
		
		<operation type="add">
			<path>/template/yaml/services/*/environment</path>
			<value>
				<DOCKER_NODE_ID>{{.Node.ID}}</DOCKER_NODE_ID>
				<DOCKER_TASK_ID>{{.Task.ID}}</DOCKER_TASK_ID>
				<DOCKER_SERVICE_ID>{{.Service.ID}}</DOCKER_SERVICE_ID>
				<DOCKER_SERVICE_NAME>{{.Service.Name}}</DOCKER_SERVICE_NAME>
				<TZ>UTC</TZ>
			</value>
		</operation>
		
		<!-- Patch last -->
		
		<operation type="add" priority="1000">
			<path>/template/variables</path>
			<notExists>/template/variables/variable[name="_var_app_name_"]</notExists>
			<value>
				<variable>
					<name>_var_app_name_</name>
					<label>App name</label>
					<type>string</type>
				</variable>
			</value>
		</operation>
		
		<operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/*/volumes</path>
			<name>type</name>
			<value>array</value>
		</operation>
		
		<operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/*/env_file</path>
			<name>type</name>
			<value>array</value>
		</operation>
		
		<operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/*/ports</path>
			<name>type</name>
			<value>array</value>
		</operation>
		
		<operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/*/environment</path>
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
		
		<operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/*/ports/target</path>
			<name>type</name>
			<value>int</value>
		</operation>
		
		<operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/*/ports/published</path>
			<name>type</name>
			<value>int</value>
		</operation>
		
	</operations>
</modificator>',	-1000,	'%GMTIME%',	'%GMTIME%');

INSERT INTO "modificators" ("id", "uid", "version", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (2,	'org.bayrell.modificator.cloud_key',	'1.0',	'Cloud key',	'<?xml version="1.1" encoding="UTF-8" ?>
<modificator>
  <uid>org.bayrell.modificator.cloud_key</uid>
	<name>Cloud key</name>
	<version>1.0</version>
	<operations>
    
    <operation type="add">
		<path>/template/yaml/services/_var_app_name_/environment</path>
		<value>
			<CLOUD_OS_KEY>%CLOUD_OS_KEY%</CLOUD_OS_KEY>
			<CLOUD_OS_GATEWAY>cloud_os_standard_1:81</CLOUD_OS_GATEWAY>
			<JWT_COOKIE_KEY>cloud_jwt</JWT_COOKIE_KEY>
			<JWT_PUBLIC_KEY>%JWT_PUBLIC_KEY%</JWT_PUBLIC_KEY>
		</value>
    </operation>
    
	</operations>
</modificator>',	'0',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "modificators" ("id", "uid", "version", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (3,	'org.bayrell.modificator.deploy_hostname',	'1.0',	'Deploy hostname',	'<?xml version="1.0" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.deploy_hostname</uid>
	<name>Deploy hostname</name>
	<version>1.0</version>
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
</modificator>',	'0',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "modificators" ("id", "uid", "version", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (4,	'org.bayrell.modificator.change_image',	'1.0',	'Change image',	'<?xml version="1.1" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.change_image</uid>
	<name>Change image</name>
	<version>1.0</version>
	<operations>
		<operation type="replace">
			<path>/template/yaml/services/*/image</path>
			<value>
				<image>_var_image_</image>
			</value>
		</operation>
		<operation type="add">
			<path>/template/variables</path>
			<notExists>/template/variables/variable[name="_var_image_"]</notExists>
			<value>
				<variable>
					<name>_var_image_</name>
					<label>image:tag</label>
					<type>string</type>
				</variable>
			</value>
		</operation>
	</operations>
</modificator>',	'0',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "modificators" ("id", "uid", "version", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (5,	'org.bayrell.modificator.volume_data',	'1.0',	'Volume /data',	'<?xml version="1.0" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.volume_data</uid>
	<name>Volume /data</name>
	<xml name="bayrell.org">https://cloud.bayrell.org/marketplace/org.bayrell.modificator.volume_data.xml</xml>
	<xml name="github.com">https://raw.githubusercontent.com/bayrell-os/marketplace/main/org.bayrell.modificator.volume_data.xml</xml>
	<version>1.0</version>
	<date>2022-05-15T18:32:00+06:00</date>
	<operations>
		<operation type="add">
			<path>/template/yaml/services/*</path>
			<value>
				<volumes>_var_app_name__data:/data</volumes>
			</value>
		</operation>
		<operation type="add">
			<path>/template/yaml</path>
			<notExists>/template/yaml/volumes</notExists>
			<value>
				<volumes></volumes>
			</value>
		</operation>
		<operation type="add">
			<path>/template/yaml/volumes</path>
			<notExists>/template/yaml/volumes/_var_app_name__data</notExists>
			<value>
				<_var_app_name__data />
			</value>
		</operation>
	</operations>
</modificator>',	'0',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "modificators" ("id", "uid", "version", "name", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (6,	'org.bayrell.modificator.volume_shared',	'1.0',	'Volume /shared',	'<?xml version="1.1" encoding="UTF-8" ?>
<modificator>
	<uid>org.bayrell.modificator.volume_shared</uid>
	<name>Volume /shared</name>
    <date>2022-08-09T17:15:00+06:00</date>
	<version>1.0</version>
	<operations>
		
		<operation type="add">
			<path>/template/yaml/services/*</path>
			<value>
				<volumes>_var_folder_shared_:/shared</volumes>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml</path>
			<notExists>/template/yaml/volumes</notExists>
			<value>
				<volumes></volumes>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/variables</path>
			<value>
				<variable>
					<name>_var_folder_shared_</name>
					<label>Shared folder</label>
					<type>string</type>
				</variable>
			</value>
		</operation>
		
	</operations>
</modificator>',	'0',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('cloud_os',	'%GMTIME%',	'%GMTIME%');
INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('admin',	'%GMTIME%',	'%GMTIME%');
INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('prod',	'%GMTIME%',	'%GMTIME%');
INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('dev',	'%GMTIME%',	'%GMTIME%');
INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('test',	'%GMTIME%',	'%GMTIME%');
INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('database',	'%GMTIME%',	'%GMTIME%');
INSERT INTO "stacks" ("stack_name", "gmtime_created", "gmtime_updated") VALUES ('app',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "templates" ("id", "uid", "name", "gmtime_created", "gmtime_updated") VALUES (1,	'org.bayrell.load_balancer',	'Cloud OS load balancer',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "templates" ("id", "uid", "name", "gmtime_created", "gmtime_updated") VALUES (2,	'org.bayrell.virtual_space',	'Virtual space',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "templates_versions" ("id", "template_id", "version", "content", "gmtime_created", "gmtime_updated") VALUES (1,	1,	'0.4.3',	'<?xml version="1.1" encoding="UTF-8" ?>
<template>
	<uid>org.bayrell.load_balancer_http</uid>
	<name>Cloud OS HTTP load balancer</name>
	<version>0.4.3</version>
	<maintainer>Ildar &lt;ildar@bayrell.org&gt;</maintainer>
	<marketplace>https://cloud_os.bayrell.org/</marketplace>
	<link name="Docker hub">https://hub.docker.com/r/bayrell/load_balancer_http</link>
	<link name="Github">https://github.com/bayrell-os/load_balancer_http</link>
	<xml name="bayrell.org" priority="10">https://cloud.bayrell.org/marketplace/org.bayrell.load_balancer_http.xml</xml>
	<xml name="github.com" priority="20">https://raw.githubusercontent.com/bayrell-os/load_balancer_http/main/org.bayrell.load_balancer_http.xml</xml>
	<arch>amd64</arch>
	<arch>arm64v8</arch>
	<license>MIT</license>
	<yaml>
		<services>
			<_var_app_name_>
				<image>docker.io/bayrell/load_balancer_http:0.4.3</image>
				<hostname>{{.Service.Name}}.{{.Task.ID}}.local</hostname>
				<volumes>_var_app_name__data:/data</volumes>
				<ports>
					<target>80</target>
					<published>80</published>
					<protocol>tcp</protocol>
					<mode>host</mode>
				</ports>
				<ports>
					<target>443</target>
					<published>443</published>
					<protocol>tcp</protocol>
					<mode>host</mode>
				</ports>
			</_var_app_name_>
		</services>
		<volumes>
			<_var_app_name__data />
		</volumes>
	</yaml>
	<patch>
		<operations>
			<operation type="replace">
				<path>/template/yaml/services/_var_app_name_/deploy/update_config/order</path>
				<value>
					<order>stop-first</order>
				</value>
			</operation>
		</operations>
	</patch>
	<variables>
		<variable>
			<name>_var_app_name_</name>
			<label>App name</label>
			<type>string</type>
		</variable>
	</variables>
</template>',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "templates_versions" ("id", "template_id", "version", "content", "gmtime_created", "gmtime_updated") VALUES (2,	2,	'0.4.3',	'<?xml version="1.0" encoding="UTF-8" ?>
<template>
	<uid>org.bayrell.virtual_space</uid>
	<name>Virtual space</name>
	<version>0.4.3</version>
	<maintainer>Ildar &lt;ildar@bayrell.org&gt;</maintainer>
	<marketplace>https://cloud.bayrell.org/</marketplace>
	<date>2022-22-20T00:37:00+06:00</date>
	<arch>amd64</arch>
	<arch>arm64v8</arch>
	<link name="Docker hub">https://hub.docker.com/r/bayrell/virtual_space</link>
	<link name="Github">https://github.com/bayrell-os/virtual_space</link>
	<xml name="bayrell.org" priority="10">https://cloud.bayrell.org/marketplace/org.bayrell.virtual_space.xml</xml>
	<xml name="github.com" priority="20">https://raw.githubusercontent.com/bayrell-os/virtual_space/main/org.bayrell.virtual_space.xml</xml>
	<yaml>
		<services>
			<_var_app_name_>
				<image>docker.io/bayrell/virtual_space:0.4.3</image>
				<hostname>{{.Service.Name}}.{{.Task.ID}}.local</hostname>
				<volumes>_var_app_name_:/data</volumes>
			</_var_app_name_>
		</services>
	<volumes>
		<_var_app_name_ />
	</volumes>
	</yaml>
	<variables>
		<variable>
			<name>_var_app_name_</name>
			<label>App name</label>
			<type>string</type>
		</variable>
	</variables>
	<modificators>
		<li>org.bayrell.modificator.cloud_os</li>
		<li>org.bayrell.modificator.deploy_hostname</li>
	</modificators>
	<patch>
		<name>Template patch</name>
		<operations>
		</operations>
	</patch>
</template>',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (1,	1);
INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (1,	2);
INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (1,	3);
INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (2,	1);
INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (2,	2);
INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (2,	3);

-- 