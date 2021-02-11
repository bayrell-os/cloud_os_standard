ARG ARCH=
FROM bayrell/alpine_php_fpm:7.3-5${ARCH}

RUN apk add sudo docker dnsmasq curl php7-curl mariadb-client; \
	rm -rf /var/cache/apk/*; \
	sed -i 's|# %wheel ALL=(ALL) NOPASSWD: ALL|%wheel ALL=(ALL) NOPASSWD: ALL|g' /etc/sudoers; \
	adduser www docker; \
	adduser www wheel; \
	adduser www www-data; \
	echo "Ok"

ADD files /src/files
RUN cd ~; \
	cp -rf /src/files/etc/* /etc/; \
	cp -rf /src/files/root/* /root/; \
	rm -rf /src/files; \
	chmod +x /root/run.sh; \
	echo "Ok"
	
ADD src /var/www