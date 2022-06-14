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

namespace App;


class JWT extends \TinyPHP\Crypt\JWT
{
	
	var $login = "";
	var $expires = 0;
	
	
	/**
	 * Check expired
	 */
	function isExpired()
	{
		return $this->expires < time();
	}
	
	
	
	/**
	 * Set data
	 */
	function setData($data)
	{
		$this->login = isset($data["l"]) ? $data["l"] : "";
		$this->expires = isset($data["e"]) ? $data["e"] : 0;
	}
	
	
	
	/**
	 * Get data
	 */
	function getData()
	{
		return [
			"l" => $this->login,
			"e" => $this->expires,
		];
	}
	
	
	
	/**
	 * To array
	 */
	function toArray()
	{
		return [
			"login" => $this->login,
			"expires" => $this->expires,
		];
	}
	
	
	
	/**
	 * Get private key
	 */
	function getPrivateKey()
	{
		$private_key = env("JWT_PRIVATE_KEY");
		$res = json_decode( $private_key );
		if ($res) return $res;
		return $private_key;
	}
	
	
	
	/**
	 * Get public key
	 */
	function getPublicKey()
	{
		$private_key = env("JWT_PUBLIC_KEY");
		$res = json_decode( $private_key );
		if ($res) return $res;
		return $private_key;
	}
	
	
	
	/**
	 * Get type
	 */
	function getType()
	{
		return "RS256";
	}
	
	
}