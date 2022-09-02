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

namespace App\Api;

use App\Docker;
use App\XML;
use App\Models\Application;
use App\Models\Modificator;
use App\Models\Stack;
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
	var $template_version = null;
	var $template_xml = null;
	
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/modificator/add/",
			"name" => "api:" . $this->api_name . ":modificator:add",
			"method" => [$this, "actionModificatorAdd"],
		]);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/modificator/delete/",
			"name" => "api:" . $this->api_name . ":modificator:delete",
			"method" => [$this, "actionModificatorDelete"],
		]);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/compose/",
			"name" => "api:" . $this->api_name . ":compose",
			"method" => [$this, "actionCompose"],
		]);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/crud/item/stop/",
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
					"have_admin",
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
			new ReadOnly([ "api_name" => "have_admin" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
			
			
			/* Stacks */
			new Dictionary([
				"api_name" => "stacks",
				"class_name" => Stack::class,
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$query
						->orderBy("stack_name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"stack_name",
				],
			]),
			
			
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
				"actions" => [ "actionSearch", "actionGetById" ],
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					if ($action == "actionSearch")
					{
						$template_id = $rule->route->item->template_id;
						$query
							->orderBy("version", "asc")
						;
					}
					if ($action == "actionGetById")
					{
						$template_id = $rule->route->item->template_id;
						$query
							->where("template_id", $template_id)
							->orderBy("version", "asc")
						;
					}
					return $query;
				},
				"fields" =>
				[
					"id",
					"template_id",
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
	 * Validation
	 */
	function validate($action)
	{
		parent::validate($action);
		
		if (in_array($action, ["actionCreate", "actionEdit"]))
		{
			$template_version_id = $this->update_data["template_version_id"];
			$this->template_version = TemplateVersion::getById( $template_version_id );
			
			if (!$this->template_version)
			{
				throw new \Exception("Template version is not defined");
			}
			
			list($xml, $errors) = XML::loadXml($this->template_version->content);
			if (!$xml)
			{
				throw new \Exception("Template XML error: " . implode(". ", $errors));
			}
			$this->template_xml = $xml;
		}
		
		/* Check service name */
		if (in_array($action, ["actionCreate"]))
		{
			$app_name = $this->update_data["name"];
			$stack_name = $this->update_data["stack_name"];
			$docker_service_name = $app_name . "_" . $stack_name;
			
			$item = Application::selectQuery()
				->where("name", $app_name)
				->where("stack_name", $stack_name)
				->one()
			;
			if ($item)
			{
				throw new \Exception("App with same name already exists");
			}
		}
	}
	
	
	
	/**
	 * Process after
	 */
	function processAfter($action)
	{
		parent::processAfter($action);
		
		if ($action == "actionCreate")
		{
			/* Add defaults modificators from template XML */
			$modificators = $this->template_xml->modificators;
			if ($modificators->getName() == "modificators")
			{
				$childs = $modificators->children();
				foreach ($childs as $item)
				{
					if ($item->getName() == "li")
					{
						$modificator_uid = $item->getValue();
						$modificator = Modificator::selectQuery()
							->where("uid", $modificator_uid)
							->one()
						;
						
						if ($modificator)
						{
							$this->item->addModificator( $modificator );
						}
					}
				}
			}
		}
		
		/* Update yaml */
		if (in_array($action, ["actionCreate", "actionUpdate"]))
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
		
		/* Update have admin */
		if ($action == "actionSearch")
		{
			foreach ($this->items as $item)
			{
				$xml = $item->getContentXML();
				if ($xml && $xml->admin->getName() == "admin")
				{
					$item->have_admin = 1;
				}
				else
				{
					$item->have_admin = 0;
				}
			}
		}
	}
	
	
	
	/**
	 * Modifictor add
	 */
	public function actionModificatorAdd()
	{
		/* Find app */
		$this->findItem();
		
		/* Get modificator id */
		$modificator_id = $this->container->post("modificator_id");
		
		/* Add modificator */
		$this->item->addModificator($modificator_id);
		
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
		
		/* Get modificator id */
		$modificator_id = $this->container->post("modificator_id");
		
		/* Delete modificator */
		$this->item->deleteModificator($modificator_id);
		
		/* Update yaml */
		$this->item->generateYamlContent();
		
		/* Refresh item */
		$this->refreshItem();
		$this->new_data = $this->item->toArray();
		$new_data = $this->fromDatabase("actionModificatorDelete", $this->new_data);
		
		$this->api_result->success(["item"=>$new_data], "Ok");
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
			$result = Docker::composeYamlFile($yaml->id);
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
