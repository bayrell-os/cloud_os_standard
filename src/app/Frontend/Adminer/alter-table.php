<?php

class AdminerAlterTable {
	
	function head() {
		$connection = connection();
		if ($connection)
        {
            $table = isset($_GET["create"]) ? $_GET["create"] : "";
            if ($_POST && $table != "")
            {
                $connection->query("PRAGMA foreign_keys = off;"); 
            }
		}
	}
	
}
