-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `cron`;
CREATE TABLE `cron` (
  `command` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_run` bigint(20) NOT NULL,
  PRIMARY KEY (`command`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `domains`;
CREATE TABLE `domains` (
  `domain_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nginx_template` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`domain_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `layers`;
CREATE TABLE `layers` (
  `layer_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `layer_uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `layer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `space_id` bigint(20) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`layer_id`),
  KEY `space_id` (`space_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `layers_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON UPDATE CASCADE,
  CONSTRAINT `layers_ibfk_2` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`space_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `layers_routes`;
CREATE TABLE `layers_routes` (
  `domain_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `layer_id` bigint(20) NOT NULL,
  PRIMARY KEY (`domain_name`,`route`),
  KEY `layer_id` (`layer_id`),
  CONSTRAINT `layers_routes_ibfk_1` FOREIGN KEY (`domain_name`) REFERENCES `domains` (`domain_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `layers_routes_ibfk_2` FOREIGN KEY (`layer_id`) REFERENCES `layers` (`layer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `nginx_files`;
CREATE TABLE `nginx_files` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enable` tinyint(4) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `space_id` bigint(20) NOT NULL,
  `role_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stack_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `software_api_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `have_admin_page` tinyint(4) NOT NULL,
  `enable` tinyint(4) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `docker_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`docker_json`)),
  `docker_tasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`docker_tasks`)),
  `docker_balancer` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`docker_balancer`)),
  `timestamp` bigint(20) NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `stack_name_service_name` (`stack_name`,`service_name`),
  UNIQUE KEY `docker_name` (`docker_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `spaces`;
CREATE TABLE `spaces` (
  `space_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `space_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`space_id`),
  UNIQUE KEY `domain` (`domain_name`),
  CONSTRAINT `spaces_ibfk_2` FOREIGN KEY (`domain_name`) REFERENCES `domains` (`domain_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `stacks`;
CREATE TABLE `stacks` (
  `stack_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `top_menu`;
CREATE TABLE `top_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `href` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pos` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `banned` tinyint(4) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `users_auth`;
CREATE TABLE `users_auth` (
  `user_id` bigint(20) NOT NULL,
  `method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `user_id_method` (`user_id`,`method`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 2020-10-31 12:01:32