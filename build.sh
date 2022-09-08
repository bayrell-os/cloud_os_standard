#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`

RETVAL=0
VERSION=0.4.2
TAG=`date '+%Y%m%d_%H%M%S'`

case "$1" in
	
	test)
		$0 project
		docker build ./ -t bayrell/cloud_os_standard:$VERSION-$TAG --file Dockerfile
		cd ..
	;;
	
	test-arm64v8)
		$0 project
		docker build ./ -t bayrell/cloud_os_standard:$VERSION-arm64v8-$TAG \
			--file Dockerfile --build-arg ARCH=-arm64v8
		cd ..
	;;
	
	amd64)
		docker build ./ -t bayrell/cloud_os_standard:$VERSION-amd64 \
			--file Dockerfile --build-arg ARCH=-amd64
	;;
	
	arm64v8)
		docker build ./ -t bayrell/cloud_os_standard:$VERSION-arm64v8 \
			--file Dockerfile --build-arg ARCH=-arm64v8
	;;
	
	arm32v7)
		docker build ./ -t bayrell/cloud_os_standard:$VERSION-arm32v7 \
			--file Dockerfile --build-arg ARCH=-arm32v7
	;;
	
	manifest)
		rm -rf ~/.docker/manifests/docker.io_cloud_os_standard-*
		
		docker push bayrell/cloud_os_standard:$VERSION-amd64
		docker push bayrell/cloud_os_standard:$VERSION-arm64v8
		docker push bayrell/cloud_os_standard:$VERSION-arm32v7
		
		docker manifest create --amend bayrell/cloud_os_standard:$VERSION \
			bayrell/cloud_os_standard:$VERSION-amd64 \
			bayrell/cloud_os_standard:$VERSION-arm64v8 \
			bayrell/cloud_os_standard:$VERSION-arm32v7
		docker manifest push --purge bayrell/cloud_os_standard:$VERSION
	;;
	
	project)
		pushd src
		npm run build
		popd
	;;
	
	all)
		$0 project
		$0 amd64
		$0 arm64v8
		$0 arm32v7
		$0 manifest
	;;
	
	*)
		echo "Usage: $0 {project|amd64|arm64v8|arm32v7|manifest|all|test|test-arm64v8}"
		RETVAL=1

esac

exit $RETVAL