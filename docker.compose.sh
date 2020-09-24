#!/bin/bash

docker stack deploy -c example/$1.yaml cloud_os --with-registry-auth
