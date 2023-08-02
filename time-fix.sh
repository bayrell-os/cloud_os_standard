#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`
RETVAL=0

case "$1" in

    set-date)
        timedatectl set-ntp no
        service docker stop
        
        if [ -z "$2" ]; then
            echo "Type:"
            echo "$0 set-date '01 Jun 2021 00:00:00'"
            exit 1
        fi
        
        echo "Current date:"
        date
        
        service docker start
        sleep 10
        docker swarm ca --rotate
    ;;
    
    restore)
        timedatectl set-ntp yes
        echo "Ok"
    ;;
    
    rotate)
        docker swarm ca --rotate
    ;;
    
	*)
        echo "Set date:"
        echo "  $0 set-date '01 Jun 2021 00:00:00'"
        echo "Restore current date:"
        echo "  $0 restore"
        echo "Rotate certificate:"
        echo "  $0 rotate"
		RETVAL=1

esac

exit $RETVAL

