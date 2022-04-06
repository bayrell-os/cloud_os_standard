if [ ! -d /data/yaml ]; then
	cp -R /root/yaml /data
	
	ENV_PATH=/data/yaml/cloud_os/env.conf
	cat /data/yaml/cloud_os/env.example > $ENV_PATH
	sed -i "s|CLOUD_OS_KEY=.*|CLOUD_OS_KEY=${CLOUD_OS_KEY}|g" $ENV_PATH
	sed -i "s|CLOUD_OS_GATEWAY=.*|CLOUD_OS_GATEWAY=${CLOUD_OS_GATEWAY}|g" $ENV_PATH
	
	# echo $CLOUD_OS_KEY > /data/yaml/cloud_os/cloud.key
	chown -R www-data:www-data /data/yaml
fi
