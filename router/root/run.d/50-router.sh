if [ ! -z $SYSTEM_PANEL ]; then
	rm -f /etc/nginx/sites-enabled/99-default.conf
	sed -i "s|%SYSTEM_PANEL%|${SYSTEM_PANEL}|g" /etc/nginx/sites-available/99-system-panel.conf
	ln -s ../sites-available/99-system-panel.conf /etc/nginx/sites-enabled/99-default.conf
fi