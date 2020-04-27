<?php

$app = include "app.php";

/* Run web */
$app->run("Runtime.Web.Backend.Entry", "run");
exit($app->return_code);
