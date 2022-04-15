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

namespace App\Api;

use App\Docker;
use App\Models\Domain;
use App\Models\DockerService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Exception\MethodNotAllowedException;
use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class ServicesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = DockerService::class;
	var $api_name = "services";
	
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
		
		/* Stop service */
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/stop/{id}/",
			"name" => "api:" . $this->api_name . ":stop",
			"method" => [$this, "actionStop"],
		]);
		
	}
	
	
	
	/**
	 * Get rules
	 */
	function getRules()
	{
		return
		[
			new AllowFields
			([
				"fields" =>
				[
					"service_id",
					"stack_name",
					"service_name",
					"software_api_name",
					"enable",
					"docker_name",
					"docker_image",
					"docker_json",
					"docker_balancer",
					"docker_tasks",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"service_id"]),
			new ReadOnly(["api_name"=>"gmtime_created"]),
			new ReadOnly(["api_name"=>"gmtime_updated"]),
			new ReadOnly(["api_name"=>"docker_json"]),
			new ReadOnly(["api_name"=>"docker_balancer"]),
			new ReadOnly(["api_name"=>"docker_tasks"]),
			new JsonField([ "api_name" => "docker_json" ]),
			new JsonField([ "api_name" => "docker_balancer" ]),
			new JsonField([ "api_name" => "docker_tasks" ]),
		];
	}
	
	
	
	/**
	 * Find query
	 */
	public function buildSearchQuery($action, $query)
	{
		return $query
			->addFilter("is_deleted", "=", "0")
			->orderBy("docker_name", "asc")
		;
	}
	
	
	/**
	 * Before query
	 */
	public function initSearch()
	{
		parent::initSearch();
		
		$refresh = $this->container->request->query->get("refresh");
		if ($refresh == "1")
		{
			Docker::updateServices();
		}
	}
	
	
	
	/**
	 * After query
	 */
	public function buildResponse($action)
	{
		parent::buildResponse($action);
		
		if ($action == "actionSearch")
		{
			$items = $this->api_result->result["items"];
			foreach ($items as $key => $item)
			{
				if (isset($item["docker_tasks"]) && $item["docker_tasks"] != null)
				{
					$this->api_result->result["items"][$key]["docker_tasks"] = array_map
					(
						function($task)
						{
							$UpdatedAt = substr($task["UpdatedAt"], 0, 19) . "Z";
							$task["UpdatedTimestamp"] = strtotime($UpdatedAt);
							$task["Updated"] = date("Y-m-d H:i:s", $task["UpdatedTimestamp"]);
							return $task;
						},
						$this->api_result->result["items"][$key]["docker_tasks"]
					);
					
					usort
					(
						$this->api_result->result["items"][$key]["docker_tasks"],
						function($task1, $task2)
						{
							$task1_time = $task1["UpdatedTimestamp"];
							$task2_time = $task2["UpdatedTimestamp"];
							$res = ($task1_time > $task2_time) ? -1 : 1;
							return $res;
						}
					);
				}
			}
		}
	}
	
	
	
	/**
	 * Action stop
	 */
	function actionStop()
	{
		/* Find item */
		$this->findItem();
		
		/* Stop service */
		$result = Docker::removeService($this->item->docker_name);
		
		/* Set enable = 0 */
		$this->item->enable = 0;
		$this->item->is_deleted = true;
		$this->item->timestamp = time();
		$this->item->save();
		$this->item->refresh();
		
		/* From database */
		$this->new_data = $this->item->toArray();
		$old_data = $this->fromDatabase($this->old_data);
		$new_data = $this->fromDatabase($this->new_data);
		
		/* Set result */
		$this->api_result->success
		(
			[
				"old_data"=>$new_data,
				"new_data"=>$new_data
			],
			"Ok"
		);
		$this->buildResponse("actionStop");
	}
	
	
	
	/**
	 * Create action
	 */
	function actionCreate(RenderContainer $container)
	{
		throw new MethodNotAllowedException();
	}
	
	
	
	/**
	 * Edit action
	 */
	function actionEdit(RenderContainer $container)
	{
		throw new MethodNotAllowedException();
	}
	
	
	
	/**
	 * Delete action
	 */
	function actionDelete(RenderContainer $container)
	{
		throw new MethodNotAllowedException();
	}
}
