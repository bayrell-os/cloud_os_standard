<?php

$app = include "app.php";

/* Run web */
$app->entrypoint("Runtime.Web.Backend.Entry")->run();
exit($app->return_code);
