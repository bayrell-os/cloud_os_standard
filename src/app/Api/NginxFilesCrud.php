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

namespace App\Api;

use App\Models\NginxFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class NginxFilesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = NginxFile::class;
	var $api_name = "nginx_files";

	
	/**
	 * Get rules
	 */
	function getRules()
	{
		return
		[
			new AllowFields
			([
				"fields" =>
				[
					"id",
					"name",
					"enable",
					"content",
					"timestamp",
					"is_deleted",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
		];
	}
	
	
	
	/**
	 * Find query
	 */
	public function buildSearchQuery($action, $query)
	{
		return $query
			->where("is_deleted", "0")
			->orderBy("name", "asc")
		;
	}
	
	
	
	/**
	 * Do action delete
	 */
	function doActionDelete()
	{
		/* Find item */
		$this->findItem();
		
		/* Delete from database */
		if ($this->item)
		{
			$this->item->is_deleted = true;
			$this->item->save();
		}
		
		/* From database */
		$this->new_data = $this->fromDatabase($this->item);
		
		/* Set result */
		$this->api_result->success(["item"=>$this->new_data], "Ok");
	}
	
}
