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
use TinyPHP\RouteList;
use TinyPHP\Utils;
use App\Models\Domain;
use App\Models\Route;
use App\Models\Space;
use App\Models\SpaceRole;
use App\Models\SpaceUser;
use App\Models\SpaceUserRole;
use App\Models\User;
use App\Models\UserAuth;


class SpaceBus extends BusApiRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteList $routes)
	{
		/* Login */
		$routes->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/space/login/",
			"name" => "bus:space:login",
			"method" => [$this, "actionLogin"],
		]);
		
		/* Logout */
		$routes->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/space/logout/",
			"name" => "bus:space:logout",
			"method" => [$this, "actionLogout"],
		]);
		
		/* Get routes */
		$routes->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/space/get_routes/",
			"name" => "bus:space:routes",
			"method" => [$this, "actionGetRoutes"],
		]);
		
		 /* Users dump */
		 $routes->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/space/users/",
			"name" => "bus:space:users",
			"method" => [$this, "actionGetUsers"],
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
		
		$jwt = make(\TinyPHP\Crypt\JWT::class);
		$jwt = $jwt::newInstance([
			"login" => $user->login,
			"expires" => time() + 7*24*60*60,
		]);
		$jwt->buildJWT();
		$result = [
			"jwt" => $jwt->getJWT(),
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
		$jwt_string = trim(isset($data["jwt"]) ? $data["jwt"] : "");
		
		$jwt = make(\TinyPHP\Crypt\JWT::class);
		$jwt = $jwt::create($jwt_string);
		if (!$jwt)
		{
			$this->api_result->error( null, "JWT is not valid" );
		}
		
		$this->api_result->success( null, "Ok" );
	}
	
	
	
	/**
	 * Get space routes
	 **/
	function actionGetRoutes()
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
	
	
	
	/**
	 * Get users
	 */
	function actionGetUsers()
	{
		$data = $this->container->post("data");
		$space_uid = (isset($data["space_uid"]) ? $data["space_uid"] : "");
		
		//var_dump($space_uid);
		
		$result = [];
		
		/* Get users */
		$result["users"] = User::selectQuery()
			->fields([
				"t.id",
				"t.login",
				"t.name",
				"t.banned",
				"t.is_deleted",
				"t.gmtime_created",
				"t.gmtime_updated",
			])
			->innerJoin(
				SpaceUser::getTableName(),
				"spaces_users",
				"spaces_users.user_id=t.id"
			)
			->innerJoin(
				Space::getTableName(),
				"space",
				"spaces_users.space_id=space.id"
			)
			->where("space.uid", $space_uid)
			->where("t.banned", 0)
			->where("t.is_deleted", 0)
			->all(true)
		;
		
		/* Get roles */
		$result["roles"] = SpaceRole::selectQuery()
			->fields([
				"t.id",
				"t.name",
				"t.is_deleted",
				"t.gmtime_created",
				"t.gmtime_updated",
			])
			->innerJoin(
				Space::getTableName(),
				"space",
				"space.id=t.space_id"
			)
			->where("space.uid", $space_uid)
			->all(true)
		;
		
		/* Get users roles */
		$result["users_roles"] = SpaceUserRole::selectQuery()
			->fields([
				"t.user_id",
				"t.role_id",
				"t.is_deleted",
				"t.gmtime_created",
				"t.gmtime_updated",
			])
			->innerJoin(
				SpaceRole::getTableName(),
				"spaces_roles",
				"spaces_roles.id=t.role_id"
			)
			->innerJoin(
				SpaceUser::getTableName(),
				"spaces_users",
				"spaces_users.user_id=t.user_id"
			)
			->innerJoin(
				Space::getTableName(),
				"space",
				"space.id=spaces_roles.space_id and space.id=spaces_users.space_id"
			)
			->where("space.uid", $space_uid)
			->all(true)
		;
		
		$this->api_result->success( $result, "Ok" );
	}
	
}