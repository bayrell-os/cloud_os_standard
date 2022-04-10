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
use App\Models\Template;
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
	function routes(RouteContainer $routes)
	{
		parent::routes($routes);
		/*
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
		);*/
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
					"stack_name",
					"name",
					"template_version_id",
					"status",
					"yaml",
					"content",
					"custom_patch",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "yaml" ]),
			new ReadOnly([ "api_name" => "content" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
			new Dictionary([
				"api_name" => "templates",
				"class_name" => Template::class,
				"buildSearchQuery" => function ($query){
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
	
	
}
