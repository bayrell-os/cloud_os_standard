#!/bin/bash

while true
do
    sleep 15
    /srv/console.php docker:services:update
    /srv/console.php docker:nginx:update
    /srv/console.php cloud_os:nginx:update
done