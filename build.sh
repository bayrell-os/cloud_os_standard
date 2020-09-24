#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`

RETVAL=0
TAG=`date '+%Y%m%d_%H%M%S'`

case "$1" in
	
	cloud_os)
		docker build ./ -t bayrell/cloud_os:$TAG --file docker/cloud_os.dockerfile
		docker tag bayrell/cloud_os:$TAG bayrell/cloud_os:latest
		cd ..
	;;
	
	*)
		echo "Usage: $0 {cloud_os}"
		RETVAL=1

esac

exit $RETVAL