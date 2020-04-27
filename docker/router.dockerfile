FROM bayrell/alpine_php_fpm:7.3

RUN apk add dnsmasq && rm -rf /var/cache/apk/*

ADD router /src/files
RUN cd ~; \
	cp -rf /src/files/etc/* /etc/; \
	cp -rf /src/files/root/* /root/; \
	rm -rf /src/files; \
	chmod +x /root/router.php; \
	chmod +x /root/run.sh; \
	echo "Ok"