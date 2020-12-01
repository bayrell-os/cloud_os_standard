<?php

define("APP_NAME", "Bayrell.CloudOS");

$env = getenv();

/* App mode */
if (!isset($env["APP_MODE"])) $env["APP_MODE"] = "prod";

/* Enable metrika */
if (!isset($env["METRIKA"])) $env["METRIKA"] = false;

/* Set route prefix */
if (!isset($env["X-ROUTE-PREFIX"]))
	$env["X-ROUTE-PREFIX"] = isset($_SERVER["HTTP_X_ROUTE_PREFIX"]) ? $_SERVER["HTTP_X_ROUTE_PREFIX"] : "";

$env["X-SPACE-ID"] = "-1";
$env["X-LAYER-ID"] = "-1";
$env["X-LAYER-UID"] = "00000000-0000-0000-0000-000000000000";

return $env;