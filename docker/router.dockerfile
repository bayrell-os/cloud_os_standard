FROM bayrell/alpine_php_fpm:7.2

RUN apk add dnsmasq php7-pdo_mysql && rm -rf /var/cache/apk/*

ADD router /src/files
RUN cd ~; \
	cp -rf /src/files/etc/* /etc/; \
	cp -rf /src/files/root/* /root/; \
	rm -rf /src/files; \
	chmod +x /root/run.sh; \
	echo "Ok"