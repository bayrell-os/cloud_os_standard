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

namespace App\Bus;

use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Utils;
use App\Models\NginxFile;


class DefaultBus extends BusApiRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		/* Compose */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/get_nginx_changes/",
			"name" => "bus:get_nginx_changes",
			"method" => [$this, "actionGetNginxChanges"],
		]);
	}
	
	
	
	/**
	 * Returns nginx changes
	 */
	function actionGetNginxChanges()
	{
		$result = [];
		$post = json_decode($this->container->request->getContent(), true);
		$timestamp = Utils::attr($post, ["data", "timestamp"], 0);
		
		$files = NginxFile::selectQuery()
			->where([
				["timestamp", ">=", $timestamp]
			])
			->all()
		;
		
		// $files = Utils::toArray($files);
		// $files = Utils::array_intersect(["name", "enable", "content", "timestamp", "is_deleted"]);
		
		$files = array_map
		(
			function ($item)
			{
				return Utils::object_intersect
				(
					$item->toArray(), ["name", "enable", "content", "timestamp", "is_deleted"]
				);
			},
			$files
		);
		
		$this->api_result->success( $files, "Ok" );
	}
	
	
}