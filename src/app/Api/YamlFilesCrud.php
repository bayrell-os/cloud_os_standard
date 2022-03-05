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
use App\Models\DockerYamlFile;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Utils;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class YamlFilesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = DockerYamlFile::class;
	var $api_path = "applications_files";

	
	/**
	 * Declare routes
	 */
	function routes(RouteCollector $routes)
	{
		parent::routes($routes);
		
		/* Compose */
		$routes->addRoute
		(
			'POST',
			'/' . $this->api_path . '/default/compose/{id}/',
			[$this, "actionCompose"]
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
					"file_name",
					"stack_name",
					"content",
					"app_status",
					"timestamp",
					"is_deleted",
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
			->orderBy("file_name", "asc")
		;
	}
	
	
	
	/**
	 * Action compose
	 */
	function doActionCompose()
	{
		/* Save */
		$this->doActionEdit();
		
		/* Compose */
		if ($this->item)
		{
			$result = Docker::compose($this->item->id);
			$this->api_result->error_str = $result;
		}
	}
	
}