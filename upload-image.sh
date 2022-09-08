#!/bin/bash

ssh_host="raspa"
version="0.4.2-arm64v8-20220909_004702"
bwlimit=172

mkdir -p images

echo "Save image"
#docker image save bayrell/cloud_os_standard:$version | gzip \
#    > ./images/cloud_os_standard-$version.tar.gz

echo "Upload image"    
ssh $ssh_host "mkdir -p ~/images"
ssh $ssh_host "yes | rm -f ~/images/cloud_os_standard-$version.tar.gz"

#scp ./images/cloud_os_standard-$version.tar.gz \
#    $ssh_host:~/images/cloud_os_standard-$version.tar.gz

time rsync -aSsuh --info=progress2 --bwlimit=$bwlimit ./images/cloud_os_standard-$version.tar.gz \
    $ssh_host:images/cloud_os_standard-$version.tar.gz

echo "Load image"
ssh $ssh_host "docker load -i ~/images/cloud_os_standard-$version.tar.gz"


