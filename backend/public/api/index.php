<?php

require_once __DIR__ . "/../../vendor/autoload.php";

\TinyPHP\Core::buildContainer( __DIR__ . "/../../defs.php" );
$app = app();
$app->init();
$app->run();
