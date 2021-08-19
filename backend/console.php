#!/usr/bin/env php
<?php

require __DIR__ . '/vendor/autoload.php';

\TinyPHP\Core::buildContainer( __DIR__ . "/../../vendor/defs.php" );

/* Create app */
$app = app();
$app->init();
$console = $app->createConsoleApp();

/* Run console */
$console->run();