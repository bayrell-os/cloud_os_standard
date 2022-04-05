#!/bin/bash

# --remove-orphans

RETVAL=0

case "$1" in

    cloud_os)
        docker-compose -f cloud_os.yaml -p "cloud_os" up -d
    ;;
    
    cloud_router)
        docker-compose -f cloud_router.yaml -p "cloud_router" up -d
    ;;
    
    code_server)
        docker-compose -f code_server.yaml -p "cloud_os" up -d
    ;;
    
    *)
		echo "Usage: $0 {cloud_os|cloud_router|code_server}"
		RETVAL=1

esac

exit $RETVAL
