#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`
RETVAL=0

case "$1" in
	
	compose)
		docker stack deploy -c system_panel.yaml cloud_os --with-registry-auth
	;;
	
	delete)
		docker service rm cloud_os_system_panel
	;;
	
	recreate)
		$0 delete
		sleep 2
		$0 compose
	;;
	
	*)
		echo "Usage: $0 {compose|delete|recreate}"
		RETVAL=1
	
esac

exit $RETVAL