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
					$type = (string)$variable->type;
					$res[] =
					[
						"name" => $name,
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
	static function patch($template_content, $modificators, $variables)
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
	
}