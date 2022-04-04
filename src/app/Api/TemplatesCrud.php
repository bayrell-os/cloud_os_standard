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
use App\Api\ApplicationsCrud;
use App\Models\Application;
use App\Models\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\RouteContainer;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;
use TinyPHP\Utils;


class TemplatesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Template::class;
	var $api_name = "templates";

	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
		
		/* Run template */
		/*
		$routes->addRoute
		(
			'POST',
			'/' . $this->api_path . '/default/create_app/{id}/',
			[$this, "actionCreateApp"]
		);
		*/
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
					"type",
					"name",
					"content",
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
			->orderBy("name", "asc")
		;
	}
	
	
	
	/**
	 * To database
	 */
	function toDatabase($item)
	{
		$item = parent::toDatabase($item);
		return $item;
	}
	
	
	
	/**
	 * Do action create app
	 */
	function doActionCreateApp()
	{
		$template_id = $this->getFindItemId();
		
		$this->initOldData();
		$this->findItem();
		
		$app = new Application();
		$app->name = isset($this->old_data["app_name"]) ? $this->old_data["app_name"] : "";
		$app->template_id = $template_id;
		$app->save();
		$app->updateVariables();
		$app->patchTemplate();
		
		$app_crud = new ApplicationsCrud();
		$new_data = $app_crud->fromDatabase($app);
		
		/* Set result */
		$this->api_result->success(["item"=>$new_data], "Ok");
	}
}
