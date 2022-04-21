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


class XMLElement extends \SimpleXMLElement
{
	
	/**
	 * Returns dom element
	 */
	function getDomElement()
	{
		return dom_import_simplexml($this);
	}
	
	
	
	/**
	 * Prepend child
	 */
	function prependChild($name, $content = "")
	{
		$dom = $this->getDomElement();
		$elem = $dom->ownerDocument->createElement($name, $content);
		$item = $dom->insertBefore($elem, $dom->firstChild);
		$item = simplexml_import_dom($item);
		return $item;
	}
	
	
	
	/**
	 * Get attribute
	 */
	function getAttribute($name)
	{
		$attrs = $this->attributes();
		if (isset($attrs[$name]))
		{
			return $attrs[$name];
		}
		return null;
	}
	
	
	
	/**
	 * Remove Attribute
	 */
	function removeAttribute($name)
	{
		$dom = $this->getDomElement();
		$dom->removeAttribute($name);
	}
	 
	
	
	/**
	 * Add and replace attribute
	 */
	function addAttribute($name, $value = NULL, $ns = NULL)
	{
		$attrs = $this->attributes();
		if (isset($attrs[$name]))
		{
			$this->removeAttribute($name);
		}
		parent::addAttribute($name, $value, $ns);
	}
	
	
	
	/**
	 * Remove current element
	 */
	function remove()
	{
		$item = $this->getDomElement();
		$item->parentNode->removeChild($item);
	}
	
	
	
	/**
	 * Returns true if element is exists
	 */
	function exists()
	{
		return $this->getName() != "";
	}
}



class XML
{
	/**
	 * Load xml
	 */
	static function loadXml($xml_str)
	{
		$old_value = libxml_use_internal_errors(true);
		libxml_clear_errors();
		$xml = simplexml_load_string($xml_str, XMLElement::class, LIBXML_NOCDATA);
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
	 * Prepend XML
	 */
	static function prependXml($xml, $prepend)
	{
		$item = null;
		$name = $prepend->getName();
		
		if (count($prepend->children()) == 0)
		{
			$item = $xml->prependChild($name, (string)$prepend);
		}
		else
		{
			$item = $xml->prependChild($name);
			static::appendChildsXml($item, $prepend);
		}
		
		if ($item != null)
		{
			foreach ($prepend->attributes() as $n => $v)
			{
				$item->addAttribute($n, $v);
			}
		}
	}
	
	
	
	/**
	 * Prepend XML
	 */
	static function prependChildsXml($xml, $prepend)
	{
		foreach ($prepend->children() as $child)
		{
			static::prependXML($xml, $child);
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
	static function patch($template_xml, $modificators)
	{
		/* Get patch operations */
		$pos = 0;
		$patch_items = [];
		foreach ($modificators as $modificator)
		{
			$modificator_xml = trim($modificator["content"]);
			
			/* Skip modificator if empty */
			if ($modificator_xml == "") continue;
			
			list($modificator_xml, $errors) = static::loadXml($modificator_xml);
			if (!$modificator_xml)
			{
				throw new \Exception
				(
					"Modificator " . $modificator["name"] .
					" XML error: " . implode(". ", $errors)
				);
			}
			
			/* Add operations from modificator_xml */
			$modificator_priority = (int)( $modificator_xml->priority );
			$operations = $modificator_xml->operations;
			if ($operations && $operations->getName() == 'operations')
			{
				foreach ($operations->children() as $patch_item)
				{
					if ($patch_item->getName() == 'operation')
					{
						$patch_item_priority = (string)( $patch_item->getAttribute("priority") );
						if ($patch_item_priority == "")
						{
							$patch_item_priority = $modificator_priority;
						}
						else
						{
							$patch_item_priority = (int)( $patch_item_priority );
						}
						
						$patch_item->addAttribute("priority", $patch_item_priority);
						$patch_item->addAttribute("pos", $pos);
						$patch_items[] = $patch_item;
						$pos++;
					}
				}
			}
		}
		
		/* Sort operations by priority */
		usort
		(
			$patch_items,
			function ($a, $b)
			{
				$priority_a = (int)( $a->getAttribute("priority") );
				$priority_b = (int)( $b->getAttribute("priority") );
				
				if ($priority_a == $priority_b)
				{
					$pos_a = (int)( $a->getAttribute("pos") );
					$pos_b = (int)( $b->getAttribute("pos") );
					return $pos_a > $pos_b ? 1 : -1;
				}
				
				return $priority_a > $priority_b ? 1 : -1;
			}
		);
		
		/* Execute patch */
		foreach ($patch_items as $patch_item)
		{
			static::patchXml($template_xml, $patch_item);
		}
	}
	
	
	
	/**
	 * Patch xml
	 */
	static function patchXml($xml, $patch_item)
	{
		$type = $patch_item->attributes()->type;
		if ($type == "add")
		{
			static::patchAdd($xml, $patch_item);
		}
		
		else if ($type == "addAttribute")
		{
			static::patchAddAttribute($xml, $patch_item);
		}
		
		else if ($type == "remove")
		{
			static::patchRemove($xml, $patch_item);
		}
	}
	
	
	
	/**
	 * Patch add xml
	 */
	static function patchAdd($xml, $patch_item)
	{
		$path = (string)( $patch_item->path );
		$value = $patch_item->value;
		$notExists = (string)( $patch_item->notExists );
		$position = (string)( $patch_item->attributes()->position );
		$result = $xml->xpath($path);
		
		/* Get not exists */
		if ($notExists != "")
		{
			$notExists = $xml->xpath($notExists);
		}
		
		/* Skip */
		$skip = false;
		if (gettype($notExists) == "array")
		{
			if (count($notExists) > 0) $skip = true;
		}
		
		if (!$skip)
		{
			foreach ($result as $item)
			{
				if ($position == "first")
				{
					static::prependChildsXml($item, $value);
				}
				else
				{
					static::appendChildsXml($item, $value);
				}
			}
		}
	}
	
	
	
	/**
	 * Patch remove
	 */
	static function patchRemove($xml, $patch_item)
	{
		$path = (string)( $patch_item->path );
		$result = $xml->xpath($path);
		foreach ($result as $item)
		{
			$item->remove();
		}
	}
	
	
	
	/**
	 * Patch add attribute
	 */
	static function patchAddAttribute($xml, $patch_item)
	{
		$attr_name = (string)( $patch_item->name );
		$attr_value = (string)( $patch_item->value );
		$path = (string)( $patch_item->path );
		
		$result = $xml->xpath($path);
		foreach ($result as $item)
		{
			$item->addAttribute($attr_name, $attr_value);
		}
	}
	
	
	
	/**
	 * Clear value
	 */
	static function trimValue($value)
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
					
					/* Value type */
					$type = (string) ($item->attributes()->type);
					$trim = (string) ($item->attributes()->trim);
					
					/* Trim */
					if ($trim != "false" && gettype($value) == "string")
					{
						$value = static::trimValue($value);
					}
					
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
						$value = [ $value ];
						/*
						if (gettype($value) != "array")
						{
							$value = [ $value ];
						}*/
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
						if ($type == "array" || $type == "map" || gettype($value) == "array")
						{
							$res[$key] = array_merge($res[$key], $value);
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