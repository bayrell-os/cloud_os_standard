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
		
		/* Includes routes */
		$this->addRoute(\App\Routes\ApplicationsCrud::class);
		$this->addRoute(\App\Routes\DomainsCrud::class);
		$this->addRoute(\App\Routes\NginxFilesCrud::class);
		$this->addRoute(\App\Routes\RoutesCrud::class);
		$this->addRoute(\App\Routes\ServicesCrud::class);

		/* Includes models */
		$this->addModel(\App\Models\Application::class);
		$this->addModel(\App\Models\Domain::class);
		$this->addModel(\App\Models\NginxFile::class);
		$this->addModel(\App\Models\Route::class);
		$this->addModel(\App\Models\Service::class);

		/* Includes console commands */
		$this->addConsoleCommand(\App\Console\Docker\ServicesUpdate::class);
		$this->addConsoleCommand(\App\Console\Hello::class);

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

}