<?php

/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
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

namespace App;

use TinyPHP\Utils;
use App\Models\Application;
use App\Models\DockerService;
use App\Models\DockerYamlFile;
use App\Models\Domain;
use App\Models\NginxFile;
use App\Models\Route;
use App\Models\User;
use App\Models\UserAuth;
use App\Models\UserGroup;
use App\Models\UsersInGroups;


class Docker
{
    /**
	 * Send docker command
	 */
	static function dockerApi($url, $m="GET", $post=null)
	{
		$content = "";
		$cmd = "sudo /usr/bin/curl -s -X " . $m . " -H 'Content-Type: application/json' ";
		if ($post != null)
		{
			$cmd .= "-d '" . $post . "' ";
		}
		$cmd .= "--unix-socket /var/run/docker.sock http:/v1.39" . $url;
		$cmd .= " 2>/dev/null";
		$content = @shell_exec($cmd);
		return $content;
	}
    
	
    
	/**
	 * Send docker command
	 */
	static function exec($cmd)
	{
		$content = "";
		$content = @shell_exec($cmd);
		return $content;
	}
    
    
	
    /**
	 * Get all services from docker
	 */
	static function getServices()
	{
		$url_api = "/services";
		$content = static::dockerApi($url_api);
		return json_decode($content, true);
	}
    
    
	
	/**
	 * Get service from docker
	 */
	static function getService($service_id)
	{
		$url_api = "/services/" . $service_id;
		$content = static::dockerApi($url_api);
		return json_decode($content, true);
	}
	
	
	
	/**
	 * Get service tasks
	 */
	static function getServiceTasks($service_name)
	{
		$url_api = "/tasks?filters=" . urlencode('{"service":{"' . $service_name . '":true}}');
		$content = static::dockerApi($url_api);
		$tasks = json_decode($content, true);
		
		usort($tasks, function($a, $b){
			$time_a = strtotime(Utils::attr($a, ["Status", "Timestamp"]));
			$time_b = strtotime(Utils::attr($b, ["Status", "Timestamp"]));
			return $time_b - $time_a;
		});
		
		return $tasks;
	}
	
	
	
	/**
	 * Get nodes
	 */
	static function getNodes()
	{
		/* Get nodes */
		$content = static::dockerApi("/nodes");
		$nodes = json_decode($content, true);
		$res = [];
		foreach ($nodes as $node)
		{
			$res[$node["ID"]] = $node;
		}
		return $res;
	}
	
	
	
	/**
	 * Stop services
	 */
	public static function removeService($service_name)
	{
		$url_api = "/services/" . $service_name;
		$content = static::dockerApi($url_api, "DELETE");
		
		/* Update admin domain */
		// static::setOption("update_admin_domain", 1);
		
		return $content;
	}
	
	
	
	/**
	 * Returns balancer data
	 */
	public static function getBalancerData($service, $service_tasks, $nodes)
	{
		$res =
		[
			"State" =>
			[
				"Work" => 0,
				"Total" => 0,
			],
			"Tasks" => [],
		];
		
		$Tasks = [];
		$total = Utils::attr($service, ["Spec", "Mode", "Replicated", "Replicas"]);
		$work = 0;
		
		foreach ($service_tasks as $task)
		{
			$state = Utils::attr($task, ["Status", "State"]);
			$desired_state = Utils::attr($task, ["DesiredState"]);
			$node_id = $task["NodeID"];
			
			$node = $nodes[$node_id];
			$service =
			[
				"ID" => $task["ID"],
				"Status" => $task["Status"],
				"DesiredState" => $task["DesiredState"],
				"Slot" => $task["Slot"],
				"Node" => [
					"ID" => $task["NodeID"],
					"Hostname" => $node["Description"]["Hostname"],
					"Status" => $node["Status"],
				],
				"Networks" => [],
			];
			$NetworksAttachments = $task["NetworksAttachments"];
			if ($NetworksAttachments != null)
			{
				foreach ($NetworksAttachments as $network)
				{
					$service["Networks"][] =
					[
						"ID" => $network["Network"]["ID"],
						"Name" => $network["Network"]["Spec"]["Name"],
						"Addresses" => $network["Addresses"],
					];
				}
			}
			$Tasks[] = $service;
			
			if ($state == "running" && $desired_state == "running")
			{
				$work++;
			}
		}
		
		$res["State"]["Work"] = $work;
		$res["State"]["Total"] = $total;
		$res["Tasks"] = $Tasks;
		
		return $res;
	}
	
	
	
