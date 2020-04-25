<?php


function run_web($basepath)
{
	set_time_limit(30);
	error_reporting(E_ALL);
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);
	ini_set("track_errors", 1);
	ini_set("html_errors", 1);
	
	include $basepath . "/lib/Runtime/php/loader.php";
	
	$app = new Loader();
	$env = [
		"AUTH_PRIVATE_KEY" => file_get_contents("/run/secrets/AUTH_PRIVATE_KEY"),
		"AUTH_PUBLIC_KEY" => file_get_contents("/run/secrets/AUTH_PUBLIC_KEY"),
	];
	
	try
	{
		$app
			->main_module( "App" )
			->base_path( $basepath )
			->set_env( $env )
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
}
