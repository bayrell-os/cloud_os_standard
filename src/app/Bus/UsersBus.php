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
use App\JWT;
use App\Models\NginxFile;
use App\Models\Space;
use App\Models\SpaceUser;
use App\Models\User;
use App\Models\UserGroup;
use App\Models\UsersInGroups;
use App\Models\UserAuth;


class UsersBus extends BusApiRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		/* Login */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/login/",
			"name" => "bus:login",
			"method" => [$this, "actionLogin"],
		]);
		
		/* Logout */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/logout/",
			"name" => "bus:logout",
			"method" => [$this, "actionLogout"],
		]);
        
        /* Users dump */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/users/dump/",
			"name" => "bus:users:dump",
			"method" => [$this, "actionUsersDump"],
		]);
        
        /* Users changes */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/users/changes/",
			"name" => "bus:users:changes",
			"method" => [$this, "actionUsersChanges"],
		]);
	}
	
	
	
	/**
	 * Login
	 */
	function actionLogin()
	{
		$data = $this->container->post("data");
		$login = trim(isset($data["login"]) ? $data["login"] : "");
		$password = trim(isset($data["password"]) ? $data["password"] : "");
		$space_uid = trim(isset($data["space_uid"]) ? $data["space_uid"] : "");
		
		if ($login == "" || $password == "")
		{
			$this->api_result->error( $result, "Wrong login or password" );
			return;
		}
		
		if ($space_uid == "")
		{
			$this->api_result->error( $result, "Space uid is null" );
			return;
		}
		
		/* Find space */
		$space = Space::selectQuery()
			->where("uid", $space_uid)
			->one()
		;
		if (!$space)
		{
			$this->api_result->error( $result, "Space not found" );
			return;
		}
		
		/* Find user */
		$user = User::selectQuery()
			->innerJoin(
				SpaceUser::getTableName(),
				"spaces_users",
				"spaces_users.user_id=t.id"
			)
			->where("spaces_users.space_id", $space->id)
			->where("t.login", $login)
			->one()
		;
		if (!$user)
		{
			$this->api_result->error( $result, "Wrong login or password" );
			return;
		}
		
		/* Find auth */
		$auth = UserAuth::selectQuery()
			->where("user_id", $user->id)
			->where("method", "password")
			->one()
		;
		if (!$auth)
		{
			$this->api_result->error( $result, "Wrong login or password" );
			return;
		}
		
		/* Check password */
		$password_hash = $auth->value;
		if (!password_verify($password, $password_hash))
		{
			$this->api_result->error( $result, "Wrong login or password" );
			return;
		}
		
		$jwt = new \App\JWT();
		$jwt->login = $user->login;
		$jwt->expires = time() + 7*24*60*60;
		$jwt->buildJWT();
		$result = [
			"jwt" => $jwt->jwt,
			"data" => $jwt->toArray(),
		];
		$this->api_result->success( $result, "OK" );
	}
	
	
	
	/**
	 * Logout
	 */
	function actionLogout()
	{
		$data = $this->container->post("data");
		$jwt = trim(isset($data["jwt"]) ? $data["jwt"] : "");
		
		$jwt = \App\JWT::create($jwt);
		if (!$jwt)
		{
			$this->api_result->error( null, "JWT is not valid" );
		}
		
		$this->api_result->success( null, "Ok" );
	}
	
	
	
	/**
	 * Users dump
	 */
	function actionUsersDump()
	{
		$result = [];
		
		//$result["users"] = User::selectQuery()->all(true);
		//$result["groups"] = UserGroup::selectQuery()->all(true);
		//$result["users_in_groups"] = UsersInGroups::selectQuery()->all(true);
		
		$this->api_result->success( $result, "Ok" );
	}
	
	
	
	/**
	 * Users changes
	 */
	function actionUsersChanges()
	{
		$data = $this->container->post("data");
		$timestamp = (int)(isset($data["timestamp"]) ? $data["timestamp"] : 0);
		$gmdate = gmdate("Y-m-d H:i:s", $timestamp);
		
		$result = [];
		/*
		$result["users"] = User::selectQuery()
			->where("gmtime_updated", ">=", $gmdate)
			->all(true)
		;
		$result["groups"] = UserGroup::selectQuery()
			->where("gmtime_updated", ">=", $gmdate)
			->all(true)
		;
		$result["users_in_groups"] = UsersInGroups::selectQuery()
			->where("gmtime_updated", ">=", $gmdate)
			->all(true)
		;
		*/
		$this->api_result->success( $result, "Ok" );
	}
}