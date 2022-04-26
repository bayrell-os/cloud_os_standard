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

namespace App\Console;

use App\Docker;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Illuminate\Database\Capsule\Manager as DB;
use TinyPHP\Utils;


class AdminNginxUpdate extends Command
{
    protected static $defaultName = 'cloud_os:nginx:update';

    protected function configure(): void
    {
        $this
			// the short description
			->setDescription('Update cloud_os nginx file')

			// the full command description shown when running the command with
			// the "--help" option
			->setHelp('Update cloud_os nginx file')
		;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
	{
		$is_update = Docker::getOption("update_admin_domain");
		if ($is_update)
		{
			$output->writeln("Update admin domain");
			Docker::updateAdminDomain("cloud_network");
			Docker::nginx_reload();
			Docker::setOption("update_admin_domain", 0);
		}
        return Command::SUCCESS;
    }
	
}