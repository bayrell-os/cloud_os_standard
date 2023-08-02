if [ ! -d /data/yaml ]; then
	cp -R /root/yaml /data
	chown -R www-data:www-data /data/yaml
fi
