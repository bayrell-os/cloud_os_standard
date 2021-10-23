-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `applications`;
CREATE TABLE `applications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stack_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `gmtime_created` datetime NOT NULL,
  `gmtime_updated` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `applications` (`id`, `stack_name`, `name`, `content`, `gmtime_created`, `gmtime_updated`) VALUES
(1,	'database',	'mysql.yaml',	'version: \"3.7\"\n\nservices:\n  \n  mysql_node1:\n    image: bayrell/alpine_mariadb:10.5-2\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"mysql_node1_data:/data\"\n    env_file:\n      - ../cloud_os/cloud_env.conf\n    environment:\n      MYSQL_CMD: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --sql-mode=\"\" --ft_min_word_len=1 --wait_timeout=600 --max_allowed_packet=1G\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_network\n    logging:\n      driver: journald\n\nvolumes:\n  mysql_node1_data:\n\nnetworks:\n  cloud_network:\n    external: true',	'0000-00-00 00:00:00',	'2021-09-30 17:16:01'),
(2,	'cloud_os',	'standard.yaml',	'version: \"3.7\"\n\nservices:\n  \n  standard:\n    image: bayrell/cloud_os_standard:0.3.0\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"standard_data:/data\"\n      - \"/var/run/docker.sock:/var/run/docker.sock:ro\"\n    env_file:\n      - ../cloud_os/cloud_env.conf\n    environment:\n      MYSQL_DB: \"cloud_os_standard\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n    ports:\n      - target: 80\n      published: 8080\n      protocol: tcp\n      mode: host\n      - target: 22\n      published: 8022\n      protocol: tcp\n      mode: host\n    logging:\n      driver: journald\n\nvolumes:\n  standard_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(3,	'dev',	'php.yaml',	'version: \"3.7\"\n\nservices:\n\n  php:\n    image: bayrell/alpine_php_fpm:7.3-6\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"php_data:/data\"\n    dns:\n      - 172.18.0.1\n    deploy:\n      replicas: 2\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        order: start-first\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.hostname == docker0\n    networks:\n      - cloud_network\n    logging:\n      driver: journald\n\nvolumes:\n  php_data:\n\nnetworks:\n  cloud_network:\n    external: true\n',	'0000-00-00 00:00:00',	'2021-09-30 17:33:38'),
(4,	'cloud_os',	'gateway.yaml',	'version: \"3.7\"\n\nservices:\n  \n  gateway:\n    image: bayrell/bus_gateway:0.3.0\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    env_file:\n      - ../cloud_os/cloud_env.conf\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\n  rabbitmq:\n    image: rabbitmq:3.8.9-management\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"rabbitmq_data:/var/lib/rabbitmq\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n    logging:\n      driver: journald\n\nvolumes:\n  rabbitmq_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true',	'0000-00-00 00:00:00',	'2021-09-30 15:29:12'),
(5,	'cloud_os',	'http.yaml',	'version: \"3.7\"\n\nservices:\n  \n  http:\n    image: bayrell/load_balancer_http:0.3.0\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"http_data:/data\"\n    env_file:\n      - ../cloud_os/cloud_env.conf\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_frontend\n    ports:\n      - target: 80\n        published: 80\n        protocol: tcp\n        mode: host\n    logging:\n      driver: journald    \n    \nvolumes:\n  http_data:\n\nnetworks:\n  cloud_frontend:\n    external: true',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(6,	'dev',	'web.lang.yaml',	'version: \"3.7\"\n\nservices:\n\n  web_lang:\n    image: bayrell/alpine_php_fpm:7.3-6\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"web_lang_data:/data\"\n      - \"/home/ubuntu/bayrell-web-lang:/var/www\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  web_lang_data:\n\nnetworks:\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(7,	'dev',	'clear_project.yaml',	'version: \"3.7\"\n\nservices:\n\n  clear_project:\n    image: bayrell/alpine_php_fpm:7.3-6\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"clear_project_data:/data\"\n      - \"/home/ubuntu/bayrell-clear-project:/var/www\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  clear_project_data:\n\nnetworks:\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(8,	'dev',	'test_project.yaml',	'version: \"3.7\"\n\nservices:\n\n  test_project:\n    image: bayrell/alpine_php_fpm:7.3-6\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"test_project_data:/data\"\n      - \"/home/ubuntu/bayrell-test-project:/var/www\"\n    environment:\n      MYSQL_HOST: database_mysql_node1\n      MYSQL_USER: test.docker0\n      MYSQL_PASSWORD: JxoENoLuL4wCqY5L\n      MYSQL_DATABASE: test.docker0\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  test_project_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(9,	'database',	'minio.yaml',	'version: \'3.7\'\n\nservices:\n  minio_node1:\n    image: minio/minio:RELEASE.2021-02-14T04-01-33Z\n    volumes:\n      - minio_node1_data:/export\n    environment:\n      MINIO_ROOT_USER: \"AKIAIOSFODNN7EXAMPLE\"\n      MINIO_ROOT_PASSWORD: \"wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY\"\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      restart_policy:\n        delay: 10s\n        max_attempts: 10\n        window: 60s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    command: server /export\n\nvolumes:\n  minio_node1_data:\n  \nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(10,	'dev',	'time_planner.yaml',	'version: \"3.7\"\n\nservices:\n\n  time_planner:\n    image: bayrell/alpine_php_fpm:7.3-6\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"time_planner_data:/data\"\n      - \"/home/ubuntu/app_time_planner/src:/var/www\"\n    environment:\n      MYSQL_HOST: database_mysql_node1\n      MYSQL_USER: test.docker0\n      MYSQL_PASSWORD: JxoENoLuL4wCqY5L\n      MYSQL_DATABASE: test.docker0\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  time_planner_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(11,	'dev',	'vue.docker0.yaml',	'version: \"3.7\"\n\nservices:\n\n  vue_docker0:\n    image: bayrell/ubuntu_code_server:3.11.0-2-amd64\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"code_server_data:/data\"\n      - \"/home/ubuntu/www/vue.docker0:/srv\"\n    environment:\n      - WWW_UID=1000\n      - WWW_GID=1000\n      - TZ=Asia/Almaty      \n      - DOCUMENT_ROOT=/srv/html\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  code_server_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(12,	'dev',	'angular.docker0.yaml',	'version: \"3.7\"\n\nservices:\n\n  angular_docker0:\n    image: bayrell/alpine_php_node:12-1-20210227_121842\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"angular_docker0_data:/data\"\n      - \"/home/ubuntu/www/angular.docker0:/var/www\"\n    environment:\n      WWW_UID: 1000\n      WWW_GID: 1000\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  angular_docker0_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(13,	'dev',	'react.docker0.yaml',	'version: \"3.7\"\n\nservices:\n\n  react_docker0:\n    image: bayrell/alpine_php_node:12-1-20210227_121842\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"react_docker0_data:/data\"\n      - \"/home/ubuntu/www/react.docker0:/var/www\"\n    environment:\n      WWW_UID: 1000\n      WWW_GID: 1000\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  react_docker0_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(14,	'dev',	'code-server.yaml',	'version: \"3.7\"\n\nservices:\n\n  code_server:\n    image: bayrell/code-server:3.11.0-1-amd64\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"/home/ubuntu/code-server/config:/config\"\n      - \"/home/ubuntu/code-server/srv:/srv\"\n    environment:\n      - PUID=1000\n      - PGID=1000\n      - TZ=Asia/Almaty\n      - GOROOT=/config/go\n      - GOPATH=/srv/golang\n      - GO111MODULE=auto\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  code_server_config:\n\nnetworks:\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(17,	'dev',	'app_time_planner.yaml',	'version: \"3.7\"\n\nservices:\n\n  app_time_planner:\n    image: bayrell/ubuntu_code_server:3.11.0-3-amd64\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"code_server_data:/data\"\n      - \"/home/ubuntu/bayrell/app_time_planner:/srv\"\n    environment:\n      WWW_UID: \"1000\"\n      WWW_GID: \"1000\"\n      TZ: \"Asia/Almaty\"\n      DOCUMENT_ROOT: \"/srv/frontend/html\"\n      NGINX_CONF: \"/srv/nginx_vscode.conf\"\n      DB_HOST: \"database_mysql_node1\"\n      DB_PORT: \"3306\"\n      DB_DATABASE: \"time_planner\"\n      DB_USERNAME: \"root\"\n      DB_PASSWORD: \"bQ8z6dVOPs0rHK4h\"\n      APP_URL: \"http://planner.docker0\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_backend\n      - cloud_frontend\n    logging:\n      driver: journald\n\nvolumes:\n  code_server_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true\n',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(18,	'cloud_os',	'tarantool.yaml',	'version: \"3.7\"\n\nservices:\n  \n  tarantool_node1:\n    image: tarantool/tarantool:2.7.2\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"tarantool_node1_data:/var/lib/tarantool\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_frontend\n      - cloud_backend\n    logging:\n      driver: journald\n\nvolumes:\n  tarantool_node1_data:\n\nnetworks:\n  cloud_frontend:\n    external: true  \n  cloud_backend:\n    external: true',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(19,	'cloud_os',	'standard_dev.yaml',	'version: \"3.7\"\n\nservices:\n  \n  standard_dev:\n    image: bayrell/ubuntu_code_server:3.11.0-3-amd64\n    hostname: \"{{.Service.Name}}.{{.Task.ID}}.local\"\n    volumes:\n      - \"code_server_data:/data\"\n      - \"/var/run/docker.sock:/var/run/docker.sock:ro\"\n      - \"/home/ubuntu/bayrell/cloud_os_standard_0.4:/srv\"\n    env_file:\n      - ../cloud_os/cloud_env.conf\n    environment:\n      WWW_UID: \"1000\"\n      WWW_GID: \"1000\"\n      TZ: \"Asia/Almaty\"\n      DOCUMENT_ROOT: \"/srv/frontend/html\"\n      NGINX_CONF: \"/srv/nginx_vscode.conf\"\n      DB_HOST: \"database_mysql_node1\"\n      DB_PORT: \"3306\"\n      DB_DATABASE: \"cloud_os_standard2\"\n      DB_USERNAME: \"root\"\n      DB_PASSWORD: \"bQ8z6dVOPs0rHK4h\"\n      APP_URL: \"http://cloud_os.docker0\"\n    deploy:\n      replicas: 1\n      endpoint_mode: dnsrr\n      update_config:\n        parallelism: 1\n        failure_action: rollback\n        delay: 5s\n      restart_policy:\n        condition: \"on-failure\"\n        delay: 10s\n        window: 120s\n      placement:\n        constraints:\n          - node.labels.name == docker0\n    networks:\n      - cloud_frontend\n      - cloud_backend\n    logging:\n      driver: journald\n\nvolumes:\n  code_server_data:\n\nnetworks:\n  cloud_backend:\n    external: true\n  cloud_frontend:\n    external: true',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00');

DROP TABLE IF EXISTS `cron`;
CREATE TABLE `cron` (
  `command` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_run` bigint(20) NOT NULL,
  PRIMARY KEY (`command`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `cron` (`command`, `last_run`) VALUES
('Bayrell.CloudOS.DockerTasks::cron',	1629388390);

DROP TABLE IF EXISTS `domains`;
CREATE TABLE `domains` (
  `domain_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nginx_template` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `space_id` bigint(20) DEFAULT NULL,
  `gmtime_created` datetime NOT NULL,
  `gmtime_updated` datetime NOT NULL,
  PRIMARY KEY (`domain_name`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `domains_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`space_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `domains` (`domain_name`, `nginx_template`, `space_id`, `gmtime_created`, `gmtime_updated`) VALUES
('cloud_os.docker0',	'server {\n	listen 80;\n	server_name %DOMAIN_NAME%;\n	root /usr/share/nginx/default;\n	index index.html;\n	autoindex off;\n%ROUTES%\n%SSL%\n}',	NULL,	'0000-00-00 00:00:00',	'0000-00-00 00:00:00');

DROP TABLE IF EXISTS `layers`;
CREATE TABLE `layers` (
  `layer_uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `layer_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `space_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`layer_uid`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `layers_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`space_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `nginx_files`;
CREATE TABLE `nginx_files` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enable` tinyint(4) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  `gmtime_created` datetime NOT NULL,
  `gmtime_updated` datetime NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `nginx_files` (`name`, `enable`, `content`, `timestamp`, `is_deleted`, `gmtime_created`, `gmtime_updated`) VALUES
('/conf.d/99-cloud_network-upstreams.conf',	1,	'upstream 80.dev_php.cloud_network.example {\n	server 172.21.0.3:80;\n}\n',	0,	0,	'2021-09-30 17:27:51',	'2021-10-23 10:16:34'),
('/domains/cloud_os.docker0.conf',	1,	'server {\n	listen 80;\n	server_name cloud_os.docker0;\n	root /usr/share/nginx/default;\n	index index.html;\n	autoindex off;\n	location / {\n		proxy_pass http://80.dev_php.cloud_network.example;\n		include proxy_params;\n	}\n\n}',	0,	0,	'2021-09-30 17:27:51',	'2021-10-23 10:16:34');

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `space_id` bigint(20) NOT NULL,
  `role_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`),
  KEY `space_id` (`space_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`space_id`) REFERENCES `spaces` (`space_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `enable` tinyint(4) NOT NULL,
  `protocol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `protocol_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `domain_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `target_port` int(11) NOT NULL,
  `route_prefix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `layer_uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gmtime_created` datetime NOT NULL,
  `gmtime_updated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `domain_name` (`domain_name`),
  CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`domain_name`) REFERENCES `domains` (`domain_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `routes` (`id`, `enable`, `protocol`, `protocol_data`, `domain_name`, `route`, `docker_name`, `target_port`, `route_prefix`, `layer_uid`, `gmtime_created`, `gmtime_updated`) VALUES
(21,	1,	'http',	'',	'cloud_os.docker0',	'/',	'dev_php',	80,	'/',	'',	'2021-09-30 17:34:55',	'2021-09-30 17:35:13');

DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `service_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stack_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `software_api_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `have_admin_page` tinyint(4) NOT NULL,
  `admin_port` int(11) NOT NULL,
  `admin_route` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin_custom_nginx` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `enable` tinyint(4) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `docker_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `docker_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `docker_tasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `docker_balancer` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `timestamp` bigint(20) NOT NULL,
  `gmtime_created` datetime NOT NULL,
  `gmtime_updated` datetime NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `stack_name_service_name` (`stack_name`,`service_name`),
  UNIQUE KEY `docker_name` (`docker_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `services` (`service_id`, `stack_name`, `service_name`, `software_api_name`, `have_admin_page`, `admin_port`, `admin_route`, `admin_custom_nginx`, `enable`, `is_deleted`, `data`, `docker_name`, `docker_image`, `docker_content`, `docker_json`, `docker_tasks`, `docker_balancer`, `timestamp`, `gmtime_created`, `gmtime_updated`) VALUES
(29,	'database',	'mysql_node1',	'',	0,	0,	'',	'',	1,	0,	NULL,	'database_mysql_node1',	'bayrell/alpine_mariadb:10.5-2@sha256:5b3443c1cbce610437dcddff3c09fa26ecfe499bf891f639ec5476cf97a0967e',	'',	'{\"ID\":\"kfgdpnvz0pjr40v1x0av7ncii\",\"Version\":{\"Index\":15380},\"CreatedAt\":\"2021-09-30T17:16:10.287516779Z\",\"UpdatedAt\":\"2021-09-30T17:16:10.287516779Z\",\"Spec\":{\"Name\":\"database_mysql_node1\",\"Labels\":{\"com.docker.stack.image\":\"bayrell\\/alpine_mariadb:10.5-2\",\"com.docker.stack.namespace\":\"database\"},\"TaskTemplate\":{\"ContainerSpec\":{\"Image\":\"bayrell\\/alpine_mariadb:10.5-2@sha256:5b3443c1cbce610437dcddff3c09fa26ecfe499bf891f639ec5476cf97a0967e\",\"Labels\":{\"com.docker.stack.namespace\":\"database\"},\"Hostname\":\"{{.Service.Name}}.{{.Task.ID}}.local\",\"Env\":[\"AMQP_HOST=cloud_os_rabbitmq\",\"AMQP_PORT=5672\",\"CLOUD_BUS_GATEWAY=cloud_os_gateway\",\"CLOUD_KEY=\",\"DOCKER=1\",\"MYSQL_CMD=--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --sql-mode=\\\"\\\" --ft_min_word_len=1 --wait_timeout=600 --max_allowed_packet=1G\",\"MYSQL_HOST=database_mysql_node1\",\"MYSQL_PASSWORD=bQ8z6dVOPs0rHK4h\",\"MYSQL_ROOT_PASSWORD=bQ8z6dVOPs0rHK4h\",\"MYSQL_ROOT_USERNAME=root\",\"MYSQL_USERNAME=root\",\"NODE_ID={{.Node.ID}}\",\"SERVICE_ID={{.Service.ID}}\",\"TASK_ID={{.Task.ID}}\"],\"Privileges\":{\"CredentialSpec\":null,\"SELinuxContext\":null},\"Mounts\":[{\"Type\":\"volume\",\"Source\":\"database_mysql_node1_data\",\"Target\":\"\\/data\",\"VolumeOptions\":{\"Labels\":{\"com.docker.stack.namespace\":\"database\"}}}],\"Isolation\":\"default\"},\"Resources\":[],\"RestartPolicy\":{\"Condition\":\"on-failure\",\"Delay\":10000000000,\"MaxAttempts\":0,\"Window\":120000000000},\"Placement\":{\"Constraints\":[\"node.labels.name == docker0\"],\"Platforms\":[{\"Architecture\":\"amd64\",\"OS\":\"linux\"},{\"OS\":\"linux\"},{\"Architecture\":\"arm64\",\"OS\":\"linux\"}]},\"Networks\":[{\"Target\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Aliases\":[\"mysql_node1\"]}],\"LogDriver\":{\"Name\":\"journald\"},\"ForceUpdate\":0,\"Runtime\":\"container\"},\"Mode\":{\"Replicated\":{\"Replicas\":1}},\"UpdateConfig\":{\"Parallelism\":1,\"Delay\":5000000000,\"FailureAction\":\"rollback\",\"MaxFailureRatio\":0,\"Order\":\"stop-first\"},\"EndpointSpec\":{\"Mode\":\"dnsrr\"}},\"Endpoint\":{\"Spec\":[]}}',	'null',	'{\"State\":{\"Work\":1,\"Total\":1},\"Tasks\":[{\"ID\":\"6u1nf9dqnughkovlx0getaq87\",\"Status\":{\"Timestamp\":\"2021-10-19T11:40:16.028233382Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"35c6844ac56adcd5c97886154ecf2280876be14c54f51886c15a2519be8a1c88\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.11\\/16\"]}]},{\"ID\":\"n8oukg0as3v8p8vdsdo6827k9\",\"Status\":{\"Timestamp\":\"2021-10-23T09:54:41.115043049Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"No such container: database_mysql_node1.1.n8oukg0as3v8p8vdsdo6827k9\",\"ContainerStatus\":{\"ContainerID\":\"e2c98e39a076f2bb935fe89f2671fbf0bc2dd9d725df9db7d36f5a06f286efa2\",\"PID\":879,\"ExitCode\":0},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.4\\/16\"]}]},{\"ID\":\"r2fek7l3zfrio1p2onxf3kddf\",\"Status\":{\"Timestamp\":\"2021-10-17T11:09:42.014181065Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"f15b017a0a252fb7a6134fed74f9acb3fae599be03507cf658fb6fe5ef024b48\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.13\\/16\"]}]},{\"ID\":\"uz3d1cn51k4uzy4zjrhlw9miu\",\"Status\":{\"Timestamp\":\"2021-10-19T14:49:38.224504239Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"2880f83f500825cc8e100ea1e92a4759ffebd55ae35cf72bf8af5bcd0d6f6ede\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.11\\/16\"]}]},{\"ID\":\"wp5410mvbr6tf9shjf3vem659\",\"Status\":{\"Timestamp\":\"2021-10-23T09:55:04.214018806Z\",\"State\":\"running\",\"Message\":\"started\",\"ContainerStatus\":{\"ContainerID\":\"162d2d089887e03513eb67e6266c7b049fb610381433783e01a5fe4e5dff1c03\",\"PID\":882,\"ExitCode\":0},\"PortStatus\":[]},\"DesiredState\":\"running\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.4\\/16\"]}]}]}',	1634984193,	'2021-08-20 09:30:35',	'2021-10-23 10:16:33'),
(36,	'dev',	'php',	'',	0,	0,	'',	'',	1,	0,	NULL,	'dev_php',	'bayrell/alpine_php_fpm:7.3-6@sha256:2ee36a9dbd951a7182694b8bc27ef46ed3959eaae32c5e564a4c7326aa2300d4',	'',	'{\"ID\":\"ljyjhnwdnpai2ylfc8mk6qy7q\",\"Version\":{\"Index\":15396},\"CreatedAt\":\"2021-09-30T17:33:48.095476604Z\",\"UpdatedAt\":\"2021-09-30T17:33:48.095476604Z\",\"Spec\":{\"Name\":\"dev_php\",\"Labels\":{\"com.docker.stack.image\":\"bayrell\\/alpine_php_fpm:7.3-6\",\"com.docker.stack.namespace\":\"dev\"},\"TaskTemplate\":{\"ContainerSpec\":{\"Image\":\"bayrell\\/alpine_php_fpm:7.3-6@sha256:2ee36a9dbd951a7182694b8bc27ef46ed3959eaae32c5e564a4c7326aa2300d4\",\"Labels\":{\"com.docker.stack.namespace\":\"dev\"},\"Hostname\":\"{{.Service.Name}}.{{.Task.ID}}.local\",\"Privileges\":{\"CredentialSpec\":null,\"SELinuxContext\":null},\"Mounts\":[{\"Type\":\"volume\",\"Source\":\"dev_php_data\",\"Target\":\"\\/data\",\"VolumeOptions\":{\"Labels\":{\"com.docker.stack.namespace\":\"dev\"}}}],\"DNSConfig\":{\"Nameservers\":[\"172.18.0.1\"]},\"Isolation\":\"default\"},\"Resources\":[],\"RestartPolicy\":{\"Condition\":\"on-failure\",\"Delay\":10000000000,\"MaxAttempts\":0,\"Window\":120000000000},\"Placement\":{\"Constraints\":[\"node.hostname == docker0\"],\"Platforms\":[{\"Architecture\":\"amd64\",\"OS\":\"linux\"},{\"OS\":\"linux\"},{\"Architecture\":\"arm64\",\"OS\":\"linux\"}]},\"Networks\":[{\"Target\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Aliases\":[\"php\"]}],\"LogDriver\":{\"Name\":\"journald\"},\"ForceUpdate\":0,\"Runtime\":\"container\"},\"Mode\":{\"Replicated\":{\"Replicas\":2}},\"UpdateConfig\":{\"Parallelism\":1,\"Delay\":5000000000,\"FailureAction\":\"rollback\",\"MaxFailureRatio\":0,\"Order\":\"start-first\"},\"EndpointSpec\":{\"Mode\":\"dnsrr\"}},\"Endpoint\":{\"Spec\":[]}}',	'null',	'{\"State\":{\"Work\":1,\"Total\":2},\"Tasks\":[{\"ID\":\"tiryqvhhweomecotn47zv08o3\",\"Status\":{\"Timestamp\":\"2021-10-19T14:49:38.22755544Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"No such container: dev_php.2.tiryqvhhweomecotn47zv08o3\",\"ContainerStatus\":{\"ContainerID\":\"f51fd07c9b5b914255fc18153c50bf6eec283bbcbaf44f1560efa3c256bcfad3\",\"PID\":900,\"ExitCode\":-1},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":2,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.5\\/16\"]}]},{\"ID\":\"80qosxu5jm3zzxjdfxt8wg70y\",\"Status\":{\"Timestamp\":\"2021-10-17T11:09:42.01363658Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"a70ffa38a02911bbe82ccb6dbb9aee9867e43a5f9285998512fa223f7d6d8b9f\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":2,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.12\\/16\"]}]},{\"ID\":\"0hfxnq81amykamiae7ia602fx\",\"Status\":{\"Timestamp\":\"2021-10-23T09:54:41.112350811Z\",\"State\":\"complete\",\"Message\":\"finished\",\"ContainerStatus\":{\"ContainerID\":\"4f0580fd2adde240392b58b12a26c8fc7dc4f67e782ac1316e5def59b43a6d62\",\"PID\":0,\"ExitCode\":0},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.4\\/16\"]}]},{\"ID\":\"9a34rl4vxwgi7vb0sbdjnn10f\",\"Status\":{\"Timestamp\":\"2021-10-23T09:54:41.116933923Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"No such container: dev_php.2.9a34rl4vxwgi7vb0sbdjnn10f\",\"ContainerStatus\":{\"ContainerID\":\"ab3e6c7414905cb82d4faa79f90d68cf7f2806cbbc96332caf5905eb12414bb5\",\"PID\":984,\"ExitCode\":-1},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":2,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.3\\/16\"]}]},{\"ID\":\"coi34mrkox2oxgrbo6cgla6l8\",\"Status\":{\"Timestamp\":\"2021-10-17T11:09:42.015566029Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"a6079f2b8c6d7ea9c53859d797da9ef2d61646a989cad0ecb7ba901a35510897\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.4\\/16\"]}]},{\"ID\":\"mphipysnq5uzxs8mi5l29qb7q\",\"Status\":{\"Timestamp\":\"2021-10-17T11:09:42.012358159Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"109345a8f8479ca00dd9d69124f031b05a666965581d97ec6a3b235a337ccd75\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.4\\/16\"]}]},{\"ID\":\"tqky2p2l57tv1pe142mc23b45\",\"Status\":{\"Timestamp\":\"2021-10-19T14:49:38.226099389Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"f0f7ad0ab68ef97ef73ff9c093e48043584ff9833e7bee0fd6a14ab5fc72d33e\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.13\\/16\"]}]},{\"ID\":\"uadu6mjgzfnh0qhqg79lflj6k\",\"Status\":{\"Timestamp\":\"2021-10-17T11:09:42.014992626Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"ff45b983d17f90c59290c002f9173786890586b3cac312bd6855c2ca819bad71\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":2,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.17\\/16\"]}]},{\"ID\":\"vdvsgujupwsqydcnqvpoe6ch3\",\"Status\":{\"Timestamp\":\"2021-10-23T09:55:04.112547125Z\",\"State\":\"running\",\"Message\":\"started\",\"ContainerStatus\":{\"ContainerID\":\"da178c8a6b8b1d21ce264be1c8111342d2d4111164913fb319ccacac6e656d2f\",\"PID\":950,\"ExitCode\":0},\"PortStatus\":[]},\"DesiredState\":\"running\",\"Slot\":2,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.3\\/16\"]}]},{\"ID\":\"z300rgeiuh4z9rkk52jzo5eev\",\"Status\":{\"Timestamp\":\"2021-10-19T11:40:16.028613663Z\",\"State\":\"failed\",\"Message\":\"started\",\"Err\":\"task: non-zero exit (255)\",\"ContainerStatus\":{\"ContainerID\":\"d87845a6f9386edaabbc0844a22cebe6afdcda03b4b3b375074ff78889db44c2\",\"PID\":0,\"ExitCode\":255},\"PortStatus\":[]},\"DesiredState\":\"shutdown\",\"Slot\":1,\"Node\":{\"ID\":\"vbtt40su1da4gn15rg3q2ic1r\",\"Hostname\":\"docker0\",\"Status\":{\"State\":\"ready\",\"Addr\":\"172.30.0.20\"}},\"Networks\":[{\"ID\":\"ouaily03zbw6bfrk6t4sbyrmp\",\"Name\":\"cloud_network\",\"Addresses\":[\"172.21.0.5\\/16\"]}]}]}',	1634984193,	'2021-09-30 17:34:01',	'2021-10-23 10:16:33');

DROP TABLE IF EXISTS `spaces`;
CREATE TABLE `spaces` (
  `space_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `api_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`space_id`)
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


-- 2021-10-23 10:16:38