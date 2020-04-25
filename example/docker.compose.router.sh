#!/bin/bash

docker stop router
docker rm router
docker volume create router_data

sleep 5

docker run -d --name router --hostname="router.local" --restart=always --log-driver=journald \
	-p 8080:80 -p 8443:443 -v router_data:/data -env-file=common.env \
	--network="dev_backend" --env CONTROL_PANEL=cloud_web_panel \
	bayrell/cloud_router:latest

sleep 5	
	
docker ps | grep router
