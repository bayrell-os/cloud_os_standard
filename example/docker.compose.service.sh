#!/bin/bash

docker service rm dev_cloud_web_panel
docker stack deploy -c service.yaml dev --with-registry-auth
