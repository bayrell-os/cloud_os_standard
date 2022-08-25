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

use App\Models\Domain;
use App\Models\Space;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\Nullable;
use TinyPHP\Rules\ReadOnly;


class DomainsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Domain::class;
	var $api_name = "domains";
	
	
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
					"domain_name",
					"nginx_template",
					"space_id",
					"ssl_id",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "domain_name", "can_create" => true ]),
			new ReadOnly([ "api_name" => "space_id" ]),
			new ReadOnly([ "api_name" => "ssl_id" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
			new Nullable([ "api_name" => "space_id" ]),
			new Nullable([ "api_name" => "ssl_id" ]),
			
			new Dictionary([
				"api_name" => "spaces",
				"class_name" => Space::class,
				"buildSearchQuery" => function ($route, $action, $query){
					$query
						->orderBy("name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"name",
				],
			]),
		];
	}

}
