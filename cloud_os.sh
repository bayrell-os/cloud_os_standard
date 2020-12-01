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
		sed -i "s|CLOUD_KEY=.*|CLOUD_KEY=${CLOUD_KEY}|g" $ENV_PATH

		echo $CLOUD_KEY > $CLOUD_KEY_PATH
		
	fi
	
}


case "$1" in
	
	create_network)
		docker network create --subnet 172.21.0.1/16 --driver=overlay --attachable load_balancer -o "com.docker.network.bridge.name"="load_balancer"
		
		docker network create --subnet 172.22.0.1/16 --driver=overlay --attachable cloud_admin -o "com.docker.network.bridge.name"="cloud_admin"
		
		sleep 2
		
		docker network ls
	;;
	
	generate)
		generate
	;;
	
	compose)
		docker stack deploy -c example/standard.yaml cloud_os --with-registry-auth
	;;
	
	setup)
		$0 create_network
		$0 generate
		$0 compose
	;;
	
	*)
		echo "Usage: $SCRIPT_EXEC {setup|create_network|generate|compose|setup}"
		RETVAL=1

esac

exit $RETVAL