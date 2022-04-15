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

use TinyORM\Model;
use App\Models\Template;
use App\Models\TemplateVersion;
use App\XML;


class Application extends Model
{
	
	/**
	 * Return table name
	 */
	static function getTableName()
	{
		return "applications";
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
			"stack_name" => [],
			"name" => [],
			"template_version_id" => [],
			"status" => [],
			"content" => [],
			"custom_patch" => [],
			"yaml" => [],
			"yaml_file_id" => [],
			"variables" => [],
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
	 * To database
	 */
	static function to_database($data, $is_update)
	{
		if (isset($data["variables"]))
		{
			$data["variables"] = json_encode($data["variables"]);
		}
		return parent::to_database($data, $is_update);
	}
	
	
	
	/**
	 * From database
	 */
	static function from_database($data)
	{
		if (isset($data["variables"]))
		{
			$data["variables"] = @json_decode($data["variables"], true);
			if (gettype($data["variables"]) != "array")
			{
				$data["variables"] = [];
			}
		}
		return parent::from_database($data);
	}
	
	
	
	/**
	 * Update yaml content
	 */
	function updateYamlContent()
	{
		$template_version_id = $this->template_version_id;
		
		/* Get template content */
		$template_content = "";
		$template_version = TemplateVersion::getById($template_version_id);
		if ($template_version)
		{
			$template_content = $template_version->content;
		}
		
		/* Get modificators */
		$modificators = Modificator::getAppModificators($this->id);
		
		/* Sort modificators by priority */
		usort($modificators, function($a, $b){
			return $a->priority > $b->priority ? 1 : -1;
		});
		
		/* Get variables */
		$variables = $this->variables;
		
		/* Patch xml */
		$template_xml = XML::patch($template_content, $modificators, $variables);
		
		/* Convert to xml */
		$this->content = XML::toXml($template_xml);
		
		/* Save item */
		$this->save();
		
		/* Update variables */
		$this->updateVariablesDefs($template_xml);
	}
	
	
	
	/**
	 * Get variables defs
	 */
	function updateVariablesDefs($template_xml = null)
	{
		if ($template_xml == null) 
		{
			list($template_xml, $errors) = XML::loadXml($this->content);
		}
		if ($template_xml)
		{
			$this->variables_defs = XML::getVariables($template_xml);
		}
		else
		{
			$this->variables_defs = [];
		}
	}
}