	/**
	 * Update services
	 */
	public static function updateServices($output = null)
	{
		$current_timestamp = time();
		$nodes = Docker::getNodes();
		$services = Docker::getServices();
		
		foreach ($services as $service)
		{
			$result = Docker::updateServiceIntoDatabase
			(
				$service,
				["nodes" => $nodes, "current_timestamp" => $current_timestamp]
			);
			
			if ($result)
			{
				$service_name = Utils::attr($service, ["Spec", "Name"]);
				if ($output)
				{
					$output->writeln("Update service " . $service_name);
				}
			}
		}
		
		Docker::deleteOldServicesFromDatabase($current_timestamp);
	}
	
	
	
	/**
	 * Update service into database by json from docker api
	 */
	public static function updateServiceIntoDatabase($service, $params)
	{
		$nodes = isset($params["nodes"]) ? $params["nodes"] : null;
		$service_tasks = isset($params["service_tasks"]) ? $params["service_tasks"] : null;
		$current_timestamp = isset($params["current_timestamp"]) ?
			$params["current_timestamp"] : time();
		
		$service_id = Utils::attr($service, "ID");
		$service_name = Utils::attr($service, ["Spec", "Name"]);
		$stack_name = Utils::attr($service, ["Spec", "Labels", "com.docker.stack.namespace"]);
		$service_image = Utils::attr($service, ["Spec", "TaskTemplate", "ContainerSpec", "Image"]);
		$service_short_name = substr($service_name, strlen($stack_name) + 1);
			
		if ($nodes == null) $nodes = static::getNodes();
		if ($service_tasks == null) $service_tasks = static::getServiceTasks($service_name);
		$balancer_data = Docker::getBalancerData($service, $service_tasks, $nodes);
		
		/* Update service */
		$item = DockerService::selectQuery()
			->where([
				['docker_name', '=', $service_name]
			])
			->one()
		;
		
		if (!$item) $item = new DockerService();
		
		$item->docker_name = $service_name;
		$item->stack_name = $stack_name;
		$item->service_name = $service_short_name;
		$item->docker_image = $service_image;
		$item->is_deleted = 0;
		$item->enable = 1;
		$item->timestamp = $current_timestamp;
		$item->docker_json = json_encode($service);
		$item->docker_tasks = json_encode($service_tasks);
		$item->docker_balancer = json_encode($balancer_data);
		
		/* Save service */
		if ($item->isDirty())
		{
			$item->save();
			return true;
		}
		
		return false;
	}
	
	
	
	/**
	 * Delete old services from database
	 */
	public static function deleteOldServicesFromDatabase($timestamp)
	{
		$db = app("db");
		$service = new DockerService();
		
		/* Set is deleted */
		$cursor = DockerService::updateQuery()
			->values([
				"enable" => 0,
				"is_deleted" => 1,
			])
			->where([
				['is_deleted', '=', 0],
				['timestamp', '!=', $timestamp],
			])
			->query()
		;
		
		$rows = $cursor->rowCount();
		if ($rows > 0)
		{
			// static::setOption("update_admin_domain", 1);
		}
		
		$cursor->close();
		
		/* Delete */
		DockerService::deleteQuery()
			->where([
				['is_deleted', '=', 1],
				['timestamp', '<', $timestamp - 24*60*60],
			])
			->execute()
		;
	}
	
	
	
	/**
	 * Update admin page
	 */
	static function updateAdminUpstreams()
	{
		$network_name = "cloud_network";
		
		$services = DockerService::selectQuery()
			->where([
				'enable' => 1,
				'is_deleted' => 0,
			])
			->all()
		;
		
		$services_admin_page = [];
		$upstreams = [];
		
		foreach ($services as $service)
		{
			$ip_arr = $service->getIpAddresses($network_name);
			
			$app = Application::selectQuery()
				->where([
					"stack_name" => $service->stack_name,
					"name" => $service->service_name,
				])
				->one()
			;
			
			if ($app)
			{
				$xml = $app->getContentXML();
				if ($xml && $xml->admin->nginx && $xml->admin->nginx->getName() == "nginx")
				{
					$app->updateVariables($xml);
					
					/* Get nginx content of the service */
					$nginx_content = $xml->admin->nginx->getValue();
					$nginx_content = $app->patchVariables($nginx_content);
					
					$services_admin_page[] = "# Service " . $service->docker_name;
					$services_admin_page[] = $nginx_content;
					
					/* Build upstream */
					$target_port = $xml->admin->port->getValue();
					$upstream_name = $target_port . "." .
						$service->docker_name . "." . $network_name . ".example"
					;
					
					/* Add ip to upstream */
					$upstream_content = "upstream " . $upstream_name . " {\n";
					foreach ($ip_arr as $ip)
					{
						$upstream_content .= "  server " . $ip . ":" . $target_port . ";\n";
					}
					$upstream_content .= "}\n";
					
					$upstreams[] = $upstream_content;
				}
			}
		}
		
		/* Save nginx content */
		$services_admin_page_content = implode("\n", $services_admin_page);
		$res1 = static::updateLocalFile
		(
			"/etc/nginx/inc/services_admin_page.inc",
			$services_admin_page_content
		);
		
		/* Save upstreams */
		$upstreams = implode("\n", $upstreams);
		$res2 = static::updateLocalFile
		(
			"/etc/nginx/conf.d/99-admin-upstreams.conf",
			$upstreams
		);
		
		return $res1 || $res2;
	}
	
	
	
