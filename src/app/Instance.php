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
		add_chain("init_app", $this, "init_app");
		add_chain("init_di_defs", $this, "init_di_defs", CHAIN_LAST);
		add_chain("register_entities", $this, "register_entities", CHAIN_LAST);
		add_chain("method_not_found", $this, "method_not_found");
		add_chain("routes", $this, "routes");
	}
	
	
	
	/**
	 * Init app
	 */
	function init_app()
	{
	}
	
	
	
	/**
	 * Init defs
	 */
	function init_di_defs($res)
	{
		$defs = $res->defs;
		
		/* Setup default db connection */
		$defs["db_connection"] = \DI\create(\TinyORM\SQLiteConnection::class);
		
		/* Connect to database */
		$defs["connectToDatabase"] =
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
	 * Register entities
	 */
	public function register_entities()
	{
		$is_debug = env("APP_DEBUG");
		if ($is_debug)
		{
			// $this->addEntity(\App\Api\Test::class);
		}
		
		/* Add api crud */
		$this->addEntity(\App\Api\ApplicationsCrud::class);
		$this->addEntity(\App\Api\DomainsCrud::class);
		$this->addEntity(\App\Api\ModificatorsCrud::class);
		$this->addEntity(\App\Api\RoutesCrud::class);
		$this->addEntity(\App\Api\NginxFilesCrud::class);
		$this->addEntity(\App\Api\ServicesCrud::class);
		$this->addEntity(\App\Api\TemplateApi::class);
		$this->addEntity(\App\Api\TemplatesCrud::class);
		$this->addEntity(\App\Api\TemplatesVersionsCrud::class);
		$this->addEntity(\App\Api\UsersCrud::class);
		$this->addEntity(\App\Api\YamlFilesCrud::class);
		
		/* Add routes */
		$this->addEntity(\App\Routes\DatabaseRoute::class);
		
		/* Bus functions */
		$this->addEntity(\App\Bus\DefaultBus::class);
		
		/* Console commands */
		$this->addEntity(\App\Console\Docker\NginxUpdate::class);
		$this->addEntity(\App\Console\Docker\ServicesUpdate::class);
		// $this->addEntity(\App\Console\Test::class);
		
	}
	
	
	
	/**
	 * Method not found
	 */
	function method_not_found($res)
	{
		$container = $res->container;
	}
	
	
	
	/**
	 * Routes
	 */
	function routes($res)
	{
		// var_dump( $res->route_container->routes );
	}
	
}