FROM bayrell/alpine_php_fpm:7.3

ADD src /var/www

ADD web_panel /src/files
RUN cd ~; \
	cp -rf /src/files/etc/* /etc/; \
	rm -rf /src/files; \
	chmod +x /root/run.sh; \
	echo "Ok"