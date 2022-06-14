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

use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Utils;
use App\Models\NginxFile;
use App\Models\User;
use App\Models\UserAuth;


class DefaultBus extends BusApiRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		/* Nginx changes */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/get_nginx_changes/",
			"name" => "bus:get_nginx_changes",
			"method" => [$this, "actionGetNginxChanges"],
		]);
		
		/* Login */
		$route_container->addRoute([
			"methods" => [ "GET", "POST" ],
			"url" => "/api/bus/login/",
			"name" => "bus:login",
			"method" => [$this, "actionLogin"],
		]);
	}
	
	
	
	/**
	 * Returns nginx changes
	 */
	function actionGetNginxChanges()
	{
		$result = [];
		
		$data = $this->container->post("data");
		$timestamp = (int)(isset($data["login"]) ? $data["login"] : 0);
		
		$files = NginxFile::selectQuery()
			->where([
				["timestamp", ">=", $timestamp]
			])
			->all()
		;
		
		// $files = Utils::toArray($files);
		// $files = Utils::array_intersect(["name", "enable", "content", "timestamp", "is_deleted"]);
		
		$files = array_map
		(
			function ($item)
			{
				return Utils::object_intersect
				(
					$item->toArray(), ["name", "enable", "content", "timestamp", "is_deleted"]
				);
			},
			$files
		);
		
		$this->api_result->success( $files, "Ok" );
	}
	
	
	
	/**
	 * Login
	 */
	function actionLogin()
	{
		$data = $this->container->post("data");
		$login = trim(isset($data["login"]) ? $data["login"] : "");
		$password = trim(isset($data["password"]) ? $data["password"] : "");
		
		if ($login == "" || $password == "")
		{
			$this->api_result->error( $result, "Wrong login or password" );
			return;
		}
		
		/* Find user */
		$user = User::selectQuery()
			->where("login", $login)
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
		
		$jwt = null;
		$result = [
			"jwt" => $jwt,
		];
		$this->api_result->success( $result, "OK" );
	}
	
}