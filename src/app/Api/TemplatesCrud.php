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
use TinyPHP\Exception\MethodNotAllowedException;
use TinyPHP\RenderContainer;
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
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/" . $this->api_name . "/import/",
			"name" => "api:" . $this->api_name . ":import",
			"method" => [$this, "actionImport"],
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
	public function buildSearchQuery($action, $query)
	{
		return $query
			->orderBy("name", "asc")
		;
	}
	
	
	
	/**
	 * To database
	 */
	function toDatabase($action, $item)
	{
		$item = parent::toDatabase($item);
		return $item;
	}
	
	
	
	/**
	 * Create action
	 */
	function actionCreate()
	{
		throw new MethodNotAllowedException();
	}
	
	
	
	/**
	 * Edit action
	 */
	function actionEdit()
	{
		throw new MethodNotAllowedException();
	}
	
	
	
	/**
	 * Delete action
	 */
	function actionDelete()
	{
		throw new MethodNotAllowedException();
	}
	
	
}
