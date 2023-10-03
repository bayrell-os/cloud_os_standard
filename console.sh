#docker exec `docker ps | grep cloud_os_standard_dev_1 | awk '{print $NF}'` \
#    sudo -u www php /var/www/html/console.php

docker exec -it cloud_os_standard_dev_1 sudo -u www-data php /srv/console.php