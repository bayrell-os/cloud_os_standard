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

use App\Docker;
use App\Models\Modificator;
use App\XML;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Utils;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class ModificatorsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = Modificator::class;
	var $api_name = "modificators";
	var $xml = null;
	
	
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
					"content",
					"priority",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "name" ]),
			new ReadOnly([ "api_name" => "priority" ]),
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
			->orderBy("name", "asc")
		;
	}
	
	
	
	/**
	 * To database
	 */
	function toDatabase($action, $item)
	{
		$item = parent::toDatabase($action, $item);
		return $item;
	}
	
	
	
	/**
	 * Validation
	 */
	function validate($action)
	{
		if ($action == "actionCreate" || $action == "actionEdit")
		{
			$content = $this->update_data["content"];
			
			list($xml, $errors) = XML::loadXml($content);
			if (!$xml)
			{
				throw new \Exception("XML error: " . implode(". ", $errors));
			}
			
			$this->xml = $xml;
		}
	}
	
	
	
	/**
	 * Process item
	 */
	function processItem($action)
	{
		parent::processItem($action);
		
		if ($action == "actionCreate" || $action == "actionEdit")
		{
			$name = (string)$this->xml->name;
			$priority = (int)$this->xml->priority;
			$this->item["name"] = $name;
			$this->item["priority"] = $priority;
		}
	}
}
