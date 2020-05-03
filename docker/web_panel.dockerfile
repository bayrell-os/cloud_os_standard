FROM bayrell/alpine_php_fpm:7.3

RUN apk add sudo; \
	rm -rf /var/cache/apk/*; \
	sed -i 's|# %wheel ALL=(ALL) NOPASSWD: ALL|%wheel ALL=(ALL) NOPASSWD: ALL|g' /etc/sudoers; \
	adduser www wheel; \
	echo "Ok"

ADD web_panel /src/files
RUN cd ~; \
	cp -rf /src/files/etc/* /etc/; \
	rm -rf /src/files; \
	chmod +x /root/run.sh; \
	echo "Ok"
	
ADD src /var/www