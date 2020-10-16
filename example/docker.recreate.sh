#!/bin/bash

docker service rm cloud_os_$1
sleep 10
docker stack deploy -c $1.yaml cloud_os --with-registry-auth
