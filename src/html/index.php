<?php

define ('ROOT_PATH', dirname(__DIR__));
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(30);

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
	->setEnv($env)
	->setMainModule("Bayrell.CloudOS")
	->setMainClass("Bayrell.CloudOS.Backend")
	->setEntryPoint("Runtime.Web.App.CGI")
	->run();

exit($loader->exit_code);