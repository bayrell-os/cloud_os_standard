#!/bin/bash

while true
do
    sleep 15
    /srv/console.php docker:services:update --quiet
    /srv/console.php docker:nginx:update --quiet
    /srv/console.php cloud_os:nginx:update --quiet
done