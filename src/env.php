<?php

$env = getenv();

/* App mode */
$env["APP_MODE"] = "dev";
// $env["APP_MODE"] = "prod";

/* Enable metrika */
$env["METRIKA"] = false;

/* Set route prefix */
$env["X-ROUTE-PREFIX"] = isset($env["X-ROUTE-PREFIX"]) ? $env["X-ROUTE-PREFIX"] : "";

return $env;