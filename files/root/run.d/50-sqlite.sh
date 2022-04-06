if [ ! -f /data/db/cloud_os.db ]; then
    mkdir -p /data/db
    sed -i "s|%CLOUD_OS_KEY%|${CLOUD_OS_KEY}|g" /root/cloud_os_data.sql
    sed -i "s|%CLOUD_OS_GATEWAY%|${CLOUD_OS_GATEWAY}|g" /root/cloud_os_data.sql
    sqlite3 /data/db/cloud_os.db < /root/cloud_os_sqlite.sql
    sqlite3 /data/db/cloud_os.db < /root/cloud_os_data.sql
    chown -R www-data:www-data /data/db
fi