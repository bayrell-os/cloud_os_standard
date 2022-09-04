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

use App\Models\SpaceRole;
use App\Models\SpaceUser;
use App\Models\SpaceUserRole;
use App\Models\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\ForeignKey;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class SpacesRolesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = SpaceRole::class;
	var $api_name = "spaces_roles";
    
	
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
					"name",
					"users_roles",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new ReadOnly(["api_name"=>"space_id"]),
			new ReadOnly(["api_name"=>"users_roles"]),
			
			new ForeignKey([
				"api_name" => "users_roles",
				"class_name" => SpaceUserRole::class,
				
				"foreign_key" => "id",
				"join_key" => "role_id",
				
				"buildSearchQuery" => function ($rule, $action, $foreign_ids, $q)
				{
					$q
						->addField("users.name as user_name")
						->addField("users.login as user_login")
						->innerJoin(
							User::getTableName(),
							"users",
							"t.user_id == users.id"
						)
					;
					return $q;
				},
				
				"convert" => function ($rule, $action, $item, $data, $index)
				{
					if ($action == "actionCreate" || $action == "actionUpdate")
					{
						$users_roles = $rule->route->update_data["users_roles"];
						
						$users_roles = array_map(
							function ($item) use ($rule)
							{
								$role_id = $rule->route->item->id;
								return [
									"user_id" => $item["user_id"],
									"user_name" => $item["user_name"],
									"user_login" => $item["user_login"],
									"role_id" => $role_id,
									"is_deleted" => 0,
								];
							},
							$users_roles
						);
						
						/* Sync */
						SpaceUserRole::sync
						(
							$users_roles,
							[
								"buildSearchQuery" => function($q) use ($rule)
								{
									$q->where("role_id", $rule->route->item->id);
									//$q->debug(true);
									return $q;
								},
							],
						);
						
						$item["users_roles"] = $users_roles;
					}
					else
					{
						$item["users_roles"] = $data;
					}
					
					return $item;
				},
				
			]),
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