	/**
	 * Update upstreams
	 */
	static function updateUpstreams($network_name)
	{
		$services = DockerService::selectQuery()
			->where([
				["enable", "=", "1"],
				["is_deleted", "=", "0"],
				["docker_name", "!=", ""],
			])
			->orderBy("docker_name", "asc")
			->all()
		;
		
		$routes = Route::selectQuery()
			->where([
				["enable", "=", 1],
				["protocol", "=", "http"],
			])
			->orderBy("route_prefix", "desc")
			->all()
		;
		
		$upstreams = [];
		foreach ($services as $service)
		{
			$ip_arr = $service->getIpAddresses($network_name);
			$docker_name = $service["docker_name"];
			$service_routes = array_filter
			(
				$routes,
				function($route) use ($docker_name)
				{
					return $route["docker_name"] == $docker_name;
				}
			);
			
			$upstream_s = "";
			$upstream_names = [];
			foreach ($service_routes as $route)
			{
				$upstream_name = $route["target_port"] . "." . $docker_name . "." . $network_name . ".example";
				if (!in_array($upstream_name, $upstream_names) && count($ip_arr) > 0)
				{
					$upstream_s .= "upstream " . $upstream_name . " {\n";
					foreach ($ip_arr as $ip)
					{
						$upstream_s .= "  server " . $ip . ":" . $route["target_port"] . ";\n";
					}
					$upstream_s .= "}\n";
					$upstream_names[] = $upstream_name;
				}
			}
			
			$upstreams[] = $upstream_s;
		}
		
		/* Clear empty upstreams */
		$upstreams = array_filter
		(
			$upstreams,
			function($item)
			{
				return $item != "";
			}
		);
		
		$file_name = "/conf.d/99-" . $network_name . "-upstreams.conf";
		$content = implode("", $upstreams);
		NginxFile::updateFile($file_name, $content);
	}
	
	
	
	/**
	 * Update domains
	 */
	static function updateDomains()
	{
		$domains = Domain::selectQuery()
			->fields(["t.*", "s.uid as space_uid"])
			->leftJoin("spaces", "s", "s.id = t.space_id")
			->all()
		;
		
		foreach ($domains as $domain)
		{
			$enable_auth = $domain["enable_auth"];
			$domain_name = $domain["domain_name"];
			
			$routes = Route::selectQuery()
				->where([
					["enable", "=", 1],
					["protocol", "=", "http"],
					["domain_name", "=", $domain_name],
				])
				->orderBy("route_prefix", "desc")
				->all()
			;
			
			$has_root_route = false;
			
			$nginx_routes = [];
			foreach ($routes as $route)
			{
				$nginx_route = "";
				$upstream_name = $route["target_port"] . "." . $route["docker_name"]
					. ".cloud_network.example";
				
				$protocol_data = json_decode($route["protocol_data"], true);
				$has_websocket = isset($protocol_data["websocket"]) ?
					$protocol_data["websocket"] : false;
					
				$domain_route_prefix = $route["route_prefix"];
				$domain_target_prefix = $route["target_prefix"];
				if ($domain_route_prefix == "") $domain_route_prefix = "/";
				if ($domain_target_prefix == "/") $domain_target_prefix = "";
				
				if ($domain_route_prefix == "/")
				{
					$has_root_route = true;
				}
				
				$nginx_route .= "location " . $domain_route_prefix . " {\n";
					
				/* Enable auth */
				if ($enable_auth)
				{
					$nginx_route .= "    include inc/auth_basic.inc;\n";
				}
				
				/* Proxy params */
				$nginx_route .= "    proxy_pass http://" . $upstream_name .
					$domain_target_prefix . ";\n";
				$nginx_route .= "    include proxy_params;\n";
				
				/* Add websocket settings */
				if ($has_websocket)
				{
					$nginx_route .= "    proxy_http_version 1.1;\n";
					$nginx_route .= "    proxy_set_header Upgrade \$http_upgrade;\n";
					$nginx_route .= "    proxy_set_header Connection \"upgrade\";\n";
				}
				
				/* Add route prefix */
				$nginx_route .= "    proxy_set_header X-FORWARDED-PREFIX \"" .
					$domain_target_prefix . "\";\n";
				
				/* Add space id */
				if ($domain["space_uid"] != "")
				{
					$nginx_route .= "    proxy_set_header X-SPACE-UID \"" .
						$domain["space_uid"] . "\";\n";
				}
				else
				{
					$nginx_route .= "    proxy_set_header X-SPACE-UID \"0\";\n";
				}
				
				/* Add nginx_config */
				$nginx_config = trim($route["nginx_config"]);
				if ($nginx_config != "")
				{
					$nginx_config = explode("\n", $nginx_config);
					$nginx_config = array_map(function($s){
						return "    " . $s;
					}, $nginx_config);
					$nginx_config = implode("\n", $nginx_config);
					$nginx_route .= $nginx_config . "\n";
				}
				
				$nginx_route .= "  }";
				$nginx_routes[] = $nginx_route;
			}
			
			/* Create nginx files */
			$nginx_content = $domain["nginx_template"];
			$nginx_content = str_replace("%DOMAIN_NAME%", $domain["domain_name"], $nginx_content);
			$nginx_content = str_replace("%ROUTES%", implode("\n", $nginx_routes), $nginx_content);
			$nginx_content = str_replace("%SSL%", "", $nginx_content);
			
			/* Update file */
			$file_name = "/domains/" . $domain["domain_name"] . ".conf";
			NginxFile::updateFile($file_name, $nginx_content);
		}
		
	}
	
	
	
