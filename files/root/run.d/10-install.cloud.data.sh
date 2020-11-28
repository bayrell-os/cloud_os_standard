if [ ! -d /data/config ]; then
	mkdir -p /data/config
	cp -R /root/cloud_os /data/config/
	ENV_PATH=/data/config/cloud_os/env.conf
	cat /data/config/cloud_os/env.example > $ENV_PATH
	sed -i "s|MYSQL_ROOT_PASSWORD=.*|MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}|g" $ENV_PATH
	sed -i "s|MYSQL_PASSWORD=.*|MYSQL_PASSWORD=${MYSQL_PASSWORD}|g" $ENV_PATH
	sed -i "s|CLOUD_KEY=.*|CLOUD_KEY=${CLOUD_KEY}|g" $ENV_PATH
	echo $CLOUD_KEY > /data/config/cloud_os/cloud.key
	chown -R www:www /data/config
fi
