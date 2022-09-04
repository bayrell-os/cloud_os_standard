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
use App\Models\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class SpacesRoutesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Route::class;
	var $api_name = "spaces_routes";
    
	
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
					"route_prefix",
					"docker_name",
					"source_port",
					"target_port",
					"target_prefix",
					"nginx_config",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new JsonField(["api_name"=>"protocol_data"]),
		];
	}
	
	
	
	/**
	 * Build search Query
	 */
	function buildSearchQuery($action, $query)
	{
		$query = parent::buildSearchQuery($action, $query);
		
		//$space_id = $this->container->post("space_id");
		//$query->where("t.space_id", $space_id);
		
		return $query;
	}
	
	
	
	/**
	 * Process before
	 */
	function processBefore($action)
	{
		parent::processBefore($action);
		
		$space_id = $this->container->post("space_id");
		$domain_name = $this->update_data["domain_name"];
		
		$domain = Domain::selectQuery()
			->where([
				"space_id" => $space_id,
				"domain_name" => $domain_name,
			])
			->one()
		;
		
		if (!$domain)
		{
			throw new \Exception("Domain '" . $domain_name . "' is not allowed for this space");
		}
	}
	
}
