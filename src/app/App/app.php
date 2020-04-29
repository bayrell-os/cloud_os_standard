<?php

set_time_limit(30);
error_reporting(E_ALL);
if (php_sapi_name() != "cli")
{
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);
	ini_set("track_errors", 1);
}
else
{
	ini_set("display_errors", 0);
	ini_set("display_startup_errors", 0);
	ini_set("track_errors", 1);
}


//ini_set("html_errors", 1);

$basepath = dirname(dirname(__DIR__));
include $basepath . "/lib/Runtime/php/loader.php";

$app = new Loader();
$env = getenv();
$env = array_merge
(
	$env,
	[
		"AUTH_PRIVATE_KEY" => file_get_contents("/run/secrets/AUTH_PRIVATE_KEY"),
		"AUTH_PUBLIC_KEY" => file_get_contents("/run/secrets/AUTH_PUBLIC_KEY"),
	]
);

if (!isset($argv))
{
	$argv = [];
}

$app
	->set_args( $argv )
	->base_path( $basepath )
	->add_src( $basepath . "/app" )
	->add_src( $basepath . "/lib" )
	->create_context("Runtime.Context", "App", $env)
;

return $app;