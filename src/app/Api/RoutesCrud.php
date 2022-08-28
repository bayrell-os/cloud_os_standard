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

use App\Models\DockerService;
use App\Models\Domain;
use App\Models\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class RoutesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Route::class;
	var $api_name = "routes";

	
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
					"enable",
					"protocol",
					"protocol_data",
					"domain_name",
					"route",
					"docker_name",
					"source_port",
					"target_port",
					"target_prefix",
					"layer_uid",
					"nginx_config",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new ReadOnly(["api_name"=>"gmtime_created"]),
			new ReadOnly(["api_name"=>"gmtime_updated"]),
			new JsonField(["api_name"=>"protocol_data"]),
			new Dictionary([
				"api_name" => "domains",
				"class_name" => Domain::class,
				"buildSearchQuery" => function ($route, $action, $query){
					$query
						->orderBy("domain_name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"domain_name",
				],
			]),
			new Dictionary([
				"api_name" => "services",
				"class_name" => DockerService::class,
				"buildSearchQuery" => function ($route, $action, $query){
					$query
						->where("is_deleted", "=", "0")
						->orderBy("docker_name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"service_id",
					"docker_name",
				],
			]),
		];
	}

}
