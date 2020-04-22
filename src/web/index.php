<?php

set_time_limit(60);
error_reporting(E_ALL);
ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
ini_set("track_errors", 1);
ini_set("html_errors", 1);
$basepath = dirname(__DIR__);

include "../lib/Runtime/php/loader.php";
$app = new Loader();

try
{
	$app
		->main_class( "App.AppServer" )
		->base_path( $basepath )
		->add_src( $basepath . "/app" )
		->add_src( $basepath . "/lib" )
		->run_web_request()
	;
}
catch (\Exception $ex)
{
	$app->exception($ex);
}

exit($app->return_code);
