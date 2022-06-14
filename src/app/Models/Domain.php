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

namespace App\Models;

use TinyORM\Model;


class Domain extends Model
{
	/**
	 * Return table name
	 */
	static function getTableName()
	{
		return "domains";
	}
	
	
	
	/**
	 * Return list of primary keys
	 */
	static function pk()
	{
		return ["id"];
	}
	
	
	
	/**
	 * Returns tables fields
	 */
	static function fields()
	{
		return
		[
			"id" => [],
			"domain_name" => [],
			"nginx_template" => [],
			"space_id" => [],
			"enable_auth" => [],
			"gmtime_created" => [],
			"gmtime_updated" => [],
		];
	}
	
	
	
	/**
	 * Return if auto increment
	 */
	static function isAutoIncrement()
	{
		return true;
	}
	
	
	
	/**
	 * Returns true if need to update timestamp
	 */
	static function updateTimestamp()
	{
		return true;
	}
	
	
	
	/**
	 * Save the model to the database.
	 */
	public function save($connection_name = "default")
	{
		if ($this->nginx_template == "")
		{
			$nginx_template = "";
			$nginx_template .= "server {\n";
			$nginx_template .= "  listen 80;\n";
			$nginx_template .= "  server_name %DOMAIN_NAME%;\n";
			$nginx_template .= "  root /var/www/html;\n";
			$nginx_template .= "  index index.php index.html;\n";
			$nginx_template .= "  autoindex off;\n";
			$nginx_template .= "  %ROUTES%\n";
			$nginx_template .= "  %SSL%\n";
			$nginx_template .= "}";
			$this->nginx_template = $nginx_template;
		}
		return parent::save($connection_name);
	}
	
}