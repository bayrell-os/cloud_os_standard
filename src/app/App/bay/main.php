<?php

global $app_arguments;
$app_arguments = $argv;


function app_init($basepath)
{
	global $app_arguments;
	
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
	
	$app
		->set_args( $app_arguments )
		->base_path( $basepath )
		->add_src( $basepath . "/app" )
		->add_src( $basepath . "/lib" )
		->create_context("Runtime.Context", "App", $env)
	;
	
	return $app;
}


function run_web($basepath)
{
	$app = app_init($basepath)->run("Runtime.Web.Backend.Entry", "run");
	exit($app->return_code);
}


function run_cron($basepath)
{
	$app = app_init($basepath)->run("Runtime.Cron.Entry", "run");
	exit($app->return_code);
}

