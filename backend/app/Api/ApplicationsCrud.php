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
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
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
	 * Find item
	 */
	public function findItem()
	{
		parent::findItem();
	}
	
	
	
	/**
	 * Process after
	 */
	public function process_after()
	{
		$db = app("db");
		
		/* Edit */
		if ($this->container->action == "actionEdit")
		{
			$post = json_decode($this->container->request->getContent(), true);
			
			/* Save modificators */
			$modificators = $post["item"]["modificators"];
			
			/* App id */
			$app_id = $this->item->id;
			
			/* Update modificators */
			Application::updateModificators($app_id, $modificators);
		}
		
		/* Get item */
		if
		(
			$this->container->action == "actionGetById" ||
			$this->container->action == "actionEdit"
		)
		{
			$item = $this->api_result->result["item"];
			
			/* App id */
			$app_id = $this->item->id;
			
			/* Set template */
			$template_id = $this->item->template_id;
			if ($template_id)
			{
				$template = ApplicationTemplate::query()
					->where("id", "=", $template_id)
					->first()
				;
				if ($template)
				{
					$template = $template->getAttributes();
					$this->api_result->result["item"]["template"] = $template;
				}
			}
			
			/* Select template modificators */
			$modificators = Application::getModificators($app_id);
			$this->api_result->result["item"]["modificators"] = $modificators;
		}
	}
}
