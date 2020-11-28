#!/bin/bash

SCRIPT_EXEC=$0
SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`

RETVAL=0
VERSION=0.1.0
TAG=`date '+%Y%m%d_%H%M%S'`


# Settings

CLOUD_DOMAIN="cloud_os.test"
MANAGER_NODE="docker0"



function generate {
	
	ENV_PATH=$SCRIPT_PATH/config/cloud_os/env.conf
	CLOUD_KEY_PATH=$SCRIPT_PATH/config/cloud_os/cloud.key
	
	if [ ! -f $ENV_PATH ]; then
		
		CLOUD_KEY=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 128`
		CLOUD_MYSQL_PASSWORD=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 16`
		
		cat $SCRIPT_PATH/config/cloud_os/env.example > $ENV_PATH
		
		sed -i "s|MYSQL_ROOT_PASSWORD=.*|MYSQL_ROOT_PASSWORD=${CLOUD_MYSQL_PASSWORD}|g" $ENV_PATH
		sed -i "s|MYSQL_PASSWORD=.*|MYSQL_PASSWORD=${CLOUD_MYSQL_PASSWORD}|g" $ENV_PATH
		sed -i "s|CLOUD_DOMAIN=.*|CLOUD_DOMAIN=${CLOUD_DOMAIN}|g" $ENV_PATH
		sed -i "s|CLOUD_KEY=.*|CLOUD_KEY=${CLOUD_KEY}|g" $ENV_PATH

		echo $CLOUD_KEY > $CLOUD_KEY_PATH
		
	fi
	
}



function compose {
	
	case "$1" in
		
		mysql)
			docker stack deploy -c config/cloud_os/mysql.yaml cloud_os --with-registry-auth
		;;
		
		rabbitmq)
			docker stack deploy -c config/cloud_os/rabbitmq.yaml cloud_os --with-registry-auth
		;;
		
		bus_gateway)
			docker stack deploy -c config/cloud_os/bus_gateway.yaml cloud_os --with-registry-auth
		;;
		
		standard)
			docker stack deploy -c config/cloud_os/standard.yaml cloud_os --with-registry-auth
		;;
		
		all)
			$SCRIPT_EXEC mysql
			$SCRIPT_EXEC rabbitmq
			$SCRIPT_EXEC bus_gateway
			$SCRIPT_EXEC standard
		;;
		
		*)
			echo "Usage: $SCRIPT_EXEC compose {all|standard|mysql|rabbitmq|bus_gateway}"
			RETVAL=1
	esac
}



function delete {
	case "$1" in
		
		mysql)
			docker service rm cloud_os_mysql
		;;
		
		rabbitmq)
			docker service rm cloud_os_rabbitmq
		;;
		
		bus_gateway)
			docker service rm cloud_os_bus_gateway
		;;
		
		standard)
			docker service rm cloud_os_bus_standard
		;;
		
		all)
			$SCRIPT_EXEC mysql
			$SCRIPT_EXEC rabbitmq
			$SCRIPT_EXEC bus_gateway
			$SCRIPT_EXEC standard
		;;
		
		*)
			echo "Usage: $SCRIPT_EXEC delete {all|standard|mysql|rabbitmq|bus_gateway}"
			RETVAL=1
	esac
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
		compose $2
	;;
	
	delete)
		delete $2
	;;
	
	recreate)
		if [ "$2" != "" ]; then
			SCRIPT_EXEC delete $2
			sleep 2
			SCRIPT_EXEC compose $2
		else
			echo "Usage: $SCRIPT_EXEC recreate {all|standard|mysql|rabbitmq|bus_gateway}"
		fi
	;;
	
	setup)
		SCRIPT_EXEC create_network
		SCRIPT_EXEC compose mysql
		SCRIPT_EXEC compose rabbitmq
		SCRIPT_EXEC compose bus_gateway
		SCRIPT_EXEC compose standard
	;;
	
	*)
		echo "Usage: $SCRIPT_EXEC {setup|create_network|generate|compose|delete|recreate}"
		RETVAL=1

esac

exit $RETVAL