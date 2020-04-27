<?php

$app = include "app.php";

set_time_limit(60);

/* Run cron */
$app->run("Runtime.Cron.Entry", "run");
exit($app->return_code);
