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
use App\Models\Application;
use App\Models\Modificator;
use App\Models\Template;
use App\Models\TemplateVersion;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\RouteContainer;
use TinyPHP\Utils;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\ReadOnly;


class ApplicationsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Application::class;
	var $api_name = "applications";

	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/{id}/modificator/add/",
			"name" => "api:" . $this->api_name . ":modificator:add",
			"method" => [$this, "actionModificatorAdd"],
		]);
		
		$route_container->addRoute([
			"methods" => [ "DELETE" ],
			"url" => "/api/" . $this->api_name . "/crud/item/{id}/modificator/delete/{mod_id}/",
			"name" => "api:" . $this->api_name . ":modificator:delete",
			"method" => [$this, "actionModificatorDelete"],
		]);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/{id}/compose/",
			"name" => "api:" . $this->api_name . ":compose",
			"method" => [$this, "actionCompose"],
		]);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/{id}/stop/",
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
			/* Allow fields */
			new AllowFields
			([
				"fields" =>
				[
					"id",
					"stack_name",
					"name",
					"service_name",
					"template_id",
					"template_name",
					"template_version",
					"template_version_id",
					"template_content",
					"modificators",
					"environments",
					"variables",
					"variables_defs",
					"volumes",
					"status",
					"yaml",
					"content",
					"custom_patch",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			
			
			/* Read only */
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "yaml" ]),
			new ReadOnly([ "api_name" => "content" ]),
			new ReadOnly([ "api_name" => "service_name" ]),
			new ReadOnly([ "api_name" => "template_id" ]),
			new ReadOnly([ "api_name" => "template_name" ]),
			new ReadOnly([ "api_name" => "template_version" ]),
			new ReadOnly([ "api_name" => "template_content" ]),
			new ReadOnly([ "api_name" => "variables_defs" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
			
			
			/* Templates */
			new Dictionary([
				"api_name" => "templates",
				"class_name" => Template::class,
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$query
						->orderBy("name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"uid",
					"name",
				],
			]),
			
			
			/* Templates versions */
			new Dictionary([
				"api_name" => "templates_versions",
				"class_name" => TemplateVersion::class,
				"actions" => [ "actionGetById" ],
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$template_id = $rule->route->item->template_id;
					$query
						->where("template_id", $template_id)
						->orderBy("version", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"version",
				],
			]),
			
			
			/* Modificators */
			new Dictionary([
				"api_name" => "modificators",
				"class_name" => Modificator::class,
				"actions" => [ "actionGetById" ],
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$app_id = $rule->route->item->id;
					$query
						->fields(["t.*"])
						->orderBy("t.name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"name",
					"content",
					"priority",
				],
			]),
			
			
			
			/* Modificators */
			new Dictionary([
				"api_name" => "modificators_item",
				"class_name" => Modificator::class,
				"actions" => [ "actionGetById" ],
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$app_id = $rule->route->item->id;
					$query
						->fields(["t.*"])
						->innerJoin
						(
							"app_modificators",
							"app_m",
							"app_m.modificator_id = t.id"
						)
						->where("app_m.app_id", $app_id)
						->orderBy("t.priority", "asc")
						->orderBy("t.name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"name",
					"priority",
				],
			]),
			
		];
	}
	
	
	
	/**
	 * Find query
	 */
	public function buildSearchQuery($action, $query)
	{
		return $query
			//->debug(true)
			->addField("t.stack_name || '_' || t.name as service_name")
			->addField("tv.version as template_version")
			->addField("tpl.id as template_id")
			->addField("tpl.name as template_name")
			->addField("tv.content as template_content")
			->leftJoin(TemplateVersion::getTableName(), "tv", "tv.id = t.template_version_id")
			->innerJoin(Template::getTableName(), "tpl", "tpl.id = tv.template_id")
			->orderBy("t.stack_name", "asc")
			->orderBy("t.name", "asc")
		;
	}
	
	
	
	/**
	 * Build search response
	 */
	function buildResponse($action)
	{
		/* Update yaml */
		if (in_array($action, ["actionCreate", "actionEdit"]))
		{
			$this->item->generateYamlContent();
			$this->new_data = $this->item->toArray();
		}
		
		/* Get by id */
		else if ($action == "actionGetById")
		{
			$this->item->updateVariables();
			//$this->item->updateModificators();
		}
		
		parent::buildResponse($action);
	}
	
	
	
	/**
	 * Modifictor add
	 */
	public function actionModificatorAdd()
	{
		/* Find app */
		$this->findItem();
		
		$app_id = $this->item->id;
		$modificator_id = $this->container->post("modificator_id");
		
		/* Find modificator */
		$row = make("db_query")
			->select()
			->from("app_modificators")
			->where([
				"app_id" => $app_id,
				"modificator_id" => $modificator_id,
			])
			->one()
		;
		
		if ($row)
		{
			throw new \Exception("Modificator already exists");
		}
		
		/* Insert modificator */
		$row = make("db_query")
			->insert()
			->table("app_modificators")
			->values([
				"app_id" => $app_id,
				"modificator_id" => $modificator_id,
			])
			->execute()
		;
		
		/* Update yaml */
		$this->item->generateYamlContent();
		
		/* Refresh item */
		$this->refreshItem();
		$this->new_data = $this->item->toArray();
		$new_data = $this->fromDatabase("actionModificatorAdd", $this->new_data);
		
		$this->api_result->success("Ok");
	}
	
	
	
	/**
	 * Modifictor delete
	 */
	public function actionModificatorDelete()
	{
		/* Find app */
		$this->findItem();
		
		$app_id = $this->container->arg("id");
		$modificator_id = $this->container->arg("mod_id");
		
		/* Delete modificator */
		$row = make("db_query")
			->delete()
			->table("app_modificators")
			->where([
				"app_id" => $app_id,
				"modificator_id" => $modificator_id,
			])
			->execute()
		;
		
		/* Update yaml */
		$this->item->generateYamlContent();
		
		/* Refresh item */
		$this->refreshItem();
		$this->new_data = $this->item->toArray();
		$new_data = $this->fromDatabase("actionModificatorDelete", $this->new_data);
		
		$this->api_result->success("Ok", ["item"=>$new_data]);
	}
	
	
	
	/**
	 * Compose
	 */
	public function actionCompose()
	{
		/* Find app */
		$this->actionEdit();
		
		/* Get yaml file */
		$yaml = $this->item->getYamlFile();
		
		/* Compose yaml */
		if ($yaml)
		{
			$result = Docker::compose($yaml->id);
			$this->api_result->error_str = $result;
		}
		else
		{
			throw new \Exception("Yaml does not created");
		}
	}
	
	
	
	/**
	 * Stop
	 */
	public function actionStop(RenderContainer $container)
	{
		/* Find app */
		$this->findItem();
		
		$service_name = $this->item->stack_name . "_" . $this->item->name;
		$this->api_result->success("Ok");
		
		/* Stop service */
		$result = Docker::removeService($service_name);
		$this->api_result->error_str = $result;
	}
}
