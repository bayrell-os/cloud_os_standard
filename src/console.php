#!/usr/bin/php
<?php

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(-1);

/* Setup entry point */
define('ENTRY_POINT', 'Bayrell.CloudOS.Console.Main');

/* Init context */
require_once __DIR__ . "/init.php";

/* Run console app */
$context = \Runtime\rtl::getContext();
$context->run($context);

exit($context->exit_code);
