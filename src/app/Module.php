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

namespace App;


class Module
{
	
    static function twig_module_name()
    {
        return "app";
    }
    
    
    
    /**
	 * Register hooks
	 */
	static function register_hooks()
	{
		add_chain("init_app", static::class, "init_app");
		add_chain("init_di_defs",static::class, "init_di_defs", CHAIN_LAST);
		add_chain("register_entities", static::class, "register_entities", CHAIN_LAST);
		add_chain("method_not_found", static::class, "method_not_found");
		add_chain("routes", static::class, "routes");
	}
	
	
	
	/**
	 * Init app
	 */
	static function init_app()
	{
	}
	
	
	
	/**
	 * Init defs
	 */
	static function init_di_defs($res)
	{
		$defs = $res->defs;
		
		/* Setup bus key */
		$defs["bus_key"] = "CLOUD_OS_KEY";
		
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
	static function register_entities()
	{
        $app = app();
        
		$is_debug = env("APP_DEBUG");
		if ($is_debug)
		{
			// $app->addEntity(\App\Api\Test::class);
		}
		
		/* Add api crud */
		$app->addEntity(\App\Api\ApplicationsCrud::class);
		$app->addEntity(\App\Api\DomainsCrud::class);
		$app->addEntity(\App\Api\DomainsSSLGroupCrud::class);
		$app->addEntity(\App\Api\ModificatorsCrud::class);
		$app->addEntity(\App\Api\RoutesCrud::class);
		$app->addEntity(\App\Api\NginxFilesCrud::class);
		$app->addEntity(\App\Api\ServicesCrud::class);
		$app->addEntity(\App\Api\SpacesCrud::class);
		$app->addEntity(\App\Api\SpacesDomainsCrud::class);
		$app->addEntity(\App\Api\SpacesRolesCrud::class);
		$app->addEntity(\App\Api\SpacesRoutesCrud::class);
		$app->addEntity(\App\Api\SpacesUsersCrud::class);
		$app->addEntity(\App\Api\StackCrud::class);
		$app->addEntity(\App\Api\TemplateApi::class);
		$app->addEntity(\App\Api\TemplatesCrud::class);
		$app->addEntity(\App\Api\TemplatesVersionsCrud::class);
		$app->addEntity(\App\Api\UsersCrud::class);
		$app->addEntity(\App\Api\UsersGroupsCrud::class);
		$app->addEntity(\App\Api\YamlFilesCrud::class);
		
		/* Add routes */
		$app->addEntity(\App\Routes\DatabaseRoute::class);
		
		/* Bus functions */
		$app->addEntity(\App\Bus\NginxBus::class);
		$app->addEntity(\App\Bus\UsersBus::class);
		
		/* Console commands */
		$app->addEntity(\App\Console\AdminUpdate::class);
		$app->addEntity(\App\Console\DockerNginxUpdate::class);
		$app->addEntity(\App\Console\DockerServicesUpdate::class);
		// $app->addEntity(\App\Console\Test::class);
		
	}
	
	
	
	/**
	 * Method not found
	 */
	static function method_not_found($res)
	{
		$container = $res->container;
	}
	
	
	
	/**
	 * Routes
	 */
	static function routes($res)
	{
		// var_dump( $res->route_container->routes );
	}
	
	
    
	/**
	 * Create App
	 */
	static function createApp()
	{
		/* Create app */
		$app = create_app_instance();
		
		/* Add modules */
		$app->addModule(static::class);
		$app->addModule(\TinyORM\Module::class);
		
		/* Init */
		$app->init();
		return $app;
	}
	
}