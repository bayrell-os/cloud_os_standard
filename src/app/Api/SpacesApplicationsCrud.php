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

use App\Models\SpaceApplication;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class SpacesApplicationsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = SpaceApplication::class;
	var $api_name = "spaces_applications";
    
	
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
					"space_id",
					"domain_name",
					"route",
					"docker_name",
					"source_port",
					"target_port",
					"target_prefix",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new ReadOnly(["api_name"=>"space_id"]),

		];
	}
	
	
	
	/**
	 * Build search Query
	 */
	function buildSearchQuery($action, $query)
	{
		$query = parent::buildSearchQuery($action, $query);
		
		$space_id = $this->container->post("space_id");
		$query->where("t.space_id", $space_id);
		
		return $query;
	}
	
	
	
	/**
	 * Process before
	 */
	function processBefore($action)
	{
		parent::processBefore($action);
		
		$space_id = $this->container->post("space_id");
		$this->item->space_id = $space_id;
	}
	
}
