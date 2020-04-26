FROM bayrell/alpine_php_fpm:7.2

RUN apk add php7-session php7-pdo_mysql && rm -rf /var/cache/apk/*

ADD src /var/www/html