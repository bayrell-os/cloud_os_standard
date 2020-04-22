#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`

RETVAL=0
TAG=`date '+%Y%m%d_%H%M%S'`

case "$1" in
	
	docker)
		docker build ./ -t bayrell/cloud_web_panel:$TAG --file Dockerfile
		docker tag bayrell/cloud_web_panel:$TAG bayrell/cloud_web_panel:latest
		cd ..
	;;
	
	*)
		echo "Usage: $0 {docker}"
		RETVAL=1

esac

exit $RETVAL