#!/bin/bash

docker-compose -f compose.yaml -p "cloud_os" up -d --remove-orphans
