<?php

/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2021 "Ildar Bikmamatov" <support@bayrell.org>
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

use FastRoute\RouteCollector;
use TinyPHP\ApiResult;
use TinyPHP\RenderContainer;
use TinyPHP\Utils;
use App\Models\NginxFile;


class BusApiRoute
{
	var $api_result;
	
	
	/**
	 * Declare routes
	 */
	function routes(RouteCollector $routes)
	{
		$routes->addRoute
		(
			['GET', 'POST'],
			'/bus/get_nginx_changes/',
			[$this, "actionGetNginxChanges"]
		);
	}
	
	
	
	/**
	 * Request before
	 */
	function request_before(RenderContainer $container)
	{
		$this->api_result = make(ApiResult::class);
		
		/* Get post */
		$post = json_decode($container->request->getContent(), true);
		$data = Utils::attr($post, ["data"], []);
		$time = Utils::attr($post, ["time"], "");
		$sign = Utils::attr($post, ["sign"], "");
		
		/* Check sign */
		$key = env("CLOUD_OS_KEY");
		$arr = array_keys($data); sort($arr);
		array_unshift($arr, $time);
		$text = implode("|", $arr);
		$sign2 = hash_hmac("SHA512", $text, $key);
		
		if ($sign != $sign2)
		{
			throw new \Exception("Sign error");
		}
		
		return $container;
	}
	
	
	
	/**
	 * Request after
	 */
	function request_after(RenderContainer $container)
	{
		return $container;
	}
	
	
	
	/**
	 * Returns nginx changes
	 */
	function actionGetNginxChanges(RenderContainer $container)
	{
		$result = [];
		$post = json_decode($container->request->getContent(), true);
		$timestamp = Utils::attr($post, ["data", "timestamp"], 0);
		
		$files = NginxFile::query()
			->where("timestamp", ">=", $timestamp)
			->get()
			->toArray()
		;
		
		$files = array_map
		(
			function ($item)
			{
				return Utils::object_intersect
				(
					$item, ["name", "enable", "content", "timestamp", "is_deleted"]
				);
			},
			$files
		);
		
		return $container
			->setResponse
			(
				$this->api_result
					->success( $files, "Ok" )
					->getResponse()
			)
		;
	}
	
}