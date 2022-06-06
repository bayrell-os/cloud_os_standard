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
use App\Models\Modificator;
use App\Models\Template;
use App\Models\TemplateVersion;
use App\XML;


class Application extends Model
{
	
	var $content_xml = null;
	
	
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
			"modificators" => [],
			"custom_patch" => [],
			"yaml" => [],
			"yaml_file_id" => [],
			"environments" => [],
			"variables" => [],
			"volumes" => [],
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
		$field_names =
		[
			"modificators",
			"environments",
			"variables",
			"volumes",
		];
		
		foreach ($field_names as $field_name)
		{
			if (isset($data[$field_name]))
			{
				$data[$field_name] = json_encode($data[$field_name]);
			}
		}
		
		return parent::to_database($data, $is_update);
	}
	
	
	
	/**
	 * From database
	 */
	static function from_database($data)
	{
		$field_names =
		[
			"modificators",
			"environments",
			"variables",
			"volumes",
		];
		
		foreach ($field_names as $field_name)
		{
			if (isset($data[$field_name]))
			{
				$data[$field_name] = @json_decode($data[$field_name], true);
				if (gettype($data[$field_name]) != "array")
				{
					$data[$field_name] = [];
				}
			}
		}
		
		return parent::from_database($data);
	}
	
	
	
	/**
	 * Get environment patch
	 */
	function getEnvironmentPatch()
	{
		$environments = $this->environments;
		
		$patch_xml = [];
		$patch_xml[] = '<?xml version="1.1" encoding="UTF-8" ?>';
		$patch_xml[] = '<patch>';
		$patch_xml[] = '  <name>Environments</name>';
		$patch_xml[] = '  <priority>50</priority>';
		$patch_xml[] = '  <operations>';
		
		if (gettype($environments) == "array" && count($environments) > 0)
		{
			foreach ($environments as $env)
			{
				$env_name = $env["key"];
				$env_value = $env["value"];
				
				$patch_xml[] = '    <operation type="remove">';
				$patch_xml[] = '      <path>/template/yaml/services/_var_app_name_/environment/'.
					$env_name.'</path>';
				$patch_xml[] = '    </operation>';
				
				$patch_xml[] = '    <operation type="add">';
				$patch_xml[] = '      <path>/template/yaml/services/_var_app_name_/environment</path>';
				$patch_xml[] = '      <value>';
				$patch_xml[] = "        <".$env_name.">".$env_value."</".$env_name.">";
				$patch_xml[] = '      </value>';
				$patch_xml[] = '    </operation>';
			}
		}
		
		$patch_xml[] = '  </operations>';
		$patch_xml[] = '</patch>';
		
		return implode("\n", $patch_xml);
	}
	
	
	
	/**
	 * Get volumes patch
	 */
	function getVolumesPatch()
	{
		$volumes = $this->volumes;
		
		$patch_xml = [];
		$patch_xml[] = '<?xml version="1.1" encoding="UTF-8" ?>';
		$patch_xml[] = '<patch>';
		$patch_xml[] = '  <name>Volumes</name>';
		$patch_xml[] = '  <priority>50</priority>';
		$patch_xml[] = '  <operations>';
		
		if (gettype($volumes) == "array" && count($volumes) > 0)
		{
			foreach ($volumes as $env)
			{
				$env_name = $env["key"];
				$env_value = $env["value"];
				
				/* Add volume to service */
				$patch_xml[] = '    <operation type="add">';
				$patch_xml[] = '      <path>/template/yaml/services/_var_app_name_</path>';
				$patch_xml[] = '      <value>';
				$patch_xml[] = "        <volumes>".$env_name.":".$env_value."</volumes>";
				$patch_xml[] = '      </value>';
				$patch_xml[] = '    </operation>';
				
				/* Add volume description */
				if (strpos($env_name, "/") === false)
				{
					$patch_xml[] = '    <operation type="add">';
					$patch_xml[] = '      <path>/template/yaml/volumes</path>';
					$patch_xml[] = '      <value>';
					$patch_xml[] = "        <".$env_name."/>";
					$patch_xml[] = '      </value>';
					$patch_xml[] = '    </operation>';
				}
			}
		}
		
		$patch_xml[] = '  </operations>';
		$patch_xml[] = '</patch>';
		
		return implode("\n", $patch_xml);
	}
	
	
	
	/**
	 * Add modificator
	 */
	function addModificator($modificator)
	{
		$app_id = $this->id;
		$modificator_id = $modificator;
		if ($modificator instanceof Modificator)
		{
			$modificator_id = $modificator->id;
		}
		
		/* Find modificator */
		$row = make("db_query")
			->select()
			->from("app_modificators")
			->where([
				"app_id" => $app_id,
				"modificator_id" => $modificator_id,
			])
			->one()
		;
		
		/* Insert modificator */
		if (!$row)
		{
			make("db_query")
				->insert()
				->table("app_modificators")
				->values([
					"app_id" => $app_id,
					"modificator_id" => $modificator_id,
				])
				->execute()
			;
		}
		
	}
	
	
	
	/**
	 * Delete modificator
	 */
	function deleteModificator($modificator)
	{
		$app_id = $this->id;
		$modificator_id = $modificator;
		if ($modificator instanceof Modificator)
		{
			$modificator_id = $modificator->id;
		}
		
		/* Delete modificator */
		$row = make("db_query")
			->delete()
			->table("app_modificators")
			->where([
				"app_id" => $app_id,
				"modificator_id" => $modificator_id,
			])
			->execute()
		;
	}
	
	
	
	/**
	 * Get modificators
	 */
	function getModificators($template_xml)
	{
		/* Get modificators */
		$modificators = Modificator::getAppModificators($this->id);
		
		/* To array */
		$modificators = array_map(function($item){ return $item->toArray(); }, $modificators);
		
		/* Sort modificators by priority */
		usort($modificators, function($a, $b){
			return $a["priority"] > $b["priority"] ? 1 : -1;
		});
		
		/* Add environment */
		$modificators[] = 
		[
			"name" => "Environments",
			"content" => $this->getEnvironmentPatch(),
		];
		
		/* Add volumes */
		$modificators[] = 
		[
			"name" => "Volumes",
			"content" => $this->getVolumesPatch(),
		];
		
		/* Add template patch */
		$template_patch = $template_xml->patch;
		if ($template_patch->exists())
		{
			$modificators[] = 
			[
				"name" => "Template patch",
				"content" => XML::toXml( $template_patch ),
			];
		}
		
		/* Add custom patch */
		$modificators[] = 
		[
			"name" => "Custom patch",
			"content" => $this->custom_patch,
		];
		
		return $modificators;
	}
	
	
	
	/**
	 * Get modificators
	 */
	function updateModificators($template_xml)
	{
		$this->modificators = $this->getModificators($template_xml);
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
		
		/* Get template xml */
		list($template_xml, $errors) = XML::loadXml($template_content);
		if (!$template_xml)
		{
			throw new \Exception("Template XML error: " . implode(". ", $errors));
		}
		
		/* Update modificators */
		$this->updateModificators($template_xml);
		
		/* Patch xml */
		XML::patch($template_xml, $this->modificators);
		
		/* Convert to xml */
		$this->content = XML::toXml($template_xml);
		$this->content_xml = null;
		
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
			$this->set("variables", "_var_app_name_", strtolower($this->name));
			$this->set("variables", "_var_service_name_",
				strtolower($this->stack_name . "_" . $this->name)
			);
			
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
			
			/* Update variables defs */
			$variables_defs = $template_variables;
			$variables_defs[] = [
				"name" => "_var_service_name_",
				"value" => strtolower($this->stack_name . "_" . $this->name),
			];
			$this->variables_defs = $variables_defs;
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
	
	
	
	/**
	 * Patch variables
	 */
	function patchVariables($content)
	{
		$content = XML::patchVariables($content, $this->variables_defs);
		return $content;
	}
	
	
	
	/**
	 * Get content XML
	 */
	function getContentXML()
	{
		if ($this->content_xml == null)
		{
			list($content_xml, $errors) = XML::loadXml($this->content);
			$this->content_xml = $content_xml;
		}
		return $this->content_xml;
	}
}