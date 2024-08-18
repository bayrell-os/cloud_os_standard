
if [ ! -d /data/ssh ]; then
	
	echo "Create /data/ssh"
	mkdir -p /data/ssh
	cp -rf /src/files/etc/ssh/* /data/ssh/
	
	echo "Generate ssh keys"
	ssh-keygen -A
fi


if [ ! -z $SSH_USER ] && [ ! -z $SSH_PASSWORD ]; then
	
	SSH_PASSWORD_HASH=`echo $SSH_PASSWORD | openssl passwd -1 -stdin`
	sed -i "s|AllowUsers .*|AllowUsers $SSH_USER|g" /data/ssh/sshd_config
	
	echo "Create user $SSH_USER"
	if [ ! -z $WWW_UID ] && [ ! -z $WWW_GID ]; then
	
		echo "$SSH_USER:x:$WWW_UID:$WWW_GID:www-data:/data/home:/bin/bash" >> /etc/passwd
		usermod --password $SSH_PASSWORD_HASH $SSH_USER
	
	else
	
		echo "$SSH_USER:x:33:33:www-data:/data/home:/bin/bash" >> /etc/passwd
		usermod --password $SSH_PASSWORD_HASH $SSH_USER
	
	fi
	
	echo "$SSH_USER:$SSH_PASSWORD_HASH" > /etc/nginx/inc/htpasswd.inc
	
else
	echo "Disable ssh server"
	yes | rm -f /etc/supervisor.d/ssh_server.ini
fi
