if [ ! -d /data/yaml ]; then
	cp -R /root/yaml /data
	
	ENV_PATH=/data/yaml/cloud_os/cloud_env.conf
	cat /data/yaml/cloud_os/cloud_env.example > $ENV_PATH
	sed -i "s|MYSQL_ROOT_PASSWORD=.*|MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}|g" $ENV_PATH
	sed -i "s|MYSQL_PASSWORD=.*|MYSQL_PASSWORD=${MYSQL_PASSWORD}|g" $ENV_PATH
	sed -i "s|CLOUD_KEY=.*|CLOUD_KEY=${CLOUD_KEY}|g" $ENV_PATH
	
	echo $CLOUD_KEY > /data/yaml/cloud_os/cloud.key
	chown -R www:www /data/config
fi
