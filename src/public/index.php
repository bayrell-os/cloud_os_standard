<?php

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(30);

/* Init context */
$init = require_once dirname(__DIR__) . "/init.php";

/* Run web app */
\Runtime\rtl::runApp(
    
    /* Entry point */
    'Bayrell.CloudOS.Frontend.WebApp',
    
    /* Modules */
    $init["modules"],
    
    /* Params */
    \Runtime\Map::from([
        "environments" => \Runtime\Map::from($init["environments"]),
    ])
);
