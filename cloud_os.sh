#!/bin/bash

SCRIPT_EXEC=$0
SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`

RETVAL=0
VERSION=0.5.1
TAG=`date '+%Y%m%d_%H%M%S'`
ENV_CONFIG_PATH=$SCRIPT_PATH/example/env.conf

function read_env_config()
{
	if [ -f "$ENV_CONFIG_PATH" ]; then
		while IFS= read -r line; do
			IFS="=" read -r left right <<< $line
			
			CMD="$left=\"$right\""
			if [ ! -z "$left" ]; then
				eval "$CMD"
			fi
		done < $ENV_CONFIG_PATH
	fi
}

function generate_env_config()
{
	if [ -z "$CLOUD_OS_KEY" ]; then
		CLOUD_OS_KEY=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 128`
	fi
	
	if [ -z "$SSH_PASSWORD" ]; then
		SSH_PASSWORD=`cat /dev/urandom | tr -dc 'a-zA-Z0-9!@%^*_\-+~' | head -c 16`
	fi
	
	if [ -z "$SSH_USER" ]; then
		echo "Enter ssh username for Cloud OS:"
		read SSH_USER
	fi
	
	local text=""
	text="${text}NODE_ID={{.Node.ID}}\n"
	text="${text}TASK_ID={{.Task.ID}}\n"
	text="${text}SERVICE_ID={{.Service.ID}}\n"
	text="${text}CLOUD_OS_GATEWAY=cloud_os_standard_1\n"
	text="${text}CLOUD_OS_KEY=${CLOUD_OS_KEY}\n"
	text="${text}SSH_USER=${SSH_USER}\n"
	text="${text}SSH_PASSWORD=${SSH_PASSWORD}\n"
	echo -e $text | tee $ENV_CONFIG_PATH > /dev/null
}

function print_env_config()
{
	if [ -f "$ENV_CONFIG_PATH" ]; then
		read_env_config
		echo "SSH_USER=${SSH_USER}"
		echo "SSH_PASSWORD=${SSH_PASSWORD}"
	else
		echo "Setup cloud os first"
	fi
}

function download_container()
{
	res=`docker images | grep cloud_os_standard | grep $VERSION`
	if [ ! -z "$res" ]; then
		return 1
	fi
	
	echo "Download cloud os v$VERSION"
	docker pull bayrell/cloud_os_standard:$VERSION
	
	if [ $? -ne 0 ]; then
		echo "Failed to download cloud os"
		exit 1
	fi
}

function create_network()
{
	local res=`sudo docker network ls | grep cloud_network 2>/dev/null`
	if [ -z "$res" ]; then
		echo "Create docker cloud network"
		sudo docker network create --subnet 172.21.0.0/16 --driver=overlay \
			--attachable cloud_network -o "com.docker.network.bridge.name"="cloud_network"
		if [ $? -ne 0 ]; then
			echo "Failed to create docker network"
			exit 1
		fi
	fi
}

function compose()
{
	echo "Compose cloud os"
	local res=`sudo docker ps -a |grep cloud_os_standard`
	if [ ! -z "$res" ]; then
		sudo docker stop cloud_os_standard > /dev/null
		sudo docker rm cloud_os_standard > /dev/null
	fi
	sudo docker run -d \
		-p 8022:22 \
		-p 8080:80 \
		-v cloud_os_standard:/data \
		-v /var/run/docker.sock:/var/run/docker.sock:ro \
		-v /etc/hostname:/etc/hostname_orig:ro \
		-v $SCRIPT_PATH/src:/srv \
		-e WWW_UID=1000 \
		-e WWW_GID=1000 \
		--name cloud_os_standard \
		--hostname cloud_os_standard.local \
		--env-file $ENV_CONFIG_PATH \
		--restart unless-stopped \
		--network cloud_network \
		bayrell/cloud_os_standard:$VERSION
	if [ $? -ne 0 ]; then
		echo "Failed to compose cloud os"
		exit 1
	fi
}

read_env_config

case "$1" in
	
	download)
		download_container
	;;
	
	create_network)
		create_network
		sleep 2
		docker network ls
	;;
	
	generate)
		generate_env_config
		print_env_config
	;;
	
	compose)
		generate_env_config
		compose
	;;
	
	print)
		print_env_config
	;;
	
	setup)
		download_container
		create_network
		generate_env_config
		compose
		print_env_config
	;;
	
	*)
		echo "Usage: $SCRIPT_EXEC {setup|generate|compose}"
		RETVAL=1

esac

exit $RETVAL