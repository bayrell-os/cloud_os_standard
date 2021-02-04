#!/usr/bin/php
<?php

define ('ROOT_PATH', __DIR__);
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(600);

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
	->setEntryPoint("Runtime.Task.Entry")
	->run();

exit($loader->exit_code);
