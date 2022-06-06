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


class NginxFile extends Model
{
	/**
	 * Return table name
	 */
	static function getTableName()
	{
		return "nginx_files";
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
			"name" => [],
			"enable" => [],
			"content" => [],
			"timestamp" => [],
			"is_deleted" => [],
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
	 * Update file
	 */
	static function updateFile($file_name, $content)
	{
		/* Update nginx file */
		$item = NginxFile::selectQuery()
			->where([
				["name", "=", $file_name],
			])
			->one()
		;
		
		if (!$item) $item = new NginxFile();
		if ($item->name != $file_name) $item->name = $file_name;
		if ($item->content != $content) $item->content = $content;
		if ($item->enable != true) $item->enable = true;
		if ($item->is_deleted != false) $item->is_deleted = false;
		
		/* Save service */
		if ($item->isDirty())
		{
			$item->save();
		}
	}
	
	
	
	/**
	 * Save the model to the database.
	 */
	public function save($connection_name = 'default')
	{
		$this->timestamp = time();
		return parent::save($connection_name);
	}
}