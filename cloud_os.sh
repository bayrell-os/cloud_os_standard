#!/bin/bash

SCRIPT_EXEC=$0
SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`

RETVAL=0
VERSION=0.4.2
TAG=`date '+%Y%m%d_%H%M%S'`

# RS256
JWT_KEY_LENGTH=2048
ENV_CONFIG_PATH=$SCRIPT_PATH/example/env.conf


function read_env_config {
	
	if [ -f "$ENV_CONFIG_PATH" ]; then
	
		while IFS= read -r line; do
			IFS="=" read -r left right <<< $line
			CMD="$left=$right"
			if [ ! -z "$left" ]; then
				eval $CMD
			fi
		done < $ENV_CONFIG_PATH
	
	fi
	
}


function generate {
	
	if [ ! -f "$ENV_CONFIG_PATH" ]; then
		cat $SCRIPT_PATH/example/env.example > $ENV_CONFIG_PATH
	fi
	
	read_env_config
	
	if [ -z "$CLOUD_OS_KEY" ]; then
		CLOUD_OS_KEY=`cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 128`
		echo "CLOUD_OS_KEY=${CLOUD_OS_KEY}" >> $ENV_CONFIG_PATH
	fi
	
	if [ -z "$SSH_PASSWORD" ]; then
		SSH_PASSWORD=`cat /dev/urandom | tr -dc 'a-zA-Z0-9!@%^*_\-+~' | head -c 16`
		echo "SSH_PASSWORD=${SSH_PASSWORD}" >> $ENV_CONFIG_PATH
	fi
	
	if [ -z "$SSH_USER" ]; then
		echo "Enter ssh username for Cloud OS:"
		read SSH_USER
		echo "SSH_USER=${SSH_USER}" >> $ENV_CONFIG_PATH
	fi
	
	if [ -z "$JWT_PRIVATE_KEY" ]; then
		
		# Generate JWT key
		openssl genrsa -out $SCRIPT_PATH/example/jwt_private.key $JWT_KEY_LENGTH
		
		# Save JWT private key
		JWT_PRIVATE_KEY=""
		while IFS= read -r line; do
			if [ "$JWT_PRIVATE_KEY" = "" ]; then
				JWT_PRIVATE_KEY="$line"
			else
				JWT_PRIVATE_KEY="${JWT_PRIVATE_KEY}\n$line"
			fi
		done < $SCRIPT_PATH/example/jwt_private.key
		echo "JWT_PRIVATE_KEY=\"$JWT_PRIVATE_KEY\"" >> $ENV_CONFIG_PATH
		
	fi
	
	if [ -z "$JWT_PUBLIC_KEY" ]; then
		
		if [ ! -f $SCRIPT_PATH/example/jwt_private.key ]; then
			echo -e "$JWT_PRIVATE_KEY" > $SCRIPT_PATH/example/jwt_private.key
		fi
		
		openssl rsa -in $SCRIPT_PATH/example/jwt_private.key -outform PEM \
			-pubout -out $SCRIPT_PATH/example/jwt_public.key
		
		# Save JWT public key
		JWT_PUBLIC_KEY=""
		while IFS= read -r line; do
			if [ "$JWT_PUBLIC_KEY" = "" ]; then
				JWT_PUBLIC_KEY="$line"
			else
				JWT_PUBLIC_KEY="${JWT_PUBLIC_KEY}\n$line"
			fi
		done < $SCRIPT_PATH/example/jwt_public.key
		echo "JWT_PUBLIC_KEY=\"$JWT_PUBLIC_KEY\"" >> $ENV_CONFIG_PATH
		
	fi
	
}

function output {
		
	if [ -f "$ENV_CONFIG_PATH" ]; then
		read_env_config
		echo "SSH_USER=${SSH_USER}"
		echo "SSH_PASSWORD=${SSH_PASSWORD}"
		echo "JWT Public key:"
		echo -e $JWT_PUBLIC_KEY
		#echo -e $JWT_PRIVATE_KEY
	else
		echo "Setup cloud os first"
	fi
}

function download {
	docker pull bayrell/cloud_os_standard:$VERSION
}

function create_network {
	docker network create --subnet 172.21.0.1/16 --driver=overlay \
		--attachable cloud_network -o "com.docker.network.bridge.name"="cloud_network"
}

function compose {
	docker-compose -f example/cloud_os.yaml -p "cloud_os" up -d
}


case "$1" in
	
	download)
		download
	;;
	
	create_network)
		create_network
		
		sleep 2
		
		docker network ls
	;;
	
	generate)
		generate
		output
	;;
	
	compose)
		generate
		compose
		output
	;;
	
	output)
		output
	;;
	
	setup)
		download
		create_network
		generate
		compose
		output
	;;
	
	*)
		echo "Usage: $SCRIPT_EXEC {setup|compose}"
		RETVAL=1

esac

exit $RETVAL