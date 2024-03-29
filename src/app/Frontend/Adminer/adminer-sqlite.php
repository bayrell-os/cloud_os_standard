<?php

function adminer_object() {
	include_once __DIR__ . "/plugin.php";
	include_once __DIR__ . "/alter-table.php";
	include_once __DIR__ . "/login-password-less.php";
	return new AdminerPlugin(array(
		// TODO: inline the result of password_hash() so that the password is not visible in source codes
		new AdminerAlterTable(),
		new AdminerLoginPasswordLess(password_hash("admin", PASSWORD_DEFAULT)),
	));
}

include __DIR__ . '/adminer-4.8.1.php';
