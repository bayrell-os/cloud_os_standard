#!/usr/bin/php
<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(-1);

/* Get loader */
define('BASE_PATH', __DIR__);
require_once BASE_PATH . "/lib/Runtime/bay/Loader.php";

/* Create loader */
$loader = new Loader();
$loader->setBasePath(BASE_PATH);
$loader->include(BASE_PATH . "/init.php");

/* Add modules */
$loader->modules[] = "Bayrell.CloudOS.Console";

/* Console arguments */
$loader->params["cli_args"] = \Runtime\Collection::from($argv);

/* Run web app */
$loader->entry_point = "Runtime.Console.App";
$exit_code = $loader->runApp();
exit($exit_code);
