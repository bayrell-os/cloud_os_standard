<?php

/*!
 *  Bayrell Time Planner
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

use App\Models\Task;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class Tasks extends \TinyPHP\ApiRoute
{
	var $class_name = Task::class;
    var $api_path = "tasks";

	
	/**
	 * Get rules
	 */
	function rules()
	{
		return
		[
			new AllowFields
			([
				"fields" =>
				[
					"id",
					"target_id",
					"name",
					"gmdate",
					"status",
					"user_id",
				]
			]),
			new ReadOnly
			([
				"api_name" => "id",
			])
		];
	}

}
