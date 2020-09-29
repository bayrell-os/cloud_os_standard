-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `docker_services`;
CREATE TABLE `docker_services` (
  `service_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `docker_service_id` varchar(100) DEFAULT NULL,
  `_name` varchar(1024) NOT NULL,
  `_image` varchar(1024) NOT NULL,
  `manual` tinyint(4) NOT NULL DEFAULT 0,
  `enable` tinyint(4) NOT NULL DEFAULT 0,
  `timestamp` bigint(20) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `tasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `balancer` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_id` (`docker_service_id`),
  KEY `is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `docker_yaml_files`;
CREATE TABLE `docker_yaml_files` (
  `file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(1024) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `file_name` (`file_name`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `iot`;
CREATE TABLE `iot` (
  `iot_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `space_id` bigint(20) NOT NULL,
  `api_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`iot_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `iot_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `virtual_spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `iot_auth`;
CREATE TABLE `iot_auth` (
  `iot_id` bigint(20) NOT NULL,
  `method` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`iot_id`,`method`),
  CONSTRAINT `iot_auth_ibfk_1` FOREIGN KEY (`iot_id`) REFERENCES `iot` (`iot_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `layers`;
CREATE TABLE `layers` (
  `layer_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `service_id` bigint(20) NOT NULL,
  `layer_name` varchar(255) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `logic_map_pos_y` bigint(20) NOT NULL,
  PRIMARY KEY (`layer_id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `layers_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `layers_spaces`;
CREATE TABLE `layers_spaces` (
  `layer_id` bigint(20) NOT NULL,
  `space_id` bigint(20) NOT NULL,
  `uri` varchar(255) NOT NULL,
  PRIMARY KEY (`layer_id`,`space_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `layers_spaces_ibfk_1` FOREIGN KEY (`layer_id`) REFERENCES `layers` (`layer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `layers_spaces_ibfk_2` FOREIGN KEY (`space_id`) REFERENCES `virtual_spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `nginx_files`;
CREATE TABLE `nginx_files` (
  `file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) NOT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT 0,
  `content` longtext NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `name` (`name`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stack_name` varchar(255) NOT NULL,
  `software_api_name` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) NOT NULL,
  `docker_content` longtext NOT NULL,
  `logic_map_pos_y` bigint(20) NOT NULL,
  `have_admin_page` tinyint(4) NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `stack_name_docker_name` (`stack_name`,`service_name`),
  KEY `software_api_name` (`software_api_name`),
  KEY `service_name` (`service_name`),
  KEY `have_admin_page` (`have_admin_page`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`stack_name`) REFERENCES `stacks` (`stack_name`),
  CONSTRAINT `services_ibfk_3` FOREIGN KEY (`software_api_name`) REFERENCES `softwares` (`api_name`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `type` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `gmtime_expire` datetime NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `softwares`;
CREATE TABLE `softwares` (
  `api_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `manifest` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`api_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `softwares_permissions`;
CREATE TABLE `softwares_permissions` (
  `software_api_name` varchar(255) NOT NULL,
  `permission_api_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_object` tinyint(4) NOT NULL,
  PRIMARY KEY (`software_api_name`,`permission_api_name`),
  CONSTRAINT `softwares_permissions_ibfk_2` FOREIGN KEY (`software_api_name`) REFERENCES `softwares` (`api_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `stacks`;
CREATE TABLE `stacks` (
  `stack_name` varchar(255) NOT NULL,
  PRIMARY KEY (`stack_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `task_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `command` varchar(1024) NOT NULL,
  `last_run` bigint(20) NOT NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `command` (`command`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(1024) NOT NULL,
  `banned` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name` (`login`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `users_auth`;
CREATE TABLE `users_auth` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `method` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`method`),
  CONSTRAINT `users_auth_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `virtual_spaces`;
CREATE TABLE `virtual_spaces` (
  `space_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `domain` varchar(1024) NOT NULL,
  `nginx_template` longtext NOT NULL,
  `logic_map_pos_y` bigint(20) NOT NULL,
  PRIMARY KEY (`space_id`),
  UNIQUE KEY `domain` (`domain`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `virtual_spaces_roles`;
CREATE TABLE `virtual_spaces_roles` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `space_id` bigint(20) NOT NULL,
  `parent_role` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `virtual_spaces_roles_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `virtual_spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `virtual_spaces_roles_permissions`;
CREATE TABLE `virtual_spaces_roles_permissions` (
  `software_api_name` varchar(255) NOT NULL,
  `permission_api_name` varchar(255) NOT NULL,
  `space_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `layer_id` bigint(20) DEFAULT NULL,
  `object` varchar(255) DEFAULT NULL,
  `value` bigint(20) NOT NULL,
  KEY `role_id` (`role_id`),
  KEY `space_id` (`space_id`),
  KEY `layer_id` (`layer_id`),
  KEY `software_api_name` (`software_api_name`,`permission_api_name`),
  CONSTRAINT `virtual_spaces_roles_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `virtual_spaces_roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `virtual_spaces_roles_permissions_ibfk_2` FOREIGN KEY (`space_id`) REFERENCES `virtual_spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `virtual_spaces_roles_permissions_ibfk_3` FOREIGN KEY (`layer_id`) REFERENCES `layers` (`layer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `virtual_spaces_roles_permissions_ibfk_4` FOREIGN KEY (`software_api_name`, `permission_api_name`) REFERENCES `softwares_permissions` (`software_api_name`, `permission_api_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `virtual_spaces_users`;
CREATE TABLE `virtual_spaces_users` (
  `space_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `iot_id` bigint(20) DEFAULT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`roles`)),
  KEY `space_id` (`space_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `virtual_spaces_users_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `virtual_spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `virtual_spaces_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2020-09-29 12:33:36