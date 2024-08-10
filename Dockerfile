ARG ARCH=
FROM bayrell/ubuntu_php_fpm:7.4-3${ARCH}

RUN cd ~; \
	export DEBIAN_FRONTEND='noninteractive'; \
	apt-get update; \
	apt-get upgrade; \
	apt-get install docker.io dnsmasq sqlite openssh-server -y; \
	apt-get clean all; \
	usermod -a -G docker www-data; \
	echo "Ok"

ADD src /srv
ADD files /src/files

RUN cd ~; \
	ln -s /data/root/.docker /root/.docker; \
	cp /etc/passwd /etc/passwd.orig; \
	cp -rf /src/files/etc/* /etc/; \
	cp -rf /src/files/root/* /root/; \
	rm -rf /etc/ssh; \
	ln -s /data/ssh /etc/ssh; \
	mkdir /run/sshd; \
	chmod +x /root/run.sh; \
	echo "Ok"