	/**
	 * Compose file
	 */
	function composeYamlFile($yaml_file_id)
	{
		$result = "Yaml not found";
		
		/* Save all files */
		$applications = DockerYamlFile::selectQuery()->all();
		foreach ($applications as $row)
		{
			$row_file_name = $row["file_name"];
			$row_stack_name = $row["stack_name"];
			$row_content = $row["content"];
			$file_path = "/data/yaml/" . $row_stack_name . "/" . $row_file_name;
			$file_dirname = dirname($file_path);
			@mkdir($file_dirname, 0755, true);
			file_put_contents($file_path, $row_content);
		}
		
		/* Compose */
		$item = DockerYamlFile::getById($yaml_file_id);
		if ($item)
		{
			$yaml_file_path = "/data/yaml/" . $item["stack_name"] . "/" . $item["file_name"];
			$cmd = "sudo docker stack deploy -c " . $yaml_file_path . " " . $item["stack_name"] .
				" --with-registry-auth";
			$result = Docker::exec($cmd . " 2>&1");
		}
		
		/* Update admin domain */
		// static::setOption("update_admin_domain", 1);
		
		return $result;
	}
	
	
	
	/**
	 * Update htpasswd
	 */
	function update_htpasswd()
	{
		$items = User::selectQuery()
			->fields("u.login", "auth.value")
			->alias("u")
			->innerJoin(
				UserAuth::getTableName(),
				"auth",
				"auth.user_id=u.id"
			)
			->where("auth.method", "password")
			->where("u.banned", 0)
			->where("u.is_deleted", 0)
			->all();
		
		$htpasswd = "";
		foreach ($items as $item)
		{
			$htpasswd .= $item["login"] . ":" . $item["value"] . "\n";
		}
		
		NginxFile::updateFile("/inc/htpasswd.inc", $htpasswd);
	}
	
	
	
	/**
	 * Reload nginx
	 */
	public static function nginx_reload()
	{
		$s = shell_exec("/usr/sbin/nginx -s reload");
	}
	
	
	
	/**
	 * Get option
	 */
	public static function getOption($key, $def_value = null)
	{
		$option = make("db_query")
			->select()
			->from("options")
			->where([
				"key" => $key,
			])
			->one()
		;
		
		if (!$option) return $def_value;
		return $option["value"];
	}
	
	
	
	/**
	 * Save option
	 */
	public static function setOption($key, $value)
	{
		$option = make("db_query")
			->select()
			->from("options")
			->where([
				"key" => $key,
			])
			->one()
		;
		
		if (!$option)
		{
			make("db_query")
				->insert("options")
				->values([
					"key" => $key,
					"value" => $value,
				])
				->execute()
			;
		}
		else
		{
			make("db_query")
				->update("options")
				->where("key", $key)
				->values([
					"value" => $value,
				])
				->execute()
			;
		}
	}
	
	
	
	/**
	 * Update local file
	 */
	static function updateLocalFile($file, $new_content)
	{
		$old_content = "";
		$file_exists = file_exists($file);
		
		if ($file_exists)
		{
			$old_content = @file_get_contents($file);
		}
		
		if ($old_content != $new_content || !$file_exists)
		{
			file_put_contents($file, $new_content);
			return true;
		}
	
		return false;
	}
}