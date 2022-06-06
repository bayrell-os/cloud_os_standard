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
    var $xml_uid = null;
    var $xml_name = null;
    var $xml_version = null;
	
	
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
					"uid",
					"version",
					"name",
					"content",
					"priority",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "uid" ]),
			new ReadOnly([ "api_name" => "name" ]),
			new ReadOnly([ "api_name" => "version" ]),
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
		parent::validate($action);
		
		if ($action == "actionCreate" || $action == "actionEdit")
		{
			$content = $this->update_data["content"];
			
			list($xml, $errors) = XML::loadXml($content);
			if (!$xml)
			{
				throw new \Exception("XML error: " . implode(". ", $errors));
			}
			
			$this->xml = $xml;
			
			$this->xml_uid = (string)$xml->uid;
			$this->xml_name = (string)$xml->name;
			$this->xml_version = (string)$xml->version;
			
			/* Check xml params */
			if ($this->xml_uid == "")
			{
				throw new \Exception("XML uid is not defined");
			}
			if ($this->xml_version == "")
			{
				throw new \Exception("XML version is not defined");
			}
			if ($this->xml_name == "")
			{
				throw new \Exception("XML name is not defined");
			}
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
			$uid = (string)$this->xml->uid;
			$name = (string)$this->xml->name;
			$version = (string)$this->xml->version;
			$priority = (int)$this->xml->priority;
			$this->item["uid"] = $uid;
			$this->item["name"] = $name;
			$this->item["priority"] = $priority;
			$this->item["version"] = $version;
		}
	}
}
