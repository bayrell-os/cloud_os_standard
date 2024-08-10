<?php

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(30);

/* Get loader */
define('BASE_PATH', dirname(__DIR__));
require_once BASE_PATH . "/lib/Runtime/bay/Loader.php";

/* Create loader */
$loader = new Loader();
$loader->setBasePath(BASE_PATH);
$loader->include(BASE_PATH . "/init.php");

/* Add modules */
$loader->modules[] = "Bayrell.CloudOS.Frontend";

/* Run web app */
$loader->entry_point = "Runtime.Web.BaseApp";
$loader->runApp();
