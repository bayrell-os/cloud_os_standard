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

namespace App\Models;

use TinyORM\Model;
use TinyPHP\Utils;


class DockerService extends Model
{
	/**
	 * Return table name
	 */
	static function getTableName()
	{
		return "docker_services";
	}
	
	
	
	/**
	 * Return list of primary keys
	 */
	static function pk()
	{
		return ["service_id"];
	}
	
	
	
	/**
	 * Returns tables fields
	 */
	static function fields()
	{
		return
		[
			"service_id" => [],
			"stack_name" => [],
			"service_name" => [],
			"software_api_name" => [],
			"have_admin_page" => [],
			"admin_port" => [],
			"admin_route" => [],
			"admin_custom_nginx" => [],
			"enable" => [],
			"is_deleted" => [],
			"data" => [],
			"docker_name" => [],
			"docker_image" => [],
			"docker_content" => [],
			"docker_json" => [],
			"docker_tasks" => [],
			"docker_balancer" => [],
			"timestamp" => [],
			"gmtime_created" => [],
			"gmtime_updated" => [],
		];
	}
	
	
	
	/**
	 * Return if auto increment
	 */
	static function isAutoIncrement()
	{
		return true;
	}
	
	
	
	/**
	 * Returns true if need to update timestamp
	 */
	static function updateTimestamp()
	{
		return true;
	}
	
	
	
	/**
	 * Returns ip addresses
	 */
	function getIpAddresses($network_name)
	{
		$ip_res = [];
		$service_name = $this->docker_name;
		$docker_balancer = json_decode($this->docker_balancer, true);
		$tasks = Utils::attr($docker_balancer, "Tasks");
		
		if (gettype($tasks) == "array")
		{
			foreach ($tasks as $task)
			{
				$state = Utils::attr($task, ["Status", "State"], "");
				$networks = Utils::attr($task, ["Networks"], null);
				$desired_state = Utils::attr($task, ["DesiredState"], "");
				if ($desired_state == "running" and $state == "running")
				{
					if ($networks != null && gettype($networks) == "array")
					{
						foreach ($networks as $network)
						{
							if (
								isset($network["Name"]) && isset($network["Addresses"]) &&
								gettype($network["Addresses"]) == "array" &&
								$network["Name"] == $network_name
							)
							{
								$addresses = $network["Addresses"];
								foreach ($addresses as $ip)
								{
									$arr = explode("/", $ip);
									$ip_res[] = $arr[0];
								}
							}
						}
					}
				}
			}
		}
		
		return $ip_res;
	}
}