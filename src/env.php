<?php

$env = getenv();

/* App mode */
$env["APP_MODE"] = "dev";
// $env["APP_MODE"] = "prod";

/* Enable metrika */
$env["METRIKA"] = false;

/* Set route prefix */
$env["X-ROUTE-PREFIX"] = isset($env["X-ROUTE-PREFIX"]) ? $env["X-ROUTE-PREFIX"] : "";

/* Set auth params */
$env["AUTH_PRIVATE_KEY"] = file_get_contents("/run/secrets/AUTH_PRIVATE_KEY");
$env["AUTH_PUBLIC_KEY"] = file_get_contents("/run/secrets/AUTH_PUBLIC_KEY");

return $env;