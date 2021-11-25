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

namespace App;

use TinyPHP\Utils;
use App\Models\ApplicationFile;
use App\Models\Domain;
use App\Models\NginxFile;
use App\Models\Route;
use App\Models\Service;


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
	public function removeService($service_name)
	{
		$url_api = "/services/" . $service_name;
		$content = static::dockerApi($url_api, "DELETE");
		return $content;
	}
	
	
	
	/**
	 * Returns balancer data
	 */
	public function getBalancerData($service, $service_tasks, $nodes)
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
	public function updateServices($output = null)
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
	public function updateServiceIntoDatabase($service, $params)
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
		$item = Service::firstOrNew(['docker_name' => $service_name]);
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
	public function deleteOldServicesFromDatabase($timestamp)
	{
		$db = app("db");
		$service = new Service();
		
		/* Set is deleted */
		/*
		Service::query()
			->where('timestamp', '!=', $timestamp)
			->update([
				"enable" => 0,
				"is_deleted" => 1,
			])
		;
		*/
		$sql = "update " . $service->getTable() .
			" set `is_deleted`=1, `enable`=0 where `timestamp` != :timestamp";
		$db::update($db::raw($sql), [ "timestamp" => $timestamp ]);
		
		/* Delete */
		/*
		Service::query()
			->where('is_deleted', 1)
			->where('timestamp', '<', $timestamp - 24*60*60)
			->delete()
		;
		*/
		/* Delete old services */
		$sql = "delete from " . $service->getTable() .
			" where `is_deleted` = 1 and `timestamp` < :timestamp";
		$db::update($db::raw($sql), [ "timestamp" => $timestamp - 24*60*60 ]);
	}
	
	
	
	/**
	 * Update upstreams
	 */
	static function updateUpstreams($network_name)
	{
		$services = Service::query()
			->where("enable", "=", "1")
			->where("is_deleted", "=", "0")
			->where("docker_name", "!=", "")
			->orderBy("docker_name", "asc")
			->get()
		;
		
		$routes = Route::query()
			->where("enable", "=", 1)
			->where("protocol", "=", "http")
			->orderBy("route", "desc")
			->get()
		;
		
		$upstreams = [];
		foreach ($services as $service)
		{
			$ip_arr = $service->getIpAddresses($network_name);
			$docker_name = $service["docker_name"];
			$service_routes = array_filter
			(
				$routes->toArray(),
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
						$upstream_s .= "\tserver " . $ip . ":" . $route["target_port"] . ";\n";
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
		$domains = Domain::query()
			->get()
			->toArray()
		;
		
		foreach ($domains as $domain)
		{
			$routes = Route::query()
				->where("enable", "=", 1)
				->where("protocol", "=", "http")
				->where("domain_name", "=", $domain["domain_name"])
				->orderBy("route", "desc")
				->get()
			;
			
			$nginx_routes = [];
			foreach ($routes as $route)
			{
				$nginx_route = "";
				$upstream_name = $route["target_port"] . "." . $route["docker_name"]
					. ".cloud_network.example";
				
				$protocol_data = json_decode($route["protocol_data"]);
				$has_websocket = isset($protocol_data["websocket"]) ?
					$protocol_data["websocket"] : false;
					
				$domain_route_url = $route["route"];
				$domain_route_prefix = $route["route_prefix"];
				if ($domain_route_url == "") $domain_route_url = "/";
				if ($domain_route_prefix == "/") $domain_route_prefix = "";
				
				$nginx_route .= "\tlocation " . $domain_route_url . " {\n";
				$nginx_route .= "\t\tproxy_pass http://" . $upstream_name .
					$domain_route_prefix . ";\n";
				$nginx_route .= "\t\tinclude proxy_params;\n";
				
				/* Add websocket settings */
				if ($has_websocket)
				{
					$nginx_route .= "proxy_http_version 1.1;";
					$nginx_route .= "proxy_set_header Upgrade $http_upgrade;";
					$nginx_route .= "proxy_set_header Connection \"upgrade\";";
				}
				
				/* Add route prefix */
				if ($domain_route_prefix != "")
				{
					$nginx_route .= "\t\tproxy_set_header X-ROUTE-PREFIX \"" .
						$domain_route_prefix . "\";\n";
				}
				
				/* Add space id */
				if ($domain["space_id"] != "")
				{
					$nginx_route .= "\t\tproxy_set_header X-SPACE-ID \"" .
						$domain["space_id"] . "\";\n";
				}
				
				/* Add layer uid */
				if ($route["layer_uid"] != "")
				{
					$nginx_route .= "\t\tproxy_set_header X-LAYER-UID \"" .
						$route["layer_uid"] . "\";\n";
				}
				
				$nginx_route .= "\t}";
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
	function compose($app_file_id)
	{
		$result = null;
		
		/* Save all files */
		$applications = ApplicationFile::query()->get()->toArray();
		foreach ($applications as $row)
		{
			$row_file_name = $row["file_name"];
			$row_content = $row["content"];
			$file_path = "/data/yaml/app/" . $row_file_name;
			$file_dirname = dirname($file_path);
			@mkdir($file_dirname, 0755, true);
			file_put_contents($file_path, $row_content);
		}
		
		/* Compose */
		$item = ApplicationFile::find($app_file_id);
		if ($item)
		{
			$yaml_file_path = "/data/yaml/app/" . $item["file_name"];
			$cmd = "sudo docker stack deploy -c " . $yaml_file_path . " app --with-registry-auth";
			$result = Docker::exec($cmd . " 2>&1");
		}
		
		return $result;
	}
}