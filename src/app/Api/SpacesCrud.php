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
use App\Models\Space;
use App\Models\SpaceDomain;
use App\Models\SpaceRole;
use App\Models\SpaceUser;
use App\Models\SpaceUserRole;
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
				"actions" => ["actionGetById"],
				
				"buildSearchQuery" => function ($route, $action, $query)
				{
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
			
			/* Load services */
			new Dictionary([
				"api_name" => "services",
				"class_name" => DockerService::class,
				"actions" => ["actionGetById"],
				
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
			
			/* Load spaces routes */
			new Dictionary([
				"api_name" => "spaces_routes",
				"class_name" => Route::class,
				"actions" => ["actionGetById"],
				
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->innerJoin(
							Domain::getTableName(),
							"domains",
							"t.domain_name == domains.domain_name"
						)
						->where("domains.space_id", $space_id)
						->orderBy("t.domain_name", "asc")
						->orderBy("t.route_prefix", "asc")
					;
					return $query;
				},
				
				"fromDatabase" => function ($rule, $action, $item)
				{
					$item["protocol_data"] = json_decode($item["protocol_data"], true);
					return $item;
				},
			]),
			
			/* Load spaces domains */
			new Dictionary([
				"api_name" => "spaces_domains",
				"class_name" => Domain::class,
				"actions" => ["actionGetById"],
				
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
				"actions" => ["actionGetById"],
				
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->where("t.space_id", $space_id)
						->orderBy("name", "asc")
					;
					return $query;
				},
				
				"convert" => function ($rule, $action, $roles)
				{
					/* Get roles id */
					$ids = array_map(
						function ($item)
						{
							return $item["id"];
						},
						$roles
					);
					
					/* Find all roles users with same roles id */
					$users_roles_all = SpaceUserRole::selectQuery()
						->where("role_id", $ids)
						->innerJoin(
							User::getTableName(),
							"users",
							"t.user_id == users.id"
						)
						->addField("users.name as user_name")
						->addField("users.login as user_login")
						//->debug(1)
						->all(true)
					;
					
					/* Add users_roles for each role */
					$roles = array_map(
						function ($role) use ($users_roles_all)
						{
							$users_roles = array_filter
							(
								$users_roles_all,
								function ($role_user) use ($role)
								{
									return $role_user["role_id"] == $role["id"];
								}
							);
							$role["users_roles"] = array_values($users_roles);
							return $role;
						},
						$roles
					);
					
					return $roles;
				},
			]),
			
			/* Load spaces users */
			new Dictionary([
				"api_name" => "spaces_users",
				"class_name" => SpaceUser::class,
				"actions" => ["actionGetById"],
				
				"buildSearchQuery" => function ($rule, $action, $query)
				{
					$space_id = $rule->route->item->id;
					$query
						->fields([
							"t.*",
							"user.login as user_login",
							"user.name as user_name",
						])
						->innerJoin(
							User::getTableName(),
							"user",
							"t.user_id=user.id"
						)
						->where("t.space_id", $space_id)
						->orderBy("name", "asc")
					;
					return $query;
				},
				
				"convert" => function ($rule, $action, $users)
				{
					$space_id = $rule->route->item->id;
					
					/* Get user id */
					$ids = array_map(
						function ($item)
						{
							return $item["user_id"];
						},
						$users
					);
					
					/* Find all roles users with same user id */
					$users_roles_all = SpaceUserRole::selectQuery()
						->where("t.user_id", $ids)
						->where("roles.space_id", $space_id)
						->innerJoin(
							SpaceRole::getTableName(),
							"roles",
							"t.role_id == roles.id"
						)
						->addField("roles.name as role_name")
						//->debug(true)
						->all(true)
					;
					
					/* Add users_roles for each user */
					$users = array_map(
						function ($user) use ($users_roles_all)
						{
							$users_roles = array_filter
							(
								$users_roles_all,
								function ($role_user) use ($user)
								{
									return $role_user["user_id"] == $user["user_id"];
								}
							);
							$user["users_roles"] = array_values($users_roles);
							return $user;
						},
						$users
					);
						
					return $users;
				},
				
			]),
		];
	}

}
