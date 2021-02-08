#!/usr/bin/php
<?php

define ('ROOT_PATH', __DIR__);
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(10);

// Include vendor
// require ROOT_PATH . "/vendor/autoload.php";

/* Include loader */
include ROOT_PATH . "/lib/Runtime/php/Loader.php";

/* Include enviroments */
$env = include ROOT_PATH . "/env.php";

/* Run app */
$loader = ( new \Runtime\Loader() )
	->addIncludePath( ROOT_PATH . "/app" )
	->addIncludePath( ROOT_PATH . "/lib" )
	->setArgs($argv)
	->setEnv($env)
	->setMainModule("Bayrell.CloudOS")
	->setMainClass("Bayrell.CloudOS.Backend")
;

/* Create context */
$context = $loader->startContext();

/* Get bus */
$bus = $context->getDriver($context, "system_bus");

/* Settings */
$input = file_get_contents("php://stdin");
$obj = \Runtime\rtl::json_decode($context, $input);

/* Create request */
$request = new \Runtime\Web\App\RemoteCallRequest($context, $obj);

/* Call bus */
$answer = $bus->remoteBusCall($context, $request);

/* Answer */
$res = $answer->takeDict($context)->intersect
(
	$context,
	\Runtime\Dict::from
	([
		"app_name",
		"object_name",
		"interface_name",
		"method_name",
		"code",
		"success_message",
		"error_message",
		"error_name",
		"have_answer",
		"response",
	])
);
echo \Runtime\RuntimeUtils::json_encode($context, $res) . "\n";