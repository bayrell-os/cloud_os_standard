<?php

define( "BASE_PATH", __DIR__ );
$loader = require_once BASE_PATH . "/vendor/autoload.php";

/* Add autoloader */
$loader->addPsr4("Bayrell\\CloudOS\\",  __DIR__ . "/source/php");
$loader->addPsr4("Runtime\\",  __DIR__ . "/lib/Runtime/php");
$loader->addPsr4("Runtime\\Crypt\\",  __DIR__ . "/lib/Runtime.Crypt/php");
$loader->addPsr4("Runtime\\ORM\\",  __DIR__ . "/lib/Runtime.ORM/php");
$loader->addPsr4("Runtime\\Web\\",  __DIR__ . "/lib/Runtime.Web/php");
$loader->addPsr4("Runtime\\Web\\Crud\\",  __DIR__ . "/lib/Runtime.Web.Crud/php");

/* Create context */
$context = \Runtime\rtl::createContext([
	"entry_point" => "Bayrell.CloudOS.Main",
	"environments" => \Runtime\Dict::from([
		"DEBUG" => true,
		"LOCALE" => "en_US",
		"LOCALE_CODE" => "en",
	]),
	"modules" => [
		"Bayrell.CloudOS"
	],
]);

/* Start context */
$context->start($context);
