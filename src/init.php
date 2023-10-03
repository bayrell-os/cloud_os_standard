<?php

ini_set('display_errors', 1);

/* Обработчик ошибок */
set_exception_handler( function ($e){
	
	if (!$e) return;
	
	http_response_code(500);
	
	$message = "Fatal Error:\n";
	$message .= $e->getMessage() . "\n";
	$message .= "in file " . $e->getFile() . ":" . $e->getLine() . "\n";
	$message .= $e->getTraceAsString() . "\n";
	
	if (php_sapi_name() === 'cli')
	{
		echo \Runtime\io::color("red", $message);
	}
	else
	{
		echo nl2br($message);
	}
	
	exit (1);
} );

define( "BASE_PATH", __DIR__ );
$loader = require_once BASE_PATH . "/vendor/autoload.php";

/* Add autoloader */
$loader->addPsr4("Bayrell\\CloudOS\\",  __DIR__ . "/source/php");
$loader->addPsr4("Runtime\\",  __DIR__ . "/lib/Runtime/php");
$loader->addPsr4("Runtime\\Console\\",  __DIR__ . "/lib/Runtime.Console/php");
$loader->addPsr4("Runtime\\Crypt\\",  __DIR__ . "/lib/Runtime.Crypt/php");
$loader->addPsr4("Runtime\\ORM\\",  __DIR__ . "/lib/Runtime.ORM/php");
$loader->addPsr4("Runtime\\Unit\\",  __DIR__ . "/lib/Runtime.Unit/php");
$loader->addPsr4("Runtime\\Web\\",  __DIR__ . "/lib/Runtime.Web/php");
$loader->addPsr4("Runtime\\Web\\Crud\\",  __DIR__ . "/lib/Runtime.Web.Crud/php");

/* Create context */
$context = \Runtime\rtl::createContext([
	"entry_point" => ENTRY_POINT,
	"environments" => \Runtime\Dict::from([
		"DEBUG" => true,
		"LOCALE" => "en_US",
		"LOCALE_CODE" => "en",
	]),
	"modules" => [
		"Bayrell.CloudOS"
	],
	"cli_args" => \Runtime\Collection::from($argv),
]);

/* Start context */
$context->start($context);
