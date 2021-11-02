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
use App\Models\ApplicationFile;
use FastRoute\RouteCollector;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Utils;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\ReadOnly;


class ApplicationsFilesCrud extends \TinyPHP\ApiCrudRoute
{
	var $class_name = ApplicationFile::class;
	var $api_path = "applications_files";

	
	/**
	 * Declare routes
	 */
	function routes(RouteCollector $routes)
	{
		parent::routes($routes);
		$routes->addRoute
		(
			'POST',
			'/' . $this->api_path . '/default/compose/{id}/',
			[$this, "actionCompose"]
		);
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
					"file_name",
					"stack_name",
					"content",
					"app_status",
					"timestamp",
					"is_deleted",
					"gmtime_created",
					"gmtime_updated",
				]
			]),
			new ReadOnly([ "api_name" => "id" ]),
			new ReadOnly([ "api_name" => "gmtime_created" ]),
			new ReadOnly([ "api_name" => "gmtime_updated" ]),
		];
	}

	
	
	/**
	 * Find query
	 */
	public function findQuery($query)
	{
		return $query
			->orderBy("file_name", "asc")
		;
	}
	
	
	
	/**
	 * Compose
	 */
	public function actionCompose($container)
	{
		$post = json_decode($container->request->getContent(), true);
		if ($post == null)
		{
			throw new \Exception("Post is null");
		}
		
		$data = Utils::attr($post, "item");
		if ($data === null)
		{
			throw new \Exception("Field item is empty");
		}
		
		/* Find item */
		$this->findItem();
		
		if ($this->item == null)
        {
            throw new ItemNotFoundException();
        }
		
		/* From database */
		$item = $this->fromDatabase($this->item);
		
		/* Save all files */
		$applications = Application::query()->get()->toArray();
		foreach ($applications as $row)
		{
			$row_name = $row["name"];
			$row_stack_name = $row["stack_name"];
			$row_content = $row["content"];
			$file_path = "/data/yaml/" . $row_stack_name . "/" . $row_name;
			$file_dirname = dirname($file_path);
			@mkdir($file_dirname, 0755, true);
			file_put_contents($file_path, $row_content);
		}
		
		/* Compose */
		$yaml_file_path = "/data/yaml/" . $item["stack_name"] . "/" . $item["name"];
		$cmd = "sudo docker stack deploy -c " . $yaml_file_path . " " .
			$item["stack_name"] . " --with-registry-auth";
		$result = Docker::exec($cmd . " 2>&1");
		
		/* Set result */
		return $container->setResponse
		(
			$this
				->api_result
				->success(["item"=>$item], $result)
				->getResponse()
		);
	}
}
