#!/bin/bash

docker stack deploy -c $1.yaml cloud_os --with-registry-auth
