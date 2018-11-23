A locally running server which handles all outgoing traffic to prevent stuff like [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Cross-Origin Resource Sharing).

# Installation

## Temperature Sensor
If you have one, enter your own DS18B20 sensor ID in `temperature.go` (`const sensorId`).

## Compile for Raspi 2 Model B (Windows)
See `build.cmd`.

## Deployment
	# copy file to ~
	sudo mv ~/MagicMirror-server /usr/bin
	sudo chmod +x /usr/bin/MagicMirror-server

	# start the server on startup
	sudo crontab -e

	@reboot /usr/bin/MagicMirror-server -port 80 -dir /home/pi/MagicMirror 2>>/home/pi/MagicMirror-server.log
