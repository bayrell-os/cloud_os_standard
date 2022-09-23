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

namespace App\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Yaml;
use App\Template;


class Test extends Command
{
	protected static $defaultName = 'app:test';

	protected function configure(): void
	{
		$this
			// the short description
			->setDescription('Test')

			// the full command description shown when running the command with
			// the "--help" option
			->setHelp('Test')
		;
	}

	protected function execute(InputInterface $input, OutputInterface $output): int
	{
		
		$option = \App\Models\Option::findOrCreate([
			"key"=>"test"
		]);
		$option->value = microtime(1);
		$option->save();
		
		echo $option->value . "\n";
		
		return Command::SUCCESS;
	}
}