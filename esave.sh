#!/bin/bash

computerIP="192.168.178.201"
#notebookIP="192.168.178.202"
smartphoneIP="192.168.178.203"

startTime="545" # without leading zero
endTime="2300"

offlineIntervalInMinutes=45

isOn=true
isDay=true
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
	xrandr --display :0 --output HDMI-1 --auto;
	isOn=true
	log "Monitor wurde angeschaltet."
}

stopSocket() {
	log "Monitor wird ausgeschaltet."
	xrandr --display :0 --output HDMI-1 --off;
	isOn=false
	log "Monitor wurde ausgeschaltet."
}

startDay() {
	log "______________"
	log "Es ist Tag."
	isDay=true
	setLastOnline
	startSocket
}

log "Skript gestartet."

while :; do
	now=$(date +"%k%M")
	sleepTime=0.5
	if (("$startTime" <= "$now")) && (("$now" < "$endTime")); then
		if [ "$isDay" = false ]; then
			startDay
		fi
		if pcAvailable; then
			setLastOnline
			if [ "$isOn" = false ]; then
				log "PC online."
				startSocket
			fi
			sleepTime=10
		elif deviceAvailable; then
			setLastOnline
			if [ "$isOn" = false ]; then
				log "Gerät online."
				startSocket
			fi
		else
			if [ "$isOn" = true ]; then
				if [[ "$lastOnline" < "$(date -d "-$offlineIntervalInMinutes minutes" +'+%s')" ]]; then
					log "Geräte offline seit mind. $offlineIntervalInMinutes Minuten."
					stopSocket
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
	sleep "$sleepTime"
done

exit 0
