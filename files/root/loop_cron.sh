#!/bin/bash

while true
do
    sleep 15
    /srv/backend/console.php docker:services:update
    /srv/backend/console.php docker:nginx:update
done