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
	 * Init app
	 */
	public function init()
	{
		parent::init();
		
		/* Include api functions */
		$this->addRoute(\App\Api\ApplicationsCrud::class);
		$this->addRoute(\App\Api\ApplicationsModificatorsCrud::class);
		$this->addRoute(\App\Api\ApplicationsTemplatesCrud::class);
		$this->addRoute(\App\Api\DomainsCrud::class);
		$this->addRoute(\App\Api\NginxFilesCrud::class);
		$this->addRoute(\App\Api\RoutesCrud::class);
		$this->addRoute(\App\Api\ServicesCrud::class);
		$this->addRoute(\App\Api\YamlFilesCrud::class);
		
		/* Include bus functions */
		$this->addRoute(\App\Bus\BusApiRoute::class);
		
		/* Include routes */
		$this->addRoute(\App\Routes\DatabaseRoute::class);
		
		/* Includes models */
		$this->addModel(\App\Models\Application::class);
		$this->addModel(\App\Models\ApplicationModificator::class);
		$this->addModel(\App\Models\ApplicationTemplate::class);
		$this->addModel(\App\Models\Domain::class);
		$this->addModel(\App\Models\NginxFile::class);
		$this->addModel(\App\Models\Route::class);
		$this->addModel(\App\Models\DockerService::class);
		$this->addModel(\App\Models\DockerYamlFile::class);

		/* Includes console commands */
		$this->addConsoleCommand(\App\Console\Docker\NginxUpdate::class);
		$this->addConsoleCommand(\App\Console\Docker\ServicesUpdate::class);
		$this->addConsoleCommand(\App\Console\Test::class);

		/* Phinx */
		/*
		$this->addConsoleCommand(\Phinx\Console\Command\Breakpoint::class);
		$this->addConsoleCommand(\Phinx\Console\Command\Create::class);
		$this->addConsoleCommand(\Phinx\Console\Command\Init::class);
		$this->addConsoleCommand(\Phinx\Console\Command\ListAliases::class);
		$this->addConsoleCommand(\Phinx\Console\Command\Migrate::class);
		$this->addConsoleCommand(\Phinx\Console\Command\Rollback::class);
		$this->addConsoleCommand(\Phinx\Console\Command\SeedCreate::class);
		$this->addConsoleCommand(\Phinx\Console\Command\SeedRun::class);
		$this->addConsoleCommand(\Phinx\Console\Command\Status::class);
		$this->addConsoleCommand(\Phinx\Console\Command\Test::class);
		*/
	}
	
	
	
	/**
	 * Connect to database
	 */
	static function connectToDatabase()
	{
		$capsule = new \Illuminate\Database\Capsule\Manager;
		$capsule->addConnection
		([
			'driver'    => 'sqlite',
			'database'  => '/data/db/cloud_os.db',
			'prefix'    => '',
		]);
		
		// Set event dispatcher
		$capsule->setEventDispatcher( app(\Illuminate\Events\Dispatcher::class) );
		
		// Set the cache manager instance used by connections... (optional)
		//$capsule->setCacheManager();

		// Make this Capsule instance available globally via static methods... (optional)
		$capsule->setAsGlobal();

		// Setup the Eloquent ORM... (optional; unless you've used setEventDispatcher())
		$capsule->bootEloquent();
		
		// Set journal_mode wal
		$capsule::statement("PRAGMA journal_mode = WAL;");
		
		return $capsule;
	}
	
}