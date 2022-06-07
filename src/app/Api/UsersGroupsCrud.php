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

use App\Models\User;
use App\Models\UserGroup;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\ManyToMany;
use TinyPHP\Rules\ReadOnly;


class UsersGroupsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = UserGroup::class;
	var $api_name = "users_groups";
	
	
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
					"login",
					"name",
					"banned",
					"is_deleted",
					"users_in_groups",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "users_in_groups" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
			
			
			/* Users */
			new Dictionary([
				"api_name" => "users",
				"class_name" => User::class,
				"actions" => [ "actionSearch" ],
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$app_id = $rule->route->item->id;
					$query
						->fields(["t.*"])
						->where("banned", "=", 0)
						->orderBy("t.name", "asc")
					;
					return $query;
				},
				"fields" =>
				[
					"id",
					"login",
					"name",
				],
			]),
			
			
			/* Users */
			new ManyToMany([
				"api_name" => "users_in_groups",
				"actions" => [ "actionSearch" ],
				"foreign_key" => "id",
				"join_key" => "group_id",
				"buildSearchQuery" => function ($rule, $action, $ids)
				{
					/* Find users in groups */
					$q = User::selectQuery()
						// ->debug(true)
						->fields(
							"users.id as user_id",
							"users_in_groups.group_id",
							"users.login",
							"users.name",
						)
						->alias("users")
						->innerJoin(
							"users_in_groups",
							"users_in_groups",
							"users_in_groups.user_id = users.id and users_in_groups.is_deleted=0"
						)
						->where("users.banned", "=", 0)
						->where("users_in_groups.group_id", "=", $ids)
					;
					return $q;
				},
				"fields" =>
				[
					"user_id",
					"group_id",
					"login",
					"name",
				],
			]),
			
		];
	}
	
	
}
