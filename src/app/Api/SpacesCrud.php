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
use App\Models\Space;
use App\Models\SpaceApplication;
use App\Models\SpaceDomain;
use App\Models\SpaceRole;
use App\Models\SpaceUser;
use App\Models\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class SpacesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Space::class;
	var $api_name = "spaces";
    
	
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
					"uid",
					"name",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new ReadOnly(["api_name"=>"gmtime_created"]),
			new ReadOnly(["api_name"=>"gmtime_updated"]),
			
			/* Load domains */
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
			
			/* Load spaces applications */
			new Dictionary([
				"api_name" => "spaces_applications",
				"class_name" => SpaceApplication::class,
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->where("t.space_id", $space_id)
						->orderBy("domain_name", "asc")
					;
					return $query;
				}
			]),
			
			/* Load spaces domains */
			new Dictionary([
				"api_name" => "spaces_domains",
				"class_name" => SpaceDomain::class,
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->where("t.space_id", $space_id)
						->orderBy("domain_name", "asc")
					;
					return $query;
				}
			]),
			
			/* Load spaces roles */
			new Dictionary([
				"api_name" => "spaces_roles",
				"class_name" => SpaceRole::class,
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->where("t.space_id", $space_id)
						->orderBy("name", "asc")
					;
					return $query;
				}
			]),
			
			/* Load spaces users */
			new Dictionary([
				"api_name" => "spaces_users",
				"class_name" => SpaceUser::class,
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->fields([
							"t.*",
							"user.login as user_login",
							"user.name as user_name",
						])
						->leftJoin(
							User::getTableName(),
							"user",
							"t.user_id=user.id"
						)
						->where("t.space_id", $space_id)
						->orderBy("name", "asc")
					;
					return $query;
				}
			]),
		];
	}

}
