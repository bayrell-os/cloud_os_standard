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

namespace App;

use Symfony\Component\Yaml\Yaml;


class XML
{
	/**
	 * Load xml
	 */
	static function loadXml($xml_str)
	{
		$old_value = libxml_use_internal_errors(true);
		libxml_clear_errors();
		$xml = simplexml_load_string($xml_str, "SimpleXMLElement", LIBXML_NOCDATA);
		$errors = static::getErrors();
		libxml_use_internal_errors($old_value);
		return [$xml, $errors];
	}
	
	
	
	/**
	 * Get errors
	 */
	static function getErrors()
	{
		$res = [];
		foreach(libxml_get_errors() as $error)
		{
			$res[] = $error->message;
		}
		return $res;
	}
	
	
	
	/**
	 * To xml
	 */
	static function toXml($xml)
	{
		if ($xml == null) return "";
		$xml_str = $xml->asXml();
		$xml_str = tidy_repair_string($xml_str, ['input-xml'=> 1, 'indent' => 1, 'wrap' => 0]);
		return $xml_str;
	}
	
	
	
	/**
	 * Append XML
	 */
	static function appendXml($xml, $append)
	{
		$item = null;
		$name = $append->getName();
		
		if (count($append->children()) == 0)
		{
			$item = $xml->addChild($name, (string)$append);
		}
		else
		{
			$item = $xml->addChild($name);
			static::appendChildsXml($item, $append);
		}
		
		if ($item != null)
		{
			foreach ($append->attributes() as $n => $v)
			{
				$item->addAttribute($n, $v);
			}
		}
		
	}
	
	
	
	/**
	 * Append XML
	 */
	static function appendChildsXml($xml, $append)
	{
		foreach ($append->children() as $child)
		{
			static::appendXML($xml, $child);
		}
	}
	
	
	
	/**
	 * Add xml
	 */
	static function addXml($xml, $data)
	{
		foreach ($data as $key => $value)
		{
			if (is_array($value))
			{
				$new_xml = $xml->addChild($key);
				static::addXml($new_xml, $value);
			}
			else
			{
				$xml->addChild($key, $value);
			}
		}
	}
	
	
	
	/**
	 * Get variables
	 */
	static function getVariables($xml)
	{
		$res = [];
		$variables = $xml->variables;
		if ($variables && $variables->getName() == "variables")
		{
			foreach ($variables->children() as $variable)
			{
				if ($variable->getName() == "variable")
				{
					$name = (string)$variable->name;
					$label = (string)$variable->label;
					$type = (string)$variable->type;
					$res[] =
					[
						"name" => $name,
						"label" => $label,
						"type" => $type,
					];
				}
			}
		}
		return $res;
	}
	
	
	
	/**
	 * Patch
	 */
	static function patch($template_content, $modificators)
	{
		list($template_xml, $errors) = static::loadXml($template_content);
		if (!$template_xml)
		{
			throw new \Exception("Template XML error: " . implode(". ", $errors));
		}
		
		foreach ($modificators as $modificator)
		{
			$modificator_xml = $modificator["content"];
			list($modificator_xml, $errors) = static::loadXml($modificator_xml);
			if (!$modificator_xml)
			{
				throw new \Exception
				(
					"Modificator " . $modificator["name"] .
					" XML error: " . implode(". ", $errors)
				);
			}
			
			static::patchXml($template_xml, $modificator_xml);
		}
		
		return $template_xml;
	}
	
	
	
	/**
	 * Patch xml
	 */
	static function patchXml($xml, $patch_xml)
	{
		$operations = $patch_xml->operations;
		if ($operations && $operations->getName() == 'operations')
		{
			foreach ($operations->children() as $patch_item)
			{
				if ($patch_item->getName() == 'operation')
				{
					$type = $patch_item->attributes()->type;
					$path = $patch_item->path;
					$value = $patch_item->value;
					if ($type == "add")
					{
						static::patchAdd($xml, $path, $value);
					}
				}
			}
		}
	}
	
	
	
	/**
	 * Patch add xml
	 */
	static function patchAdd($xml, $path, $value)
	{
		$result = $xml->xpath($path);
		foreach ($result as $item)
		{
			static::appendChildsXml($item, $value);
		}
	}
	
	
	
	/**
	 * Clear value
	 */
	static function clearValue($value)
	{
		$value = trim($value, " \n\r\t\v\0");
		return $value;
	}
	
	
	
	/**
	 * Returns yaml
	 */
	static function patchVariables($s, $variables)
	{
		foreach ($variables as $var)
		{
			$var_name = $var["name"];
			$var_value = $var["value"];
			$s = str_replace($var_name, $var_value, $s);
		}
		return $s;
	}
	
	
	
	/**
	 * Returns yaml
	 */
	static function xmlToArray($xml, $variables)
	{
		if ($xml instanceof \SimpleXMLElement)
		{
			$childs = $xml->children();
			if (count($childs) == 0)
			{
				return (string)$xml;
			}
			else
			{
				$res = [];
				foreach ($childs as $item)
				{
					$key = $item->getName();
					$value = static::xmlToArray($item, $variables);
					
					/* Set key by node name */
					$node_name = (string)$item->attributes()->node_name;
					if ($node_name != "")
					{
						$key = $node_name;
					}
					
					/* Patch variables */
					$key = static::patchVariables($key, $variables);
					$value_type = gettype($value);
					if ($value_type == "string")
					{
						$value = static::patchVariables($value, $variables);
					}
					
					/* Trim */
					if ($trim != "false" && gettype($value) == "string")
					{
						$value = static::clearValue($value);
					}
					
					/* Value type */
					$type = (string) ($item->attributes()->type);
					$trim = (string) ($item->attributes()->trim);
					if ($type == "boolean" || $type == "bool")
					{
						if (mb_strtolower($value) == "true" || $value == "1") $value = true;
						else $value = false;
					}
					else if ($type == "number" || $type == "integer" || $type == "int")
					{
						$value = (int)$value;
					}
					else if ($type == "float")
					{
						$value = (float)$value;
					}
					else if ($type == "array")
					{
						if (gettype($value) != "array")
						{
							$value = [ $value ];
						}
					}
					else if ($type == "map")
					{
						if (gettype($value) != "array")
						{
							$value = [];
						}
					}
					
					/* Set result */
					if (isset($res[$key]))
					{
						if (gettype($res[$key]) != "array")
						{
							$res[$key] = [ $res[$key] ];
						}
						if ($type == "array")
						{
							$res[$key] = array_concat($res[$key], $value);
						}
						else
						{
							$res[$key][] = $value;
						}
					}
					else
					{
						$res[$key] = $value;
					}
					
				}
				
				return $res;
			}
		}
		
		return null;
	}
	
	
	
	/**
	 * To yaml
	 */
	static function toYaml($data)
	{
		$yaml = Yaml::dump($data, 10, 2);
		return $yaml;
	}	
}