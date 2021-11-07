ARG ARCH=
FROM bayrell/ubuntu_php_fpm:7.4-2${ARCH}

RUN cd ~; \
	export DEBIAN_FRONTEND='noninteractive'; \
	apt-get update; \
	apt-get install docker.io dnsmasq sqlite mysql-client -y; \
	usermod -a -G docker www-data; \
	echo "Ok"

ADD backend /srv/backend
ADD frontend/html /srv/frontend/html
ADD files /src/files
RUN cd ~; \
	cp -rf /src/files/etc/* /etc/; \
	cp -rf /src/files/root/* /root/; \
	rm -rf /src/files; \
	chmod +x /root/run.sh; \
	echo "Ok"