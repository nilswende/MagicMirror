#!/bin/bash

computerIP="192.168.1.201"
#notebookIP="192.168.1.202"
smartphoneIP="192.168.1.203"

startTime="630" #without leading zero
endTime="2258"

#loopIntervalInSeconds=0
offlineIntervalInMinutes=30

isOn="NO"
isDay="NO"
lastOnline="$(date '+%s')"

pingDevices() {
    if [ "$(ping -q -W1 -c1 $smartphoneIP | grep '100% packet loss')" = "" ]
		#|| [ "$(ping -q -W1 -c1 $notebookIP   | grep '100% packet loss')" = "" ];
	then
        echo "ONLINE"
    else
        echo "OFFLINE"
    fi
}

pingPc() {
    if [ "$(ping -q -W1 -c1 $computerIP   | grep '100% packet loss')" = "" ]
	then
        echo "ONLINE"
    else
        echo "OFFLINE"
    fi
}

startSocket() {
	echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird eingeschaltet."
	tvservice -p;
	sudo chvt 1;
	sudo chvt 7;
	isOn=$"YES"
	echo "Monitor wurde angeschaltet."
}

stopSocket() {
	echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird ausgeschaltet."
	tvservice -o;
	isOn=$"NO"
	echo "Monitor wurde ausgeschaltet."
}

echo "[$(date +"%d.%m.%Y %H:%M:%S")] Skript gestartet."
now=$(date +"%k%M")
if (("$now" < "$startTime")); then
	sleep 37 #time to boot and start chromium
fi
sleep 3 #leave tvservice some time to react

while :; do
	now=$(date +"%k%M")
	if (("$startTime" < "$now")) && (("$now" < "$endTime")); then
		echo "______________"
		echo "Es ist Tag."
		if [ "$isDay" = "NO" ]; then
			isDay=$"YES"
		fi
		if [ "$(pingPc)" = "ONLINE" ]; then
			echo "PC online."
			lastOnline=$(date "+%s")
			if [ "$isOn" = "NO" ]; then
				startSocket
			fi
			sleep 10
		elif [ "$(pingDevices)" = "ONLINE" ]; then
			echo "Gerät online."
			lastOnline=$(date "+%s")
			if [ "$isOn" = "NO" ]; then
				startSocket
			fi
			#sleep 1
		else
			if [ "$isOn" = "YES" ]; then
				if [[ "$lastOnline" < "$(date -d "-$offlineIntervalInMinutes minutes" +'+%s')" ]]; then
					echo "Geräte offline seit mind. $offlineIntervalInMinutes Minuten."
					stopSocket
				fi
			fi
		fi
	else
		echo "Es ist Nacht."
		shutdown -h now
		if [ "$isDay" = "YES" ]; then
			isDay=$"NO"
			if [ "$isOn" = "YES" ]; then
				stopSocket
			fi
		fi
	fi
	#sleep $loopIntervalInSeconds
done

exit 0
