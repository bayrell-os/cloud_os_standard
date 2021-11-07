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


class Template
{
	
	/**
	 * Load xml
	 */
	static function loadXml($xml)
	{
		$xml = simplexml_load_string($xml, "SimpleXMLElement", LIBXML_NOCDATA);
		return $xml;
	}
	
	
	
	/**
	 * Parse xml
	 */
	static function parseXml($xml)
	{
		$xml = static::loadXml($xml);
		$data = json_decode(json_encode($xml), true);
		return $data;
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
	 * Create xml
	 */
	static function createXml($data, $root)
	{
		$xml = new \SimpleXMLElement
		(
			'<?xml version="1.0" encoding="UTF-8"?>'.
			'<'.$root.'></'.$root.'>'
		);
		static::addXml($xml, $data);
		return $xml;
	}
	
	
	
	/**
	 * To xml
	 */
	static function toXml($data, $root)
	{
		$xml = static::createXml($data, $root);
		return static::saveXml($xml);
	}
	
	
	
	/**
	 * Save xml
	 */
	static function saveXml($xml)
	{
		$xml_str = $xml->asXml();
		$xml_str = tidy_repair_string($xml_str, ['input-xml'=> 1, 'indent' => 1, 'wrap' => 0]);
		return $xml_str;
	}
	
	
	
	/**
	 * Patch xml
	 */
	static function patch($xml, $patch)
	{
		$patch_xml = static::loadXml($patch);
		$operations = $patch_xml->operations;
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
		foreach($append->children() as $child)
		{
			static::appendXML($xml, $child);
		}
	}
	
	
	
	/**
	 * Parse yaml
	 */
	static function parseYaml($xml)
	{
		$value = Yaml::parse($xml);
		return $value;
	}
	
	
	
	/**
	 * To yaml
	 */
	static function toYaml($data)
	{
		$yaml = Yaml::dump($data, 5);
		return $yaml;
	}
}