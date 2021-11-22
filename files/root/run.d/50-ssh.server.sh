
if [ ! -d /data/ssh ]; then
	
	echo "Create /data/ssh"
	mkdir -p /data/ssh
	cp -rf /src/files/etc/ssh/* /data/ssh/
	
	echo "Generate ssh keys"
	ssh-keygen -A
fi


if [ ! -z $SSH_USER ] && [ ! -z $SSH_PASSWORD ]; then
	
	sed -i "s|AllowUsers username|AllowUsers $SSH_USER|g" /data/ssh/sshd_config
	
	echo "Create user $SSH_USER"
	if [ ! -z $WWW_UID ] && [ ! -z $WWW_GID ]; then
	
		echo "$SSH_USER:x:$WWW_UID:$WWW_GID:www-data:/data/home:/bin/bash" >> /etc/passwd
		usermod --password $(echo $SSH_PASSWORD | openssl passwd -1 -stdin) $SSH_USER
	
	else
	
		echo "$SSH_USER:x:33:33:www-data:/data/home:/bin/bash" >> /etc/passwd
		usermod --password $(echo $SSH_PASSWORD | openssl passwd -1 -stdin) $SSH_USER
	
	fi
	
else
	echo "Disable ssh server"
	yes | rm -f /etc/supervisor.d/ssh_server.ini
fi
