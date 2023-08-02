<?php

define ('ROOT_PATH', dirname(__DIR__));
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(30);

/* Create context */
$context = \Runtime\rtl::createContext([
	"entry_point" => "Bayrell.CloudOS.Main",
	"modules" => [
		"Bayrell.CloudOS"
	],
]);

/* Start context */
$context->start($context);

/* Run web app */
$context = \Runtime\rtl::getContext();
$context->run($context);
