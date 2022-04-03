#!/bin/bash

# --remove-orphans

RETVAL=0

case "$1" in

    all)
        docker-compose -f compose.yaml -p "cloud_os" up -d
    ;;
    
    code_server)
        docker-compose -f code_server.yaml -p "cloud_os" up -d
    ;;
    
    *)
		echo "Usage: $0 {all|code_server}"
		RETVAL=1

esac

exit $RETVAL
