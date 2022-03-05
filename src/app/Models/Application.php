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
use App\Models\Template;
use App\TemplateHelper;


class Application extends Model
{
	protected $table = "applications";
	protected $primaryKey = "id";
	public $incrementing = true;
	protected $attributes = [
	];
	protected $casts = [
		'variables' => 'array',
		'services' => 'array'
	];
	
	
	
	/**
	 * Get all variables
	 */
	function getAllVariables()
	{
		$vars = $this->variables;
		$current_object_variables = [];
		if (gettype($vars) == "array")
		{
			foreach ($vars as $var)
			{
				$var_name = isset($var["name"]) ? $var["name"] : "";
				if ($var_name)
				{
					$current_object_variables[$var_name] = $var;
				}
			}
		}
		return $current_object_variables;
	}
	
	
	
	/**
	 * Get current variables
	 */
	function getCurrentVariables()
	{
		$result = [];
		$current_object_variables = $this->getAllVariables();
		
		$xml = TemplateHelper::loadXml($this->content);
		if ($xml->variables != null && $xml->variables->getName() == "variables")
		{
			foreach ($xml->variables->children() as $xml_variable)
			{
				if ($xml_variable->getName() == 'variable')
				{
					$var_name = TemplateHelper::clearValue((string)$xml_variable->name);
					if (isset($current_object_variables[$var_name]))
					{
						$result[$var_name] = $current_object_variables[$var_name];
					}
					else
					{
						$var_name = TemplateHelper::clearValue((string)$xml_variable->name);
						$var_label = TemplateHelper::getNames($xml_variable, "label");
						$result[$var_name] =
						[
							"name" => $var_name,
							"value" => "",
							"label" => $var_label,
						];
					}
				}
			}
		}
		
		return $result;
	}
	
	
	
	/**
	 * Get modificators
	 */
	function getModificators()
	{
		$db = app("db");
		
		/* App id */
		$app_id = $this->id;
		
		$modificators = Modificator::query()
			->where("app_id", "=", $app_id)
			->join
			(
				"app_modificators",
				"app_modificators.modificator_id", "=", "modificators.id"
			)
			->get()
			->toArray()
		;
		
		$modificators = array_map
		(
			function ($item)
			{
				return (array)$item;
			},
			$modificators
		);
		
		return $modificators;
	}
	
	
	
	/**
	 * Update modificators
	 */
	function updateModificators($modificators)
	{
		$db = app("db");
		
		/* Get app id */
		$app_id = $this->id;
		
		/* Delete */
		$db::table("app_modificators")
			->where('app_id', $app_id)
			->delete()
		;
		
		/* Insert modificators */
		foreach ($modificators as $modificator_id)
		{
			$db::table("app_modificators")
				->insert
				([
					"app_id" => $app_id,
					"modificator_id" => $modificator_id
				])
			;
		}
	}
	
	
	
	/**
	 * Patch template
	 */
	function patchTemplate()
	{
		/* Get app id */
		$app_id = $this->id;
		$template_id = $this->template_id;
		
		/* Find template */
		$template = Template::find($template_id);
		
		/* Find modificators */
		$modificators = $this->getModificators();
		
		if ($template)
		{
			$xml = $template["content"];
			$xml = TemplateHelper::loadXml($xml);
			if ($xml)
			{
				if (count($modificators) > 0)
				{
					foreach ($modificators as $modificator)
					{
						$patch_xml = $modificator["content"];
						$patch_xml = TemplateHelper::loadXml($patch_xml);
						if ($patch_xml)
						{
							TemplateHelper::patchXml($xml, $patch_xml);
						}
						else
						{
							$err = libxml_get_errors();
							$err = TemplateHelper::getXmlError($err);
							throw new \Exception(
								"Error modificator " .
								$modificator["name"] . "\n" . implode("\n", $err)
							);
						}
					}
				}
				
				if ($this->custom_patch)
				{
					$patch_xml = TemplateHelper::loadXml($this->custom_patch);
					if ($patch_xml)
					{
						TemplateHelper::patchXml($xml, $patch_xml);
					}
					else
					{
						$err = libxml_get_errors();
						$err = TemplateHelper::getXmlError($err);
						throw new \Exception(
							"Error in custom patch\n" . implode("\n", $err)
						);
					}
				}
				
			}
			
			else
			{
				$err = libxml_get_errors();
				$err = TemplateHelper::getXmlError($err);
				throw new \Exception(
					"Error template " . $template->name .
					"\n" . implode("\n", $err)
				);
			}
			
			/* Convert to xml */
			$this->content = TemplateHelper::toXml($xml);
			
			/* Load current variables */
			$current_object_variables = $this->getAllVariables();
			
			/* Add service name */
			$current_object_variables = array_filter($current_object_variables,
				function ($item)
				{
					return $item["name"] != "_var_service_name_";
				}
			);
			$current_object_variables[] =
			[
				"name" => "_var_service_name_",
				"value" => $this->name,
			];
			
			/* Convert to yaml */
			$data = TemplateHelper::xmlToArray($xml->yaml, $current_object_variables);
			$this->yaml_json = json_encode($data);
			$this->yaml = TemplateHelper::toYaml($data);
			
			/* Save */
			$this->save();
		}
		
	}
	
	
	
	/**
	 * Update variables
	 */
	function updateVariables($variable_values = null)
	{
		if ($this->variables == null)
		{
			$this->variables = [];
		}
		
		/* Load current variables */
		$current_object_variables = $this->getAllVariables();
		
		/* Load xml variables */
		$current_xml_variables = [];
		$xml = TemplateHelper::loadXml($this->content);
		$xml_variables = $xml->variables;
		if ($xml_variables)
		{
			foreach ($xml_variables->children() as $xml_variable)
			{
				if ($xml_variable->getName() == 'variable')
				{
					$var_name = TemplateHelper::clearValue((string)$xml_variable->name);
					$var_label = TemplateHelper::getNames($xml_variable, "label");
					if ($var_name != "" && !in_array($var_name, $current_xml_variables))
					{
						$current_xml_variables[$var_name] =
						[
							"name" => $var_name,
							"label" => $var_label,
						];
					}
				}
			}
		}
		
		/* Add new variables */
		foreach ($current_xml_variables as $var_name => $var)
		{
			if (!isset($current_object_variables[$var_name]))
			{
				$current_object_variables[$var_name] =
				[
					"name" => $var_name,
					"value" => "",
				];
			}
			$current_object_variables[$var_name]["label"] = $var["label"];
			if (isset($variable_values[$var_name]))
			{
				$current_object_variables[$var_name]["value"] = $variable_values[$var_name];
			}
		}
		
		/* Remove variables */
		/*
		$delete_variables = [];
		foreach ($current_object_variables as $var)
		{
			$var_name = $var["name"];
			if (!isset($current_xml_variables[$var_name]))
			{
				$delete_variables[] = $var_name;
			}
		}
		foreach ($delete_variables as $var_name)
		{
			if (isset($current_object_variables[$var_name]))
			{
				unset($current_object_variables[$var_name]);
			}
		}
		*/
		
		$this->variables = array_values($current_object_variables);
		
		/* Save */
		$this->save();
	}
	
	
	
	/**
	 * Update services from yaml
	 */
	function updateServicesFromYaml()
	{
		$services = [];
		
		$data = @json_decode($this->yaml_json, true);
		if ($data && isset($data["services"]) && gettype($data["services"]) == "array")
		{
			foreach ($data["services"] as $service_name => $value)
			{
				$services[] = "app_" . $service_name;
			}
		}
		
		$this->services = $services;
		$this->save();
	}
}