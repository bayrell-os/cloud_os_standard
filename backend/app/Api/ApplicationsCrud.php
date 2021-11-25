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
use App\Models\ApplicationFile;
use App\Models\ApplicationTemplate;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Utils;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class ApplicationsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Application::class;
	var $api_path = "applications";

	
	/**
	 * Declare routes
	 */
	function routes(RouteCollector $routes)
	{
		parent::routes($routes);
		
		$routes->addRoute
		(
			'POST',
			'/' . $this->api_path . '/default/compose/{id}/',
			[$this, "actionCompose"]
		);
		
		$routes->addRoute
		(
			'POST',
			'/' . $this->api_path . '/default/stop/{id}/',
			[$this, "actionStop"]
		);
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
					"id",
					"name",
					"status",
					"yaml",
					"content",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "yaml" ]),
			new ReadOnly([ "api_name" => "content" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
		];
	}

	
	
	/**
	 * Find query
	 */
	public function findQuery($query)
	{
		return $query
			->orderBy("stack_name", "asc")
			->orderBy("name", "asc")
		;
	}
	
	
	
	/**
	 * Init action
	 */
	public function init()
	{
		if ($this->action == "actionCompose")
		{
			$this->action == "actionEdit";
			parent::init();
			$this->action == "actionCompose";
		}
		else
		{
			parent::init();
		}
	}
	
	
	
	/**
	 * Before query
	 */
	public function beforeQuery()
	{
		parent::beforeQuery();
	}
	
	
	
	/**
	 * Do action edit
	 */
	public function doActionEdit()
	{
		parent::doActionEdit();
		
		$post = json_decode($this->container->request->getContent(), true);
		
		/* Save modificators */
		$modificators = $post["item"]["modificators"];
		
		/* Get variables values */
		$variable_values = [];
		$item_variables = $post["item"]["variables"];
		foreach ($item_variables as $value)
		{
			$var_name = $value["name"];
			$var_value = $value["value"];
			$variable_values[$var_name] = $var_value;
		}
		
		/* App id */
		$app_id = $this->item->id;
		
		/* Update modificators */
		$this->item->updateModificators($modificators);
		
		/* Update variables */
		$this->item->updateVariables($variable_values);
		
		/* Patch template */
		$this->item->patchTemplate();
	}
	
	
	
	/**
	 * Action compose
	 */
	function doActionCompose()
	{
		/* Save */
		$this->doActionEdit();
		
		/* Set status = 1 */
		$this->item->status = 1;
		$this->item->save();
		$this->api_result->result["item"]["status"] = 1;
	}
	
	
	
	/**
	 * Action stop
	 */
	function doActionStop()
	{
		/* Find item */
		$this->findItem();
		
		/* Set status = 0 */
		$this->item->status = 0;
		$this->item->save();
		$this->item->refresh();
		
		$result = [];
		
		/* Stop services */
		if (gettype($this->item->services) == "array")
		{
			foreach ($this->item->services as $service_name)
			{
				$result[] = Docker::removeService($service_name);
			}
		}
		
		/* From database */
		$this->new_data = $this->fromDatabase($this->item);
		
		/* Set result */
		$this->api_result->success(["item"=>$this->new_data], "Ok");
	}
	
	
	
	/**
	 * After query
	 */
	public function afterQuery()
	{
		parent::afterQuery();
		
		$db = app("db");
		
		/* Get item */
		if
		(
			$this->action == "actionGetById" ||
			$this->action == "actionEdit" ||
			$this->action == "actionCompose"
		)
		{			
			/* Set template */
			$template_id = $this->item->template_id;
			if ($template_id)
			{
				$template = ApplicationTemplate::find($template_id);
				if ($template)
				{
					$template = $template->getAttributes();
					$this->api_result->result["item"]["template"] = $template;
				}
			}
			
			/* Add variables */
			$this->api_result->result["item"]["variables"] = $this->item->getCurrentVariables();
			
			/* Select template modificators */
			$modificators = $this->item->getModificators();
			$modificators = array_map
			(
				function ($item)
				{
					return $item["modificator_id"];
				},
				$modificators
			);
			$this->api_result->result["item"]["modificators"] = $modificators;
			
			/* Set content */
			$this->api_result->result["item"]["yaml"] = $this->item->yaml;
			$this->api_result->result["item"]["content"] = $this->item->content;
		}
		
		/* Compose */
		if ($this->action == "actionCompose")
		{
			/* Get app file id */
			if ($this->item->app_file_id != null)
			{
				$app_file = ApplicationFile::find($this->item->app_file_id);
			}
			
			/* Create app file */
			if ($app_file == null)
			{
				$app_file = new ApplicationFile();
				$app_file->file_name = $this->item->name . ".yaml";
				$app_file->content = $this->item->yaml;
				$app_file->timestamp = time();
				$app_file->save();
				
				/* Save app file id */
				$this->item->app_file_id = $app_file->id;
				$this->item->save();
			}
			else
			{
				$app_file->file_name = $this->item->name . ".yaml";
				$app_file->content = $this->item->yaml;
				$app_file->timestamp = time();
				$app_file->save();
			}
			
			/* Update services */
			$this->item->updateServicesFromYaml();
			
			/* Save app file id */
			if ($this->item->app_file_id != null)
			{
				$result = Docker::compose($this->item->app_file_id);
				$this->api_result->error_str = $result;
			}
		}
	}
	
}
