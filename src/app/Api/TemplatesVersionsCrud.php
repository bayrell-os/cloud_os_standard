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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Exception\MethodNotAllowedException;
use TinyPHP\RenderContainer;
use TinyPHP\RouteContainer;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;
use TinyPHP\Utils;


class TemplatesVersionsCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = TemplateVersion::class;
	var $api_name = "templates_versions";
	var $template = null;
	var $template_id = 0;
	
	
	/**
	 * Declare routes
	 */
	function routes(RouteContainer $route_container)
	{
		parent::routes($route_container);
	}
	
	
	
	/**
	 * Get rules
	 */
	function getRules()
	{
		return
		[
			new AllowFields
			([
				"fields" =>
				[
					"id",
					"template_id",
					"version",
					"content",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "template_id", "can_create" => true ]),
			new ReadOnly([ "api_name" => "version" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
		];
	}
	
	
	
	/**
	 * Init
	 */
	function init($action)
	{
		if ($action == "actionSearch")
		{
			$this->template_id = (int)$this->container->post("template_id");
			$this->template = Template::getById( $this->template_id );
			if ($this->template == null)
			{
				throw new \TinyPHP\Exception\ItemNotFoundException("Template");
			}
		}
		
		parent::init($action);
	}
	
	
	
	/**
	 * Build search response
	 */
	function buildResponse($action)
	{
		parent::buildResponse($action);
		
		if ($action == "actionSearch")
		{
			$this->api_result->result["template_id"] = $this->template_id;
			$this->api_result->result["template"] = \TinyPHP\Utils::object_intersect
			(
				$this->template->toArray(),
				[
					"id", "uid", "name", "gmtime_created", "gmtime_updated"
				]
			);
		}
	}
	
	
	
	/**
	 * Find query
	 */
	public function buildSearchQuery($action, $query)
	{
		if ($action == "actionSearch")
		{
			$query
				->addWhere("template_id", "=", $this->template_id)
				->orderBy("version", "desc")
			;
		}
		
		return $query;
	}
	
	
	
	/**
	 * Create action
	 */
	function actionCreate(RenderContainer $container)
	{
		throw new MethodNotAllowedException();
	}
	
	
	
	
	/**
	 * Edit action
	 */
	function actionEdit(RenderContainer $container)
	{
		throw new MethodNotAllowedException();
	}
	
	
	
}
