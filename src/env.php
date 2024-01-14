<?php

$env = [
    "DEBUG" => get_env("DEBUG", false),
    "CLOUD_ENV" => get_env("CLOUD_ENV", "prod"),
];

//$env["CLOUD_ENV"] = "prod";

return $env;