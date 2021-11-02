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


class Application extends Model
{
	protected $table = "applications";
	protected $primaryKey = "id";
	public $incrementing = true;
	protected $attributes = [
	];
	
	
	
	/**
	 * Get modificators
	 */
	static function getModificators($app_id)
	{
		$db = app("db");
		
		$modificators = $db::query()
			->from("applications_modificators")
			->where("app_id", "=", $app_id)
			->get()
			->all()
		;
		$modificators = array_map
		(
			function ($item)
			{
				return $item->modificator_id;
			},
			$modificators
		);
		return $modificators;
	}
	
	
	
	/**
	 * Update modificators
	 */
	static function updateModificators($app_id, $modificators)
	{
		$db = app("db");
		
		/* Delete */
		$db::table("applications_modificators")
			->where('app_id', $app_id)
			->delete()
		;
		
		/* Insert modificators */
		foreach ($modificators as $modificator_id)
		{
			$db::table("applications_modificators")
				->insert
				([
					"app_id" => $app_id,
					"modificator_id" => $modificator_id
				])
			;
		}
	}
	
}