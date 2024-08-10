<?php
return function($loader)
{
	/* Runtime */
	$loader->add("Runtime",  __DIR__ . "/lib/Runtime/php");
	$loader->add("Runtime.Console",  __DIR__ . "/lib/Runtime.Console/php");
	$loader->add("Runtime.Crypt",  __DIR__ . "/lib/Runtime.Crypt/php");
	$loader->add("Runtime.ORM",  __DIR__ . "/lib/Runtime.ORM/php");
	$loader->add("Runtime.Render",  __DIR__ . "/lib/Runtime.Render/php");
	$loader->add("Runtime.Unit",  __DIR__ . "/lib/Runtime.Unit/php");
	$loader->add("Runtime.Web",  __DIR__ . "/lib/Runtime.Web/php");
	$loader->add("Runtime.Widget",  __DIR__ . "/lib/Runtime.Widget/php");
	$loader->add("Runtime.Widget.CodeMirror",  __DIR__ . "/lib/Runtime.Widget.CodeMirror/php");
	$loader->add("Runtime.Widget.Crud",  __DIR__ . "/lib/Runtime.Widget.Crud/php");
	$loader->add("Runtime.Widget.Dialog",  __DIR__ . "/lib/Runtime.Widget.Dialog/php");
	$loader->add("Runtime.Widget.Form",  __DIR__ . "/lib/Runtime.Widget.Form/php");
	$loader->add("Runtime.Widget.Tab",  __DIR__ . "/lib/Runtime.Widget.Tab/php");
	$loader->add("Runtime.Widget.Table",  __DIR__ . "/lib/Runtime.Widget.Table/php");
	$loader->add("Runtime.XML",  __DIR__ . "/lib/Runtime.XML/php");
	
	/* App */
	$loader->add("Bayrell.CloudOS",  __DIR__ . "/source/php");
	
	/* Init */
	$loader->init();
	
	/* Setup environments */
	$loader->setEnv("LOCALE", "en");
	$tz = getenv("TZ"); if (!$tz) $tz = "UTC";
	$loader->setEnv("TZ", $tz);
	$loader->setEnv("TZ_OFFSET", \Runtime\DateTime::getOffset($tz));
};