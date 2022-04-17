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
	 * Generate yaml content
	 */
	function generateYamlContent()
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
		
		/* To array */
		$modificators = array_map(function($item){ return $item->toArray(); }, $modificators);
		
		/* Sort modificators by priority */
		usort($modificators, function($a, $b){
			return $a["priority"] > $b["priority"] ? 1 : -1;
		});
		
		/* Add custom patch */
		$modificators[] = 
		[
			"name" => "Custom patch",
			"content" => $this->custom_patch,
		];
		
		/* Get variables */
		$variables = $this->variables;
		
		/* Patch xml */
		$template_xml = XML::patch($template_content, $modificators);
		
		/* Convert to xml */
		$this->content = XML::toXml($template_xml);
		
		/* Generate variables */
		$this->updateVariables($template_xml);
		
		/* Generate yaml content */
		$this->updateYamlContent($template_xml);
		
		/* Save item */
		$this->save();
	}
	
	
	
	/**
	 * Setup variables
	 */
	function updateVariables($template_xml = null)
	{
		if ($template_xml == null) 
		{
			list($template_xml, $errors) = XML::loadXml($this->content);
		}
		if ($template_xml)
		{
			$template_variables = XML::getVariables($template_xml);
			
			/* Add service_name */
			$this->set("variables", "_var_service_name_", strtolower($this->name));
			
			/* Get variables values */
			$template_variables = array_map
			(
				function ($item)
				{
					$name = isset($item["name"]) ? $item["name"] : "";
					$value = isset($this->variables[$name]) ? $this->variables[$name] : "";
					$item["value"] = $value;
					return $item;
				},
				$template_variables
			);
			
			$this->variables_defs = $template_variables;
		}
		else
		{
			$this->variables_defs = [];
		}
	}
	
	
	
	/**
	 * Update yaml content
	 */
	function updateYamlContent($template_xml = null)
	{
		if ($template_xml == null) 
		{
			list($template_xml, $errors) = XML::loadXml($this->content);
		}
		if ($template_xml)
		{
			/* Convert to yaml */
			$data = XML::xmlToArray($template_xml->yaml, $this->variables_defs);
			// $this->yaml_json = json_encode($data);
			$this->yaml = XML::toYaml($data);
		}
	}
	
	
	
	/**
	 * Get yaml file
	 */
	function getYamlFile()
	{
		$file_name = $this->name . ".yaml";
		
		/* Find yaml */
		$yaml = DockerYamlFile::selectQuery()
			->where([
				"stack_name" => $this->stack_name,
				"file_name" => $file_name,
			])
			->one()
		;
		
		/* If yaml already exists */
		if ($yaml && $this->yaml_file_id != $yaml->id)
		{
			throw new \Exception("Yaml file with the same name is already exists");
		}
		
		/* Create yaml */
		if (!$yaml)
		{
			$yaml = new DockerYamlFile();
			$yaml->file_name = $file_name;
			$yaml->stack_name = $this->stack_name;
			$yaml->content = $this->yaml;
			$yaml->save()->refresh();
			
			/* Set yaml_file_id */
			$this->yaml_file_id = $yaml->id;
			$this->save();
		}
		else
		{
			$yaml->content = $this->yaml;
			$yaml->save()->refresh();
		}
		
		return $yaml;
	}
}