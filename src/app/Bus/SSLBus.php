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

namespace App\Bus;

use TinyPHP\BusApiRoute;
use TinyPHP\RenderContainer;
use TinyPHP\RouteList;
use TinyPHP\Utils;
use App\Models\Domain;
use App\Models\DomainSSLGroup;
use App\Models\NginxFile;


class SSLBus extends BusApiRoute
{
	
	/**
	 * Declare routes
	 */
	function routes(RouteList $routes)
	{
		$routes->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/bus/ssl/get_group/",
			"name" => "bus:ssl:get_group",
			"method" => [$this, "actionGetGroup"],
		]);
		$routes->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/bus/ssl/update_group/",
			"name" => "bus:ssl:update_group",
			"method" => [$this, "actionUpdateGroup"],
		]);
		$routes->addRoute([
			"methods" => [ "POST" ],
			"url" => "/api/bus/ssl/get_changes/",
			"name" => "bus:ssl:get_changes",
			"method" => [$this, "actionGetChanges"],
		]);
	}
	
	
	
	/**
	 * Returns group
	 */
	function actionGetGroup()
	{
		$data = $this->container->post("data");
		$group_id = trim(isset($data["group_id"]) ? $data["group_id"] : "");
		
		$result = [
			"group" => null,
			"group_id" => $group_id,
			"domains" => [],
		];
		
		/* Find group by id */
		$ssl = DomainSSLGroup::getByID($group_id);
		if (!$ssl)
		{
			throw new \TinyPHP\Exception\ItemNotFoundException("group");
		}
		
		$result["group"] = [
			"id" => $ssl->id,
			"name" => $ssl->name,
			"container_name" => $ssl->container_name,
			"cert_info" => @json_decode($ssl->cert_info),
			"public_key" => $ssl->public_key,
			"private_key" => $ssl->private_key,
			"gmtime_created" => $ssl->gmtime_created,
			"gmtime_updated" => $ssl->gmtime_updated,
		];
		
		/* Search domains */
		$domains = Domain::selectQuery()
			->fields("domain_name")
			->where("ssl_id", $ssl->id)
			->all(1)
		;
		$domains = array_map(
			function ($item){ return $item["domain_name"]; },
			$domains
		);
		$result["domains"] = $domains;
		
		$this->api_result->success( $result, "Ok" );
	}
	
	
	
	/**
	 * Update group
	 */
	function actionUpdateGroup()
	{
		$result = [];
		
		$data = $this->container->post("data");
		$group_id = trim(isset($data["group_id"]) ? $data["group_id"] : "");
		$private_key = trim(isset($data["private_key"]) ? $data["private_key"] : "");
		$public_key = trim(isset($data["public_key"]) ? $data["public_key"] : "");
		
		/* Find group by id */
		$ssl = DomainSSLGroup::getByID($group_id);
		if (!$ssl)
		{
			throw new \TinyPHP\Exception\ItemNotFoundException("group");
		}
		
		/* Save certificate info to database */
		$res = @openssl_x509_read($public_key);
		if ($res)
		{
			$cert_info = openssl_x509_parse($res);
			$ssl->cert_info = json_encode($cert_info);
			$ssl->public_key = $public_key;
			$ssl->private_key = $private_key;
			$ssl->save();
			
			/* Save keys */
			$ssl_id = $ssl->id;
			NginxFile::updateFile("/ssl/" . $ssl_id. "/public.key", $public_key);
			NginxFile::updateFile("/ssl/" . $ssl_id. "/private.key", $private_key);
		}
		
		$this->api_result->success( $result, "Ok" );
	}
	
	
	
	/**
	 * Returns changes
	 */
	function actionGetChanges()
	{
		$result = [];
		
		$data = $this->container->post("data");
		$timestamp = (int)(isset($data["timestamp"]) ? $data["timestamp"] : 0);
		
		$groups = DomainSSLGroup::selectQuery()
			->where([
				["gmtime_updated", ">=", gmdate("Y-m-d H:i:s", $timestamp)]
			])
			->all(1)
		;
		
		$groups = array_map(
			function($group)
			{
				$group["cert_info"] = @json_decode($group["cert_info"]);
				return $group;
			},
			$groups
		);
		
		$this->api_result->success( $groups, "Ok" );
	}
	
}