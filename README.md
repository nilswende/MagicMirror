# MagicMirror
Uses a custom webserver to handle outgoing requests and filesystem operations.

Don't forget to enable ping response for IPv4 in your devices' firewalls to allow the esave script to work.

## Can show:
- Current date and time, optionally with a binary clock
- Calendar
- Current weather and a five-day forecast
- Indoor temperature (if you have an DS18B20 temperature sensor attached)
- Current gas price at your local gas station
- Departure times at your local station (if the service provider uses HAFAS ReST API)

Check `config.json` for all available customization options. The config needs to be added as parameter to the site request – see the entry in `/home/pi/.config/lxsession/LXDE-pi/autostart` below.

## Dependencies

Moment.js 2.12.0

Weather Icons 2.0

# Installation
For Raspberry Pi OS Bookworm.

	sudo nano /boot/config.txt

	#dtparam=audio=on
	# activating 1-wire with pullup
	dtoverlay=w1-gpio,gpiopin=4,pullup=on


	# install all needed programs
	sudo apt-get update && sudo apt-get full-upgrade -y && sudo apt-get install unclutter -y
	sudo apt-get clean


	# copy MagicMirror/ to /home/pi/
	# copy esave.sh to /home/pi/


	sudo nano /etc/xdg/lxsession/LXDE-pi/autostart

	#@xscreensaver -no-splash
	# chromium in kiosk mode
	@unclutter
	@xset s off
	@xset -dpms
	@xset s noblank
	@chromium-browser --noerrdialogs --kiosk --incognito http://localhost:8080/site?config={"position":{"left":["time","calendar"],"middle":["gas"],"right":["weather","transport"]},"time":{"showWithSeconds":true,"showYear":true},"temp":{"sensorAttached":true}}
	
	
	# mark script as executable
	sudo chmod +x /home/pi/esave.sh
	
	
	# execute the script at startup
	sudo crontab -e
	
	@reboot /home/pi/esave.sh > /dev/null 2>&1
	#@reboot /home/pi/esave.sh > /home/pi/esave.log


# Server
A locally running server which handles all outgoing traffic to prevent stuff like [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Cross-Origin Resource Sharing).

## Temperature Sensor
If you have one, enter your own DS18B20 sensor ID in `temperature.go` (`const sensorId`).

## Compile for Raspberry Pi 2 Model B (Windows)
See `build.sh`.

## Deployment
	# copy file to ~
	
	sudo mv ~/MagicMirror-server /usr/bin
	sudo chmod +x /usr/bin/MagicMirror-server

	# start the server on startup
	sudo crontab -e

	@reboot /usr/bin/MagicMirror-server -port 8080 -dir /home/pi/MagicMirror 2>>/home/pi/MagicMirror-server.log

