#!/bin/bash

SCRIPT_EXEC=$0
SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`

RETVAL=0
VERSION=0.1.0
TAG=`date '+%Y%m%d_%H%M%S'`



function generate {
	
	ENV_PATH=$SCRIPT_PATH/example/env.conf
	CLOUD_KEY_PATH=$SCRIPT_PATH/example/cloud.key
	
	if [ ! -f $ENV_PATH ]; then
		
		CLOUD_KEY=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 128`
		CLOUD_MYSQL_PASSWORD=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 16`
		
		cat $SCRIPT_PATH/example/env.example > $ENV_PATH
		
		sed -i "s|MYSQL_ROOT_PASSWORD=.*|MYSQL_ROOT_PASSWORD=${CLOUD_MYSQL_PASSWORD}|g" $ENV_PATH
		sed -i "s|MYSQL_PASSWORD=.*|MYSQL_PASSWORD=${CLOUD_MYSQL_PASSWORD}|g" $ENV_PATH
		sed -i "s|CLOUD_OS_KEY=.*|CLOUD_OS_KEY=${CLOUD_KEY}|g" $ENV_PATH
		
	fi
	
}


case "$1" in
	
	create_network)
		docker network create --subnet 172.21.0.1/16 --driver=overlay --attachable cloud_router -o "com.docker.network.bridge.name"="cloud_router"
		
		sleep 2
		
		docker network ls
	;;
	
	generate)
		generate
	;;
	
	compose)
		docker-compose -f example/docker-compose.yaml -p "cloud_os" up -d --remove-orphans
	;;
	
	run)
		$0 create_network
		$0 generate
		$0 compose
	;;
	
	*)
		echo "Usage: $SCRIPT_EXEC {create_network|generate|compose|compose_database|compose_cloud_os|run}"
		RETVAL=1

esac

exit $RETVAL