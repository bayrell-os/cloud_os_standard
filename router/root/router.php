#!/usr/bin/php
<?php

$services = [];

function nslookup($domain)
{
	if ($domain == "") return [];
	$cmd = "nslookup ${domain} 127.0.0.11 |grep Address | awk '{print $2}'";
	$str = shell_exec($cmd);
	$arr = explode("\n", $str);
	$arr[0] = "";
	$arr = array_filter($arr, function($ip){ return $ip != ""; });
	return $arr;
}

function array_equal($arr1, $arr2)
{
	$res1 = array_diff($arr1, $arr2);
	$res2 = array_diff($arr2, $arr1);
	return count($res1) == 0 && count($res2) == 0;
}


function update_service($services, $service_name)
{
	$ips = nslookup($service_name);
	if (!isset($services[$service_name])) $services[$service_name] = [];
	if (array_equal($services[$service_name], $ips)) return $services;
	$services[$service_name] = $ips;
	return $services;
}


function update_upstreams($services)
{
	$new_content = "";
	
	foreach ($services as $service_name => $ips)
	{
		if (count($ips) == 0) continue;
		
		$new_content .= "upstream ${service_name}.test {\n";
		foreach ($ips as $ip){
			$new_content .= "\tserver ${ip};\n";
		}
		$new_content .= "}\n";
		
	}
	
	$file = "/etc/nginx/conf.d/99-upstreams.conf";
	$old_content = @file_get_contents($file);
	
	if ($old_content != $new_content)
	{
		file_put_contents($file, $new_content);
		echo "[router.php] Updated upstreams\n";
		nginx_reload();
	}
}


function nginx_reload()
{
	echo "[router.php] Nginx reload\n";
	$s = shell_exec("/usr/sbin/nginx -s reload");
	echo "[router.php] " . $s;
}


$SYSTEM_PANEL = getenv("SYSTEM_PANEL");
echo "[router.php] Monitor gateway: " . $SYSTEM_PANEL . "\n";

while (true)
{
	
	try
	{
		$old_services = $services;
		$services = update_service($services, $SYSTEM_PANEL);
		if ($old_services != $services)
		{
			update_upstreams($services);
		}
	}
	catch (\Exception $e)
	{
		
	}
	
	sleep (15);
}

