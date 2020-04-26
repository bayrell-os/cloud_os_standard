#!/bin/bash

docker stack deploy -c example/$1.yaml dev --with-registry-auth
