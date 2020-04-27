if [ ! -z $SYSTEM_PANEL ] && [ ! -z $SYSTEM_DOMAIN ]; then
	sed -i "s|%SYSTEM_PANEL%|${SYSTEM_PANEL}|g" /etc/nginx/conf.d/99-upstreams.conf
	sed -i "s|%SYSTEM_PANEL%|${SYSTEM_PANEL}|g" /etc/nginx/sites-available/50-system-panel.conf
	sed -i "s|%SYSTEM_DOMAIN%|${SYSTEM_DOMAIN}|g" /etc/nginx/sites-available/50-system-panel.conf
	ln -s ../sites-available/50-system-panel.conf /etc/nginx/sites-enabled/50-system-panel.conf
fi