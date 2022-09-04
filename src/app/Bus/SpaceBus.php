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

namespace App\Bus;

use TinyPHP\BusApiRoute;
use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Utils;
use App\Models\Domain;
use App\Models\Route;
use App\Models\Space;


class SpaceBus extends BusApiRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/space/get_routes/",
			"name" => "bus:space:routes",
			"method" => [$this, "actionGetSpaceRoutes"],
		]);
	}
	
	
	
	/**
	 * Get space routes
	 **/
	function actionGetSpaceRoutes()
	{
		$data = $this->container->post("data");
		$space_uid = (isset($data["space_uid"]) ? $data["space_uid"] : "");
		$domain_name = (isset($data["domain_name"]) ? $data["domain_name"] : "");
		//var_dump($space_uid);
		
		$routes = Route::selectQuery()
			->innerJoin(
				Domain::getTableName(),
				"domains",
				"domains.domain_name == t.domain_name"
			)
			->innerJoin(
				Space::getTableName(),
				"spaces",
				"spaces.id == domains.space_id"
			)
			->where("t.enable", 1)
			->where("t.protocol", "http")
			->where("t.domain_name", $domain_name)
			->where("spaces.uid", $space_uid)
			->orderBy("t.docker_name", "asc")
			->all(true)
		;
		$routes = array_map(
			Utils::object_intersect_curry([
				"domain_name",
				"route_prefix",
				"docker_name",
				"source_port",
				"target_port",
				"target_prefix",
			]),
			$routes
		);
		
		$this->api_result->success( $routes, "Ok" );
	}
	
}