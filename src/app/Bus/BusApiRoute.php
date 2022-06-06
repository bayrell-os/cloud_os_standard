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

use TinyPHP\ApiResult;
use TinyPHP\ApiRoute;
use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Utils;


class BusApiRoute extends ApiRoute
{
	
	/**
	 * Request before
	 */
	function request_before(RenderContainer $container)
	{
		parent::request_before($container);
		
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
	}
	
	
	
	/**
	 * Request after
	 */
	function request_after()
	{
		parent::request_after();
	}
	
}