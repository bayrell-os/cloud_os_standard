#!/bin/bash

docker stack deploy -c service.yaml dev --with-registry-auth
