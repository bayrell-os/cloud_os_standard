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

namespace App\Models;

use TinyPHP\Model;


class Domain extends Model
{
	protected $table = "domains";
	protected $primaryKey = "domain_name";
	public $incrementing = false;
	protected $attributes = [
	];
	
	
	
	/**
	 * Save the model to the database.
	 */
	public function save(array $options = [])
	{
		if ($this->nginx_template == "")
		{
			$nginx_template = "";
			$nginx_template .= "server {\n";
			$nginx_template .= "listen 80;\n";
			$nginx_template .= "server_name %DOMAIN_NAME%;\n";
			$nginx_template .= "root /usr/share/nginx/default;\n";
			$nginx_template .= "index index.html;\n";
			$nginx_template .= "autoindex off;\n";
			$nginx_template .= "%ROUTES%\n";
			$nginx_template .= "%SSL%\n";
			$nginx_template .= "}";
			$this->nginx_template = $nginx_template;
		}
		parent::save($options);
	}
	
}