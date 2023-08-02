<?php

ini_set('display_errors', 'on');
ini_set('html_errors', 'on');
set_time_limit(30);

require_once dirname(__DIR__) . "/init.php";

/* Run web app */
$context = \Runtime\rtl::getContext();
$context->run($context);
