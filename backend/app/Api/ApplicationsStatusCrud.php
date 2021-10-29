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
use App\Models\ApplicationStatus;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Utils;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class ApplicationsStatusCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = ApplicationStatus::class;
	var $api_path = "applications_status";

	
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
			])
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
