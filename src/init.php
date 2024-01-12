<?php

ini_set('display_errors', 1);

define( "BASE_PATH", __DIR__ );
$loader = require_once BASE_PATH . "/vendor/autoload.php";

/* Runtime */
$loader->addPsr4("Runtime\\",  __DIR__ . "/lib/Runtime/php");
$loader->addPsr4("Runtime\\Console\\",  __DIR__ . "/lib/Runtime.Console/php");
$loader->addPsr4("Runtime\\Crypt\\",  __DIR__ . "/lib/Runtime.Crypt/php");
$loader->addPsr4("Runtime\\ORM\\",  __DIR__ . "/lib/Runtime.ORM/php");
$loader->addPsr4("Runtime\\Render\\",  __DIR__ . "/lib/Runtime.Render/php");
$loader->addPsr4("Runtime\\Unit\\",  __DIR__ . "/lib/Runtime.Unit/php");
$loader->addPsr4("Runtime\\Web\\",  __DIR__ . "/lib/Runtime.Web/php");
$loader->addPsr4("Runtime\\Widget\\",  __DIR__ . "/lib/Runtime.Widget/php");
$loader->addPsr4("Runtime\\Widget\\CodeMirror\\",  __DIR__ . "/lib/Runtime.Widget.CodeMirror/php");
$loader->addPsr4("Runtime\\Widget\\Crud\\",  __DIR__ . "/lib/Runtime.Widget.Crud/php");
$loader->addPsr4("Runtime\\Widget\\Dialog\\",  __DIR__ . "/lib/Runtime.Widget.Dialog/php");
$loader->addPsr4("Runtime\\Widget\\Form\\",  __DIR__ . "/lib/Runtime.Widget.Form/php");
$loader->addPsr4("Runtime\\Widget\\Tab\\",  __DIR__ . "/lib/Runtime.Widget.Tab/php");
$loader->addPsr4("Runtime\\Widget\\Table\\",  __DIR__ . "/lib/Runtime.Widget.Table/php");
$loader->addPsr4("Runtime\\XML\\",  __DIR__ . "/lib/Runtime.XML/php");

/* App */
$loader->addPsr4("Bayrell\\CloudOS\\",  __DIR__ . "/source/php");

/* Setup default handler */
\Runtime\rtl::set_default_exception_handler();

/* Modules */
$modules = [
    "Runtime",
];

function get_env($env_name, $def_value)
{
    $value = getenv($env_name);
    return $value !== false ? $value : $def_value;
}

$env = [
    "DEBUG" => get_env("DEBUG", false),
    "CLOUD_ENV" => get_env("CLOUD_ENV", "prod"),
];

$obj = [
    "environments" => $env,
    "modules" => $modules,
    "loader" => $loader,
];

return $obj;