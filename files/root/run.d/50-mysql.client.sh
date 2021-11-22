sed -i "s|host=.*|host=${MYSQL_HOST}|g" /etc/my.cnf.d/database.cnf
sed -i "s|user=.*|user=${MYSQL_ROOT_USERNAME}|g" /etc/my.cnf.d/database.cnf
sed -i "s|password=.*|password=${MYSQL_ROOT_PASSWORD}|g" /etc/my.cnf.d/database.cnf