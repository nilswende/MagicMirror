#!/bin/bash

computerIP="192.168.178.201"
#notebookIP="192.168.178.202"
smartphoneIP="192.168.178.203"

startTime="600" #without leading zero
endTime="2300"

offlineIntervalInMinutes=40

isOn=true
isDay=false
lastOnline="$(date '+%s')"

deviceAvailable() {
	if [ "$(ping -q -W1 -c1 $smartphoneIP | grep '100% packet loss')" = "" ]
		#|| [ "$(ping -q -W1 -c1 $notebookIP   | grep '100% packet loss')" = "" ];
	then
		true
	else
		false
	fi
}

pcAvailable() {
	if [ "$(ping -q -W1 -c1 $computerIP | grep '100% packet loss')" = "" ]
	then
		true
	else
		false
	fi
}

startSocket() {
	echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird eingeschaltet."
	tvservice -p;
	sudo chvt 1;
	sudo chvt 7;
	isOn=true
	echo "Monitor wurde angeschaltet."
}

stopSocket() {
	echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird ausgeschaltet."
	tvservice -o;
	isOn=false
	echo "Monitor wurde ausgeschaltet."
}

echo "[$(date +"%d.%m.%Y %H:%M:%S")] Skript gestartet."

while :; do
	now=$(date +"%k%M")
	if (("$startTime" < "$now")) && (("$now" < "$endTime")); then
		if [ "$isDay" = false ]; then
			echo "______________"
			echo "Es ist Tag."
			isDay=true
		fi
		if pcAvailable; then
			lastOnline=$(date "+%s")
			if [ "$isOn" = false ]; then
				echo "PC online."
				startSocket
			fi
			sleep 10
		elif deviceAvailable; then
			lastOnline=$(date "+%s")
			if [ "$isOn" = false ]; then
				echo "Gerät online."
				startSocket
			fi
		else
			if [ "$isOn" = true ]; then
				if [[ "$lastOnline" < "$(date -d "-$offlineIntervalInMinutes minutes" +'+%s')" ]]; then
					echo "Geräte offline seit mind. $offlineIntervalInMinutes Minuten."
					stopSocket
				fi
			fi
		fi
	else
		if [ "$isDay" = true ]; then
			echo "Es ist Nacht."
			isDay=false
			if [ "$isOn" = true ]; then
				stopSocket
			fi
		fi
	fi
done

exit 0
