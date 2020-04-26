#!/bin/bash

docker service rm dev_$1
sleep 10
docker stack deploy -c example/$1.yaml dev --with-registry-auth
