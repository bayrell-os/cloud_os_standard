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
	 * Update service into database
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
		$item->docker_tasks = json_encode($tasks);
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
		$sql = "update " . $service->getTable() .
			" set `is_deleted`=1, `enable`=0 where `timestamp` != :timestamp";
		$db::update($db::raw($sql), [ "timestamp" => $timestamp ]);
		
		/* Delete old services */
		$sql = "delete from " . $service->getTable() .
			" where `is_deleted` = 1 and `timestamp` < :timestamp";
		$db::update($db::raw($sql), [ "timestamp" => $timestamp - 24*60*60 ]);
	}
}