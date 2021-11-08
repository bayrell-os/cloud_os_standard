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
use App\Models\ApplicationTemplate;
use App\Template;


class Application extends Model
{
	protected $table = "applications";
	protected $primaryKey = "id";
	public $incrementing = true;
	protected $attributes = [
	];
	
	
	
	/**
	 * Get modificators
	 */
	function getModificators()
	{
		$db = app("db");
		
		/* App id */
		$app_id = $this->id;
		
		$modificators = $db::query()
			->from("applications_modificators")
			->where("app_id", "=", $app_id)
			->join
			(
				"app_modificators",
				"applications_modificators.modificator_id", "=", "app_modificators.id"
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
		$db::table("applications_modificators")
			->where('app_id', $app_id)
			->delete()
		;
		
		/* Insert modificators */
		foreach ($modificators as $modificator_id)
		{
			$db::table("applications_modificators")
				->insert
				([
					"app_id" => $app_id,
					"modificator_id" => $modificator_id
				])
			;
		}
	}
	
	
	
	/**
	 * Update template
	 */
	function updateTemplate()
	{
		$db = app("db");
		
		/* Get app id */
		$app_id = $this->id;
		$template_id = $this->template_id;
		
		/* Find template */
		$template = ApplicationTemplate::find($template_id);
		
		/* Find modificators */
		$modificators = $this->getModificators();
		
		if ($template && count($modificators) > 0)
		{
			$xml = $template["content"];
			$xml = Template::loadXml($xml);
			if ($xml)
			{
				foreach ($modificators as $modificator)
				{
					$patch_xml = $modificator["content"];
					$patch_xml = Template::loadXml($patch_xml);
					if ($patch_xml)
					{
						Template::patchXml($xml, $patch_xml);
					}
				}
			}
			
			/* Convert to xml */
			$this->content = Template::toXml($xml);
			
			/* Convert to yaml */
			$data = Template::xmlToArray($xml);
			$this->yaml = Template::toYaml($data["yaml"]);
			
			/* Save */
			$this->save();
		}
		
	}
}