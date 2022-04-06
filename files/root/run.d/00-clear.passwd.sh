if [ -f /etc/passwd.orig ]; then
    yes | cp -f /etc/passwd.orig /etc/passwd
fi