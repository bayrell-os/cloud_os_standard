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

namespace App\Routes;

use App\Models\Route;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class RoutesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Route::class;
	var $api_path = "routes";

	
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
					"target_port",
					"route_prefix",
					"layer_uid",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new JsonField(["api_name"=>"protocol_data"])
		];
	}

}