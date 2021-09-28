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


class NginxFile extends Model
{
	protected $table = "nginx_files";
	protected $primaryKey = "name";
	public $incrementing = false;
	protected $attributes = [
	];
	protected $fillable = [
        "name",
	];
	
	
	static function updateFile($file_name, $content)
	{
		/* Update nginx file */
		$item = NginxFile::firstOrNew(['name' => $file_name]);
		$item->name = $file_name;
		$item->content = $content;
		$item->enable = true;
		$item->is_deleted = false;
		
		/* Save service */
		if ($item->isDirty())
		{
			$item->save();
		}
	}
}