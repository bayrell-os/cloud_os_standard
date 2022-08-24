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

use App\Models\SpaceUser;
use App\Models\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Exception\ItemNotFoundException;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\ForeignKey;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;


class SpacesUsersCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = SpaceUser::class;
	var $api_name = "spaces_users";
	
	
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
					"user_id",
					"user_name",
					"user_login",
					"name",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly(["api_name"=>"id"]),
			new ReadOnly(["api_name"=>"space_id"]),
			new ReadOnly(["api_name"=>"user_id"]),
			new ReadOnly(["api_name"=>"user_name"]),
			new ReadOnly(["api_name"=>"user_login"]),
			
			new ForeignKey([
				"api_name" => "users",
				"class_name" => User::class,
				
				"foreign_key" => "user_id",
				"join_key" => "id",
				
				"convert" => function ($action, $item, $data, $index)
				{
					if (isset($data[0]))
					{
						$item["user_name"] = $data[0]["name"];
						$item["user_login"] = $data[0]["login"];
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
		
		if ($action == "actionCreate")
		{
			/* Find user_id */
			$user_login = isset($this->update_data["user_login"]) ?
				$this->update_data["user_login"] : []
			;
			
			$user = User::selectQuery()
				->where("login", $user_login)
				->one()
			;
			if (!$user)
			{
				throw new ItemNotFoundException("User");
			}
			
			$this->item->user_id = $user->id;
		}
	}
	
}
