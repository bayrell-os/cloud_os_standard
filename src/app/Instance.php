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

namespace App;

class Instance extends \TinyPHP\App
{
	
	/**
	 * Add modules
	 */
	function add_modules()
	{
		$this->addModule(\TinyORM\Module::class);
	}
	
	
	
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		add_chain("init_di_defs", $this, "init_di_defs", CHAIN_LAST);
		add_chain("init_routes", $this, "init_routes", CHAIN_LAST);
		add_chain("init_app", $this, "init_app");
		add_chain("method_not_found", $this, "method_not_found");
	}
	
	
	
	/**
	 * Init app
	 */
	function init_app()
	{
		libxml_use_internal_errors(true);
	}
	
	
	
	/**
	 * Init defs
	 */
	function init_di_defs($res)
	{
		$defs = $res->defs;
		
		/* Setup default db connection */
		$res["db_connection"] = DI\create(\TinyORM\SQLiteConnection::class);
		
		/* Connect to database */
		$res["connectToDatabase"] =
			function ()
			{
				$conn = make("db_connection");
				$conn->database = "/data/db/cloud_os.db";
				
				/* Connect */
				$conn->connect();
				
				if (!$conn->isConnected())
				{
					echo "Error: " . $conn->connect_error . "\n";
					exit(1);
				}
				
				$db_list = app("db_connection_list");
				$db_list->add("default", $conn);
				
				// Set journal_mode wal
				$conn->query("PRAGMA journal_mode = WAL;");
				
				call_chain("connectToDatabase", ["conn"=>$conn]);
			};
		
		$res->defs = $defs;
	}
	
	
	
	/**
	 * Init routes
	 */
	public function init_routes()
	{
		/* Include api functions */
		$this->addRoute(\App\Api\ApplicationsCrud::class);
		$this->addRoute(\App\Api\DomainsCrud::class);
		$this->addRoute(\App\Api\ModificatorsCrud::class);
		$this->addRoute(\App\Api\NginxFilesCrud::class);
		$this->addRoute(\App\Api\RoutesCrud::class);
		$this->addRoute(\App\Api\ServicesCrud::class);
		$this->addRoute(\App\Api\TemplatesCrud::class);
		$this->addRoute(\App\Api\YamlFilesCrud::class);
		
		/* Include bus functions */
		$this->addRoute(\App\Bus\BusApiRoute::class);
		
		/* Include routes */
		$this->addRoute(\App\Routes\DatabaseRoute::class);
		
		/* Includes models */
		$this->addModel(\App\Models\Application::class);
		$this->addModel(\App\Models\Domain::class);
		$this->addModel(\App\Models\Modificator::class);
		$this->addModel(\App\Models\NginxFile::class);
		$this->addModel(\App\Models\Route::class);
		$this->addModel(\App\Models\Template::class);
		$this->addModel(\App\Models\DockerService::class);
		$this->addModel(\App\Models\DockerYamlFile::class);

		/* Includes console commands */
		$this->addConsoleCommand(\App\Console\Docker\NginxUpdate::class);
		$this->addConsoleCommand(\App\Console\Docker\ServicesUpdate::class);
		$this->addConsoleCommand(\App\Console\Test::class);
		
		if (APP_DEBUG)
		{
			$this->addRoute(\App\Api\Test::class);
		}
	}
	
	
	
	/**
	 * Method not found
	 */
	function method_not_found($res)
	{
		$container = $res->container;
	}
	
}