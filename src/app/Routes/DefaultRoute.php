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

namespace App\Routes;

use TinyPHP\RenderContainer;
use TinyPHP\Route;
use TinyPHP\RouteList;


class DefaultRoute extends Route
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteList $routes)
	{
		$arr = [
			"site:main" => "/",
			"site:applications" => "/applications/",
			"site:templates" => "/templates/",
			"site:modificators" => "/modificators/",
			"site:services" => "/services/",
			"site:yaml_files" => "/yaml_files/",
			"site:stacks" => "/stacks/",
			"site:spaces" => "/spaces/",
			"site:domains" => "/domains/",
			"site:domains:ssl" => "/domains/ssl/",
			"site:routes" => "/routes/",
			"site:nginx_files" => "/nginx_files/",
			"site:users" => "/users/",
			"site:settings" => "/settings/",
			"site:about" => "/about/",
		];
		foreach ($arr as $name => $url)
		{
			$routes->addRoute([
				"url" => $url,
				"name" => $name,
				"method" => [$this, "actionIndex"],
			]);
		}
	}
	
	
	
	/**
	 * Action database
	 */
	function actionIndex()
	{
		$json_file = file_get_contents(BASE_PATH . "/package.json");
		$json_obj = @json_decode($json_file, true);
		$version = $json_obj["version"];
		$hostname = file_get_contents("/etc/hostname_orig");
		$context = [
			"version" => $version,
			"hostname" => trim($hostname),
		];
		$this->render("@app/index.twig", $context);
	}
	
}