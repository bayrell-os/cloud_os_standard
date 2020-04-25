if [ ! -z $CLOUD_WEB_PANEL ]; then
	sed -i "s|%CLOUD_WEB_PANEL%|${CLOUD_WEB_PANEL}|g" /etc/nginx/sites-enabled/cloud_web_panel.conf
fi
chmod +x /root/router.sh