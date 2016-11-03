#!/bin/bash

while :; do
    if [ "$(ping -q -W5 -c1 192.168.1.203 | grep '100% packet loss')" = "" ]
	then
		echo "$(date +"%d.%m.%Y %H:%M:%S") - ONLINE"
		sleep 1
    fi
done
exit 0
