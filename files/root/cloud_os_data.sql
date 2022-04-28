-- Add Cloud OS modificator

INSERT INTO "modificators" ("id", "uid", "name", "version", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (1,	'org.bayrell.modificator.cloud_os', 'Cloud OS',	'1.0',	'<?xml version="1.1" encoding="UTF-8" ?>
<patch>
  <uid>org.bayrell.modificator.cloud_os</uid>
	<name>Cloud OS</name>
  <version>1.0</version>
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
			<path>/template/yaml/services/_var_app_name_</path>
      <notExists>/template/yaml/services/_var_app_name_/environment</notExists>
      <value>
        <environment></environment>
      </value>
		</operation>
    
		<operation type="add">
			<path>/template/yaml/services/_var_app_name_</path>
      <notExists>/template/yaml/services/_var_app_name_/logging</notExists>
			<value>
				<logging>
					<driver>journald</driver>
				</logging>
			</value>
		</operation>
		
		<operation type="add">
			<path>/template/yaml/services/_var_app_name_</path>
      <notExists>/template/yaml/services/_var_app_name_/deploy</notExists>
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
			<path>/template/yaml/services/_var_app_name_</path>
      <notExists>/template/yaml/services/_var_app_name_/networks</notExists>
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
      <path>/template/yaml/services/_var_app_name_/environment</path>
      <value>
        <DOCKER>1</DOCKER>
        <NODE_ID>{{.Node.ID}}</NODE_ID>
        <TASK_ID>{{.Task.ID}}</TASK_ID>
        <SERVICE_ID>{{.Service.ID}}</SERVICE_ID>
      </value>
    </operation>
    
    <!-- Patch last -->
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_app_name_/volumes</path>
      <name>type</name>
      <value>array</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_app_name_/env_file</path>
      <name>type</name>
      <value>array</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_app_name_/ports</path>
      <name>type</name>
      <value>array</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_app_name_/environment</path>
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
			<path>/template/yaml/services/_var_app_name_/ports/target</path>
      <name>type</name>
      <value>int</value>
		</operation>
    
    <operation type="addAttribute" priority="1000">
			<path>/template/yaml/services/_var_app_name_/ports/published</path>
      <name>type</name>
      <value>int</value>
		</operation>
    
	</operations>
</patch>',	-1000,	'%GMTIME%',	'%GMTIME%');



-- Add cloud key

INSERT INTO "modificators" ("id", "uid", "name", "version", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (2,	'org.bayrell.modificator.cloud_key', 'Add cloud key',	'1.0',	'<?xml version="1.1" encoding="UTF-8" ?>
<patch>
  <uid>org.bayrell.modificator.cloud_key</uid>
	<name>Add cloud key</name>
  <version>1.0</version>
	<operations>
    
    <operation type="add">
      <path>/template/yaml/services/_var_app_name_/environment</path>
      <value>
        <CLOUD_OS_KEY>%CLOUD_OS_KEY%</CLOUD_OS_KEY>
        <CLOUD_OS_GATEWAY>%CLOUD_OS_GATEWAY%</CLOUD_OS_GATEWAY>
      </value>
    </operation>
    
	</operations>
</patch>',	'0',	'%GMTIME%',	'%GMTIME%');



-- Add Deploy hostname modificator

INSERT INTO "modificators" ("id", "uid", "name", "version", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (3, 'org.bayrell.modificator.deploy_hostname',	'Deploy hostname',	'1.0',	'<?xml version="1.1" encoding="UTF-8" ?>
<patch>
  <uid>org.bayrell.modificator.deploy_hostname</uid>
	<name>Deploy hostname</name>
  <version>1.0</version>
	<operations>
    
    <operation type="remove">
      <path>/template/yaml/services/_var_app_name_/deploy/placement</path>
    </operation>
    
		<operation type="add">
			<path>/template/yaml/services/_var_app_name_/deploy</path>
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


-- Add Volume /data modificator

INSERT INTO "modificators" ("id", "uid", "name", "version", "content", "priority", "gmtime_created", "gmtime_updated") VALUES (3,	'org.bayrell.modificator.volume_data', 'Volume /data',	'1.0', '<?xml version="1.1" encoding="UTF-8" ?>
<patch>
  <uid>org.bayrell.modificator.volume_data</uid>
	<name>Volume /data</name>
  <version>1.0</version>
	<operations>
    
		<operation type="add">
			<path>/template/yaml/services/_var_app_name_</path>
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
</patch>',	'0',	'%GMTIME%',	'%GMTIME%');


-- Add Cloud OS load balancer

INSERT INTO "templates" ("id", "uid", "name", "gmtime_created", "gmtime_updated") VALUES (1,	'org.bayrell.load_balancer',	'Cloud OS load balancer',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "templates_versions" ("id", "template_id", "version", "content", "gmtime_created", "gmtime_updated") VALUES (1,	1,	'0.4.0',	'<?xml version="1.1" encoding="UTF-8" ?>
<template>
	<uid>org.bayrell.load_balancer</uid>
	<name>Cloud OS load balancer</name>
	<version>0.4.0</version>
	<maintainer>Ildar &lt;ildar@bayrell.org&gt;</maintainer>
	<marketplace>https://cloud_os.bayrell.org/</marketplace>
	<link name="Main site">https://cloud_os.bayrell.org/</link>
	<license>Apache-2.0 License</license>
	<yaml>
		<services>
			<_var_app_name_>
				<image>docker.io/bayrell/load_balancer_http:0.4.0</image>
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
				<env_file>./env.conf</env_file>
			</_var_app_name_>
		</services>
		<volumes>
			<_var_app_name__data />
		</volumes>
	</yaml>
  <variables>
		<variable>
			<name>_var_app_name_</name>
      <label>App name</label>
			<type>string</type>
		</variable>
	</variables>
</template>',	'%GMTIME%',	'%GMTIME%');


-- Add Cloud OS load balancer app

INSERT INTO "applications" ("stack_name", "name", "template_version_id",
"status", "gmtime_created", "gmtime_updated") 
VALUES ('cloud_os',	'load_balancer', 1,	'0',	'%GMTIME%',	'%GMTIME%');


-- Add Cloud OS Modificators

INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (1,	1);
INSERT INTO "app_modificators" ("app_id", "modificator_id") VALUES (1,	3);

-- 
