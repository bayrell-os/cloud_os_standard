ARG ARCH=

# ============================================================
# Stage 1: Build stage — npm install + baylang compilation
# ============================================================
FROM node:18-slim AS builder

RUN apt-get update && \
    apt-get install -y patch && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g bay-lang@0.12.6

COPY src /srv

RUN cd /srv && \
    patch --ignore-whitespace /srv/lib/Runtime/bay/rtl.bay \
		/srv/rtl.diff && \
    bay-lang-nodejs make_all

# ============================================================
# Stage 2: Runtime stage — final lightweight image
# ============================================================
FROM bayrell/ubuntu_php_fpm:7.4-3${ARCH}

RUN cd ~; \
	export DEBIAN_FRONTEND='noninteractive'; \
	apt-get update; \
	apt-get upgrade; \
	apt-get install docker.io dnsmasq sqlite \
		openssh-server -y; \
	apt-get clean all; \
	usermod -a -G docker www-data; \
	echo "Ok"

# Copy built artifacts from builder stage
COPY --from=builder /srv /srv
COPY files /src/files

RUN cd /srv; \
	composer install

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
