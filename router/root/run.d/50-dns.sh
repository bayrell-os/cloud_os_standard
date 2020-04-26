echo "nameserver 127.0.0.1" > /etc/resolv.conf

if [ ! -z "$DNS_RESOLVER" ]; then
	echo "nameserver ${DNS_RESOLVER}" >> /etc/resolv.conf
fi

echo "options ndots:0" >> /etc/resolv.conf
