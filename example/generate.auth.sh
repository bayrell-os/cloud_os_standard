openssl genrsa -out auth_private.key 2048
openssl rsa -in auth_private.key -outform PEM -pubout -out auth_public.key