#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`

RETVAL=0
IMAGE="bayrell/cloud_os_standard"
VERSION=0.4.3
TAG=`date '+%Y%m%d_%H%M%S'`

case "$1" in
	
	test)
		echo "Build $IMAGE:$VERSION-$TAG"
		$0 project
		docker build ./ -t bayrell/cloud_os_standard:$VERSION-$TAG --file Dockerfile
		cd ..
	;;
	
	test-arm64v8)
		echo "Build $IMAGE:$VERSION-arm64v8-$TAG"
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
	
	manifest)
		rm -rf ~/.docker/manifests/docker.io_cloud_os_standard-*
		
		docker push bayrell/cloud_os_standard:$VERSION-amd64
		docker push bayrell/cloud_os_standard:$VERSION-arm64v8
		
		docker manifest create --amend bayrell/cloud_os_standard:$VERSION \
			bayrell/cloud_os_standard:$VERSION-amd64 \
			bayrell/cloud_os_standard:$VERSION-arm64v8
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
		$0 manifest
	;;
	
	upload-image)
		
		if [ -z "$2" ] || [ -z "$3" ]; then
			echo "Type:"
			echo "$0 upload-image 0.4.2 raspa 172"
			echo "  0.4.2 - version"
			echo "  raspa - ssh host"
			echo "  172 - bandwidth KiB/s"
			exit 1
		fi
		
		version=$2
		ssh_host=$3
		bwlimit=172
		
		if [ ! -z "$4" ]; then
			bwlimit=$4
		fi
		
		mkdir -p images
		
		echo "Save image"
		docker image save bayrell/cloud_os_standard:$version | gzip \
		    > ./images/cloud_os_standard-$version.tar.gz

		echo "Upload image"
		ssh $ssh_host "mkdir -p ~/images"
		ssh $ssh_host "yes | rm -f ~/images/cloud_os_standard-$version.tar.gz"
		
		time rsync -aSsuh --info=progress2 --bwlimit=$bwlimit ./images/cloud_os_standard-$version.tar.gz \
			$ssh_host:images/cloud_os_standard-$version.tar.gz

		echo "Load image"
		ssh $ssh_host "docker load -i ~/images/cloud_os_standard-$version.tar.gz"
	;;
	
	*)
		echo "Usage: $0 {project|amd64|arm64v8|manifest|all|test|test-arm64v8|upload-image}"
		RETVAL=1

esac

exit $RETVAL