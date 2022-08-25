<?php

/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
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

use App\Models\Domain;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use TinyPHP\ApiResult;
use TinyPHP\Rules\AllowFields;
use TinyPHP\Rules\Dictionary;
use TinyPHP\Rules\JsonField;
use TinyPHP\Rules\ReadOnly;
use TinyPHP\Exception\ItemNotFoundException;


class SpacesDomainsCrud extends \TinyPHP\ApiCrudRoute
{   
	var $class_name = Domain::class;
	var $api_name = "spaces_domains";
	
	function actionSearch(){}
	function actionGetById(){}
	
	
	/**
	 * Do create
	 */
	function actionCreate()
	{
		$this->initUpdateData("actionCreate");
		
		$domain_name = isset($this->update_data["domain_name"])
			? $this->update_data["domain_name"] : ""
		;
		$domain = Domain::selectQuery()
			->where("domain_name", $domain_name)
			->where("space_id", null)
			->one()
		;
		
		if (!$domain)
		{
			throw new ItemNotFoundException("Domain");
		}
		
		$space_id = $this->container->post("space_id");
		
		$domain->space_id = $space_id;
		$domain->save();
		
		$domain = $domain->toArray(["space_id", "domain_name"]);
		
		$this->api_result->result["new_data"] = $domain;
		$this->api_result->success( $result, "Ok" );
	}
	
	
	
	/**
	 * Do update
	 */
	function actionUpdate()
	{
		throw new \Exception("Update is not allowed");
	}
	
	
	
	/**
	 * Do delete
	 */
	function actionDelete()
	{
		$pk = $this->container->post("pk");
		
		$space_id = isset($pk["space_id"]) ? $pk["space_id"] : null;
		$domain_name = isset($pk["domain_name"]) ? $pk["domain_name"] : null;
		
		$domain = Domain::selectQuery()
			->where("domain_name", $domain_name)
			->where("space_id", $space_id)
			->one()
		;
		
		if (!$domain)
		{
			throw new ItemNotFoundException("Domain");
		}
		
		$domain->space_id = null;
		$domain->save();
		
		$domain = $domain->toArray(["space_id", "domain_name"]);
		
		$this->api_result->result["old_data"] = $domain;
		$this->api_result->success( $result, "Ok" );
	}
	
}
