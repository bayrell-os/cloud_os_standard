#!/usr/bin/php
<?php

$services = [];

function nslookup($domain)
{
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
	$ips = nslookup("cloud_web_panel");
	if (!isset($services[$service_name])) $services[$service_name] = [];
	if (array_equal($services[$service_name], $ips)) return $services;
	$services[$service_name] = $ips;
	return $services;
}


function update_upstreams($services)
{
	$content = "";
	
	foreach ($services as $service_name => $ips)
	{
		if (count($ips) == 0) continue;
		
		$content .= "upstream ${service_name}.local {\n";
		foreach ($ips as $ip){
			$content .= "\tserver ${ip};\n";
		}
		$content .= "}\n";
		
	}
	
	
	var_dump($content);
}



while (true)
{
	
	try
	{
		$old_services = $services;
		$services = update_service($services, "cloud_web_panel");
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

