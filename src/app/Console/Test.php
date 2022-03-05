<?php

/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

namespace App\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Yaml;
use App\Template;


class Test extends Command
{
    protected static $defaultName = 'app:test';

    protected function configure(): void
    {
        $this
			// the short description
			->setDescription('Test')

			// the full command description shown when running the command with
			// the "--help" option
			->setHelp('Test')
		;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
	{
		$template = '<?xml version="1.0" encoding="UTF-8" ?>
		<template>
			<name>WordPress</name>
			<marketplace>http://example.com/shop/wordpress</marketplace>
			<hub>docker.io/bayrell/alpine_wordpress</hub>
			<yaml>
				<services>
					<_var_service_name_>
						<image>bayrell/alpine_wordpress:5.7.2-2-amd64</image>
						<hostname>{{.Service.Name}}.{{.Task.ID}}.local</hostname>
						<environment>
							<WWW_UID>1000</WWW_UID>
							<WWW_GID>1000</WWW_GID>
						</environment>
					</_var_service_name_>
				</services>
			</yaml>
			<variables>
				<variable>
					<name>_var_service_name_</name>
					<type>string</type>
				</variable>
			</variables>
		</template>';
		
		
		$patch = '<?xml version="1.0" encoding="UTF-8" ?>
		<patch>
			<name>Deploy hostname</name>
			<operations>
				<operation type="add">
					<path>/template/yaml/services/_var_service_name_</path>
					<value>
						<deploy>
							<replicas>1</replicas>
							<endpoint_mode>dnsrr</endpoint_mode>
							<update_config>
								<parallelism>1</parallelism>
								<failure_action>rollback</failure_action>
								<delay>5s</delay>
							</update_config>
							<restart_policy>
								<condition>on-failure</condition>
								<delay>10s</delay>
								<window>120s</window>
							</restart_policy>
							<placement>
								<constraints>node.hostname == _var_hostname_</constraints>
							</placement>
						</deploy>
					</value>
				</operation>
				
				<operation type="add">
					<path>/template/variables</path>
					<value>
						<varibale>
							<name>_var_hostname_</name>
							<type>string</type>
						</varibale>
					</value>
				</operation>
				
				<operation type="add">
					<path>/template/yaml/services/_var_service_name_</path>
					<value>
						<networks>cloud_backend</networks>
					</value>
				</operation>
				
				<operation type="add">
					<path>/template/networks</path>
					<value>
						<cloud_backend>
							<external>true</external>
						</cloud_backend>
					</value>
				</operation>
				
				<operation type="add">
					<path>/template/yaml/services/_var_service_name_</path>
					<value>
						<logging>
							<driver>journald</driver>
						</logging>
					</value>
				</operation>
				
			</operations>
		</patch>';
		
		$xml = Template::loadXml($template);
		Template::patch($xml, $patch);
		
		var_dump(Template::saveXml($xml));
		
		$data = json_decode(json_encode($xml), true);
		
		$yaml = Yaml::dump($data["yaml"], 5);
		var_dump($yaml);
		
		$yaml = Yaml::dump($data["variables"], 5);
		var_dump($yaml);
		
        return Command::SUCCESS;
    }
}