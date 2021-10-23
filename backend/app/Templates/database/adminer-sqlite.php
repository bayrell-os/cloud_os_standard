<?php

function adminer_object_1()
{
  
	class AdminerSoftware extends Adminer
	{
		function database()
		{
			return '/data/cloud_os.db';
		}
		function login($login, $password)
		{
			// validate user submitted credentials
			return ($login == 'admin' && $password == 'admin');
		}
	
		/*
		function name() {
		  // custom name in title and heading
		  return 'Adminer';
		}

		function permanentLogin() {
		  // key used for permanent login
		  return '0e4d408c0499c423b71dc3022ed88115';
		}

		function credentials() {
		  // server, username and password for connecting to database
		  return array('localhost', 'ODBC', '');
		}

		function database() {
		  // database name, will be escaped by Adminer
		  return '';
		}

		function login($login, $password) {
		  // validate user submitted credentials
		  return ($login == 'admin' && $password == 'admin');
		}

		function tableName($tableStatus) {
		  // tables without comments would return empty string and will be ignored by Adminer
		  return h($tableStatus['Comment']);
		}

		function fieldName($field, $order = 0) {
		  // only columns with comments will be displayed and only the first five in select
		  return ($order <= 5 && !preg_match('~_(md5|sha1)$~', $field['field']) ? h($field['comment']) : '');
		}
		*/
	}
  
  return new AdminerSoftware;
}

function adminer_object() {
	include_once __DIR__ . "/plugin.php";
	include_once __DIR__ . "/login-password-less.php";
	return new AdminerPlugin(array(
		// TODO: inline the result of password_hash() so that the password is not visible in source codes
		new AdminerLoginPasswordLess(password_hash("admin", PASSWORD_DEFAULT)),
	));
}

include __DIR__ . '/adminer-4.7.6.php';
#include __DIR__ . '/adminer-4.4.0.php';
#include __DIR__ . '/adminer-4.3.1.php';
#include __DIR__ . '/adminer-4.2.5.php';
//throw new \Exception("123");
//$a = 1 / 0;