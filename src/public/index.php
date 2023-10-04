<?php

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(30);

/* Setup entry point */
define('ENTRY_POINT', 'Bayrell.CloudOS.Main');

/* Init context */
require_once dirname(__DIR__) . "/init.php";

/* Run web app */
\Runtime\rtl::runApp('Bayrell.CloudOS.Main', [
    'Bayrell.CloudOS'
]);
