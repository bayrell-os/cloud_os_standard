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

namespace App\Routes;

use TinyPHP\RenderContainer;
use TinyPHP\Route;
use TinyPHP\RouteContainer;


class DatabaseRoute extends Route
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		$route_container->addRoute([
			"url" => "/api/database/",
			"name" => "site:database",
			"method" => [$this, "actionDatabase"],
		]);
		
		$route_container->addRoute([
			"url" => "/api/database/adminer/",
			"name" => "site:database:adminer",
			"method" => [$this, "actionAdminer"],
		]);
	}
	
	
	
	/**
	 * Action database
	 */
	function actionDatabase(RenderContainer $container)
	{
		/* Set result */
		return $container->render("@app/database/index.html");
	}
	
	
	
	/**
	 * Adminer
	 */
	function actionAdminer(RenderContainer $container)
	{
		$file_path = BASE_PATH . "/app/Templates/database/adminer-sqlite.php";
		
		@ob_start();
		$_SERVER['REQUEST_URI'] = $_SERVER['REQUEST_URI'];
		include $file_path;
		$content = ob_get_contents();
		@ob_end_clean();
		
		/* Set result */
		$container->setContent($content);
	}
	
	
	
	/**
	 * Adminer for sqlite
	 */
	function actionSQLiteDatabase(RenderContainer $container)
	{
		$file_path = BASE_PATH . "/app/Templates/database/adminer-sqlite.php";
		
		@ob_start();
		$_SERVER['REQUEST_URI'] = "/api" . $_SERVER['REQUEST_URI'];
		include $file_path;
		$content = ob_get_contents();
		@ob_end_clean();
		
		//$content = "";
		
		/* Set result */
		return $container->setContent($content);
	}
	
	
	
	/**
	 * PHP info
	 */
	function actionInfo(RenderContainer $container)
	{
		@ob_start();
		phpinfo();
		$content = ob_get_contents();
		@ob_end_clean();
		
		/* Set result */
		return $container->setContent($content);
	}
	
	
	
	/**
	 * PHP info
	 */
	function actionTest(RenderContainer $container)
	{
		@ob_start();
		echo date("Y-m-d H:i:s");
		$content = ob_get_contents();
		@ob_end_clean();
		
		/* Set result */
		return $container->setContent($content);
	}
	
}