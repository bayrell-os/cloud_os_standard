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
    
}