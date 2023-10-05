#!/usr/bin/php
<?php

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(-1);

/* Init context */
require_once __DIR__ . "/init.php";

/* Run console app */
$exit_code = \Runtime\rtl::runApp(
    
    /* Entry point */
    'Bayrell.CloudOS.Console.Main',
    
    /* Modules */
    [
        'Bayrell.CloudOS',
        'Bayrell.CloudOS.Console',
    ],
    
    /* Context parameters */
    \Runtime\Dict::from([
        'cli_args' => \Runtime\Collection::from($argv),
    ])
);
exit($exit_code);
