INSERT INTO "docker_yaml_files" ("file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated") VALUES ('router_http.yaml',	'cloud_os',	'version: ''3.7''
services:
  router_http:
    image: ''bayrell/cloud_router_http:0.4.0''
    hostname: ''{{.Service.Name}}.{{.Task.ID}}.local''
    volumes:
      - ''router_http_data:/data''
    ports:
      - target: 80
        published: 80
        protocol: tcp
        mode: host
      - target: 443
        published: 443
        protocol: tcp
        mode: host
    env_file:
      - ./env.conf
    dns:
      - 172.18.0.1
    deploy:
      replicas: 1
      endpoint_mode: dnsrr
      update_config:
        parallelism: 1
        failure_action: rollback
        delay: 5s
      restart_policy:
        condition: on-failure
        delay: 10s
        window: 120s
      placement:
        constraints:
          - ''node.hostname == docker0''
    networks:
      - cloud_network
    logging:
      driver: journald
volumes:
  router_http_data:
networks:
  cloud_network:
    external: true
',	'0',	'0',	'%GMTIME%',	'%GMTIME%');

INSERT INTO "docker_yaml_files" ("file_name", "stack_name", "content", "timestamp", "is_deleted", "gmtime_created", "gmtime_updated") VALUES ('env.conf',	'cloud_os',	'DOCKER=1
NODE_ID={{.Node.ID}}
TASK_ID={{.Task.ID}}
SERVICE_ID={{.Service.ID}}
CLOUD_OS_KEY=%CLOUD_OS_KEY%
CLOUD_OS_GATEWAY=%CLOUD_OS_GATEWAY%',	'0',	'0',	'%GMTIME%',	'%GMTIME%');
