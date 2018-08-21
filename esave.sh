#!/bin/bash

computerIP="192.168.178.201"
#notebookIP="192.168.178.202"
smartphoneIP="192.168.178.203"

startTime="545" # without leading zero
endTime="2300"

offlineIntervalInMinutes=45

isOn=true
isDay=false
lastOnline="$(date '+%s')"

setLastOnline() {
	lastOnline="$(date '+%s')"
}

log() {
	echo "[$(date +"%d.%m.%Y %H:%M:%S")] $1"
}

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
	log "Monitor wird eingeschaltet."
	tvservice -p;
	sudo chvt 1;
	sudo chvt 7;
	isOn=true
	log "Monitor wurde angeschaltet."
}

stopSocket() {
	log "Monitor wird ausgeschaltet."
	tvservice -o;
	isOn=false
	log "Monitor wurde ausgeschaltet."
}

log "Skript gestartet."

while :; do
	now=$(date +"%k%M")
	if (("$startTime" < "$now")) && (("$now" < "$endTime")); then
		if [ "$isDay" = false ]; then
			echo "______________"
			log "Es ist Tag."
			isDay=true
		fi
		if pcAvailable; then
			setLastOnline
			if [ "$isOn" = false ]; then
				log "PC online."
				startSocket
			fi
			sleep 10
		elif deviceAvailable; then
			setLastOnline
			if [ "$isOn" = false ]; then
				log "Gerät online."
				startSocket
			fi
		else
			if [ "$isOn" = true ]; then
				if [[ "$lastOnline" < "$(date -d "-$offlineIntervalInMinutes minutes" +'+%s')" ]]; then
					# workaround for NTP time jump: stopSocket only up to a minute after we hit the timeout
					if [[ "$(date -d "-$(($offlineIntervalInMinutes + 1)) minutes" +'+%s')" < "$lastOnline" ]]; then
						log "Geräte offline seit mind. $offlineIntervalInMinutes Minuten."
						stopSocket
					else
						# if we're way after the timeout, a timesync may have happened
						log "Reset lastOnline"
						setLastOnline
					fi
				fi
			fi
		fi
	else
		if [ "$isDay" = true ]; then
			log "Es ist Nacht."
			isDay=false
			if [ "$isOn" = true ]; then
				stopSocket
			fi
		fi
	fi
done

exit 0
