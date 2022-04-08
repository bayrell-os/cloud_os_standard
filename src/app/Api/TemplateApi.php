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

namespace App\Api;

use App\Docker;
use App\Api\ApplicationsCrud;
use App\Models\Application;
use App\Models\Template;
use App\Models\TemplateVersion;
use App\XML;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Exception\MethodNotAllowedException;
use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;
use TinyPHP\Utils;


class TemplateApi extends \TinyPHP\ApiRoute
{
	var $update_data = null;
    var $xml_id = null;
    var $xml_name = null;
    var $xml_version = null;
    var $template = null;
    var $template_version = null;
    var $old_data = null;
    var $new_data = null;
	
    
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
		
		$route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/template/import/",
			"name" => "api:template:import",
			"method" => [$this, "actionImport"],
		]);
		
        $route_container->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/template/edit/{id}/",
			"name" => "api:template:edit",
			"method" => [$this, "actionImport"],
		]);
        
	}
    
	
	
	/**
	 * Init api
	 */
	function initUpdateData()
	{
		$post = $this->container->post();
		if ($post == null || (gettype($post) == "array" && count($post) == 0))
		{
			throw new \Exception("Post is null");
		}
		
		$update_data = Utils::attr($post, "item");
		if ($update_data === null)
		{
			throw new \Exception("Post item is empty");
		}
		
		$this->update_data = $this->toDatabase($update_data);
    }
    
    
    
    /**
	 * To database
	 */
	function toDatabase($item)
	{
		return $item;
	}
    
	
	
	/**
	 * From database
	 */
	function fromDatabase($item)
	{
		if ($item instanceof \TinyORM\Model)
		{
			$item = $item->toArray();
		}
		return $item;
	}
	
	
	
	/**
	 * Parse template
	 */
	function parseTemplate()
	{
		$content = isset($this->update_data["content"]) ? $this->update_data["content"] : "";
		if ($content == "")
		{
			throw new \Exception("Template is empty");
		}
		
		list($xml, $errors) = XML::loadXml($content);
		if (!$xml)
		{
			throw new \Exception("XML error: " . implode(". ", $errors));
		}
		
		$this->xml_id = (string)$xml->id;
		$this->xml_name = (string)$xml->name;
		$this->xml_version = (string)$xml->version;
		
		/* Get existing template if edit */
		if ($this->container->route->name == "api:template:edit")
		{
			$template_id = $this->container->arg("id");
			$this->template_version = TemplateVersion::selectQuery()
				->where([
					["id", "=", $template_id],
				])
				->one()
			;
		}
		
		/* Find template */
		if ($this->template == null)
		{
			$this->template = Template::selectQuery()
				->where([
					["uid", "=", $this->xml_id],
				])
				->one()
			;
		}
		
		/* Find template version */
		if ($this->template)
		{
			if ($this->template_version == null)
			{
				$this->template_version = TemplateVersion::selectQuery()
					->where([
						["template_id", "=", $this->template->id],
						["version", "=", $this->xml_version],
					])
					->one()
				;
			}
		}
		
		$this->old_data = $this->template_version ? $this->template_version->toArray() : [];
	}
	
    
	
	/**
	 * Import template
	 */
	function actionImport()
	{
		$this->initUpdateData();
		$this->parseTemplate();
		
		/* Create template if need */
		if ($this->template == null)
		{
			$this->template = new Template();
			$this->template->uid = $this->xml_id;
			$this->template->name = $this->xml_name;
			$this->template->save()->refresh();
		}
		
		/* Create template version */
		if ($this->template_version == null)
		{
			$this->template_version = new TemplateVersion();
		}
		
		/* Edit template version */
		$this->template_version->template_id = $this->template->id;
		$this->template_version->version = $this->xml_version;
		$this->template_version->content = $this->update_data["content"];
		$this->new_data = $this->template_version->save()->refresh();
		
		/* Create result */
		$old_data = $this->fromDatabase($this->old_data);
		$new_data = $this->fromDatabase($this->new_data);
		
		$result =
		[
			"old_data" => $old_data,
			"new_data" => $new_data,
		];
		
		$this->api_result->success($result, "Ok");
	}
	
}
